

<template >
  <div>
    <div class="buttons">
      <div class="buttons">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-input placeholder="请输入内容" clearable @clear="getUserList" v-model="getUser">
              <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="adduser">添加角色</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- ---------------------------------------------------- -->

    <div class="mian">
      <el-table
        :data="tableRoleData"
        style="width: 100%"
        row-class-name="warning-row"
        border
        v-loading="loading"
        element-loading-text="正在获取角色列表，请稍等..."
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="roleName" label="角色姓名" width="180"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="redactuser(scope.$index, scope.row.id ,)">编辑</el-button>

            <el-popconfirm
              confirmButtonText="好的"
              cancelButtonText="取消"
              icon="el-icon-info"
              iconColor="red"
              default-expand-all
              title="这是一段内容确定删除吗？"
              @onConfirm="handleDelete(scope.$index, scope.row.id)"
              @onCancel="()=>{}"
            >
              <el-button size="mini" type="danger" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div> -->
      <!-- </div> -->
      <CtrlPage :setPage="getList" ref="page" v-show="0 < tableRoleData.length" />
    </div>

    <!-- ---------------------------------------------------- -->

    <!-- 新建 -->
    <el-dialog
      title="新建角色"
      :visible.sync="dialogFormVisible"
      width="30%"
      :before-close="closeDialog"
    >
      <el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="添加描述" prop="description">
          <el-input type="textarea" v-model="ruleForm.description" placeholder="请输入角色描述"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <div style="width: 100%;">
            <el-tree
              :data="rootData"
              show-checkbox
              node-key="id"
              ref="tree"
              :default-checked-keys="checkedKeys"
              :props="defaultProps"
            ></el-tree>
          </div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="addPart()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新建 end -->
    <!-- 修改 -->
    <el-dialog title="修改角色" :visible.sync="xgVisible" width="30%" :before-close="closeDialog">
      <el-form :model="redact" label-width="80px" :rules="rules" ref="redact">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="redact.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="添加描述" prop="description">
          <el-input type="textarea" v-model="redact.roleDesc" placeholder="请输入角色描述"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <div style="width: 100%;">
            <el-tree
              :data="rootData"
              show-checkbox
              node-key="id"
              ref="tree"
              :default-checked-keys="checkedKeys"
              :props="defaultProps"
            ></el-tree>
          </div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="xgVisible = false">取 消</el-button>
        <el-button type="primary" @click="alteruser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 end -->
  </div>
</template>
<script>
import CtrlPage from 'components/component/CtrlPage.vue'
// import CtrlPage from '../../../data/tableRoleData.json'
export default {
  // 角色管理
  data() {
    return {
      total: 0, //小余这个值不显示分页
      loading: true, //获取表格数据时的遮罩
      checkedKeys: [], //选中的
      dialogRight: false, //管理权限开关
      dialogFormVisible: false, //新建角色开关
      xgVisible: false, //修改角色开关
      roleId: '', //点开人的id
      getUser: '',
      ruleForm: {
        //新建信息
        roleName: '',
        description: ''
      },
      redact: {
        //修改
        roleName: '',
        roleDesc: ''
      },
      tableRoleData: [], //列表
      rules: {
        //新建权限
        roleName: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        ]
      },
      rootData: [], //权限树
      defaultProps: {
        children: 'childList',
        label: 'name',
        id: 'id'
      }
    }
  },
  mounted() {
    this.$refs.page.getList(1)
  },
  methods: {
    //打开新建
    adduser() {
      this.checkedKeys = []
      this.getMenuList()
      this.dialogFormVisible = true //
    },
    //查询角色
    redactuser(index, id) {
      this.roleId = id
      this.checkedKeys = []
      this.getMenuList() //树
      this.xgVisible = true //
      this.$public.role.getRole(id).then(res => {
        if (res.code == '000000') {
          this.redact = res.data
          this.redact.description = res.data.roleDesc
          this.checkedKeys = res.data.resourceIds ? res.data.resourceIds : [] //应该有的权限id
          var newArr = [] //需要展示的
          var item = ''
          this.checkedKeys.forEach(item => {
            this.checked(item, this.rootData, newArr)
            //   item  所有的节点id
            // this.rootData 所有的id
          })
          this.checkedKeys = newArr
          this.dialog = true
        }
        console.log('redactuser -> res', res)
      })
    },
    //修改角色
    alteruser() {
      var alter = {
        deleted: 'N',
        resourceIds: this.getCheckedKey(),
        roleDesc: this.redact.roleDesc,
        roleName: this.redact.roleName
      }
      this.$public.role.alterRole(this.roleId, alter).then(res => {
        if (res.code == '000000') {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$refs.page.getList(1)
          this.xgVisible = false
        }
      })
    },
    //获取表格列表
    // pageIndex, //每行几个
    // rows,//第几行
    //  callback
    getList(pageIndex, rows, callback) {
      this.$public.role
        .roleConditions({
          current: pageIndex,
          deleted: 0,
          roleName: this.getUser,
          size: rows
        })
        .then(res => {
          if (res.code == '000000') {
            console.log('getList -> res', res)
            this.tableRoleData = res.data.records
            this.loading = false //
            callback(this.tableRoleData, +res.data.total)
          }
        })
    },
    //搜索
    getUserList() {
      console.log('getUserList -> this.getUser', this.getUser)
      this.$refs.page.getList(1)
    },
    //提交新建角色
    addPart() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const val = {
            deleted: 'N',
            roleDesc: this.ruleForm.description,
            resourceIds: this.getCheckedKey(),
            roleName: this.ruleForm.roleName
          }

          console.log('addPart -> val', val)

          this.$public.role
            .addUserRole(val)
            .then(res => {
              if (res.code == '000000') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.dialogFormVisible = false //关闭
                this.ruleForm = {}
                this.$refs.ruleForm.resetFields() //对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                this.$refs.page.getList(1)
              }
            })
            .catch(result => {
              console.log('getList -> result', result)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    //重置新建
    resetForm() {
      this.$refs.ruleForm.resetFields() //对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.ruleForm = {}
      this.dialogFormVisible = false
    },
    //返回选中的
    getCheckedKey() {
      let parentArr = this.$refs.tree.getHalfCheckedKeys() //通过 key 获取 半选中
      let childeArr = this.$refs.tree.getCheckedKeys() //通过 key 获取 选中的
      let roleIds = childeArr.concat(parentArr) //全部选中的
      return roleIds
    },

    //提交菜单配置
    submitMenu() {
      this.dialog = false

      //   this.$api.sys
      //     .setRoleMenu({
      //       roleId: this.roleId,
      //       ids: arr.join(',')
      //     })
      //     .then(res => {
      //       if (res.code == 1000) {
      //         this.$message({
      //           message: '操作成功',
      //           type: 'success'
      //         })
      //         this.dialog = false
      //         this.$refs.page.getList(1)
      //       } else {
      //         this.$message({
      //           message: res.message,
      //           type: 'error'
      //         })
      //       }
      //     })
    },
    // 关闭新建dialog前
    closeDialog(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.resetForm()
        })
        .catch(_ => {})
    },
    //关闭菜单配置dialog前
    close(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.dialog = false
        })
        .catch(_ => {})
    },
    //获取树结构
    getMenuList(id) {
      this.$public.resource
        .inquireResourceTree()
        .then(res => {
          if (res.code == '000000') {
            this.rootData = res.data
          }
        })
        .catch(result => {
          console.log('getList -> result', result)
        })
    },

    //查看菜单应该的权限
    viewMenuList(id) {
      this.$public.user.getkeyuser(id).then(res => {
        this.checkedKeys = res.data.roleIds ? res.data.roleIds : [] //应该有的权限id

        var newArr = [] //需要展示的
        var item = ''
        this.checkedKeys.forEach(item => {
          this.checked(item, this.rootData, newArr)
          //   item  所有的节点id
          // this.rootData 所有的id
        })
        this.checkedKeys = newArr
        this.dialog = true
      })
    },

    // 删除父元素
    checked(id, data, newArr) {
      data.forEach(item => {
        if (item.id == id) {
          // 当子节点数组为[]时用  item.childList.length==0
          // 当子节点数组为null时用  item.childList==null
          if (item.childList == null) {
            newArr.push(item.id)
          }
        } else {
          // item.childList.length！=0
          if (item.childList != null) {
            this.checked(id, item.childList, newArr)
          }
        }
      })
    },
    //打开编辑权限
    handleEdit(index, id) {
      this.$public.resource.inquireResourceTree().then(res => {
        if (res.code == '000000') {
          this.rootData = res.data
          this.viewMenuList(id)
          this.dialogRight = true
        }
      })
    },
    // 删除角色
    handleDelete(index, id) {
      this.$public.role.deleteRole(id).then(src => {
        if (src.code == '000000') {
          this.$message({
            message: '恭喜你，删除成功',
            type: 'success'
          })
          this.$refs.page.getList(1)
        }
      })
    }
    // astrict(aa) {
    //   console.log('astrict -> aa', aa.replace(/[^a-zA-Z]/g, ''))
    //   aa = aa.replace(/[^a-zA-Z]/g, '')
    // }
  },
  components: {
    CtrlPage
  }
}
</script>
<style>
.el-table .warning-row:nth-child(2n) {
  background: oldlace;
}

.mian {
  margin: 80px auto;
}
.el-table th,
.el-table tr th {
  background-color: #f8f700;
}
</style>