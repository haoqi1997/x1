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
            <el-button type="primary" @click="adduser">添加用11户</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- ---------------------------------------------------- -->

    <div class="mian">
      <el-table
        :data="tableData"
        style="width: 100%"
        row-class-name="warning-row"
        border
        v-loading="loading"
        element-loading-text="正在获取用户列表，请稍等..."
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="username" label="登录名称" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column label="操作">
          <!-- 编辑用户 -->
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row.id)"
              size="mini"
            ></el-button>
            <!-- 删除用户 -->
            <el-button
              type="danger"
              @click="handleDelete(scope.$index, scope.row.id)"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div> -->
      <CtrlPage :setPage="getList" ref="page" v-show="0 < tableData.length" />
      <!-- </div> -->
    </div>
    <!-- 新建 -->
    <el-dialog
      title="新建用户"
      :visible.sync="dialogFormVisible"
      width="30%"
      :before-close="closeDialog"
    >
      <el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="登录名称" prop="username">
          <el-input
            v-model="ruleForm.username"
            onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
            placeholder="请输入登录名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            onkeyup="value=value.replace(/[\W]/g,'')"
            placeholder="请输入用户密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model.number="ruleForm.mobile" placeholder="请输入用户电话"></el-input>
        </el-form-item>
        <el-form-item label="添加描述" prop="description">
          <el-input type="textarea" v-model="ruleForm.description" placeholder="请输入用户描述"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-select v-model="selectRoleId" multiple placeholder="请选择新角色">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="addPart()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新建 end -->
    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
      <el-form
        :model="editUserForm"
        :rules="rules"
        ref="editUserFormRef"
        label-width="170px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="editUserForm.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户密码" prop="name">
          <el-input v-model="editUserForm.password"></el-input>
        </el-form-item>-->
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="添加描述" prop="description">
          <el-input type="textarea" v-model="editUserForm.description" placeholder="用户描述"></el-input>
        </el-form-item>
        <el-form-item label="角色分配">
          <el-select v-model="select" multiple placeholder="请选择新角色">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import CtrlPage from 'components/component/CtrlPage'
export default {
  // 用户管理
  data() {
    // 自定义邮箱校验规则
    var checkEmail = (rule, value, cb) => {
      const regEail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (regEail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    // 自定义手机号校验规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      total: 0, //小余这个值不显示分页
      loading: true, //获取表格数据时的遮罩
      checkedKeys: [], //选中的
      dialogRight: false, //管理权限开关
      dialogFormVisible: false, //新建用户开关
      editDialogVisible: false, //编辑开关
      roleId: '', //点开人的id
      setRoleDialogVisible: false, //分配
      rolesList: [], //角色列表
      selectRoleId: [], //选中的角色
      rolesList: [], //角色列表修改
      select: [], //选中的角色修改
      ruleForm: {
        //新建信息
        username: '',
        password: '',
        mobile: '',
        description: ''
      },
      getUser: '', //搜索
      tableData: [], //列表
      rules: {
        //新建权限
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          {
            require: true,
            min: 3,
            max: 10,
            message: '用户名长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          {
            require: true,
            min: 3,
            max: 10,
            message: '登录名称长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            require: true,
            min: 6,
            max: 15,
            message: '密码长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      rootData: [], //权限树
      defaultProps: {
        children: 'childList',
        label: 'name',
        id: 'id'
      },
      editUserForm: '' //编辑用户
    }
  },
  mounted() {
    this.$refs.page.getList(1)
  },
  methods: {
    //打开新建
    adduser() {
      this.checkedKeys = []
      this.dialogFormVisible = true //
      this.roleAl()
    },
    //搜索
    getUserList() {
      console.log('getUserList -> this.getUser', this.getUser)
    },
    //角色获取
    roleAl() {
      this.$public.role.roleAll().then(res => {
        console.log('roleAl -> res', res)
        if (res.code == '000000') {
          this.rolesList = res.data
        }
      })
    },
    //获取表格列表
    // pageIndex, //每行几个
    // rows,//第几行
    //  callback
    getList(pageIndex, rows, callback) {
      this.$public.user
        .seekuser({
          current: pageIndex,
          deleted: 0,
          size: rows
        })
        .then(res => {
          if (res.code == '000000') {
            this.tableData = res.data.records
            this.loading = false
            callback(this.tableData, +res.data.total)
          }
        })
    },
    editDialogClosed() {
      this.$refs.editUserFormRef.resetFields()
    },
    //提交新建用户
    addPart() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const val = {
            accountNonLocked: false,
            description: this.ruleForm.description,
            enabled: false,
            mobile: this.ruleForm.mobile,
            name: this.ruleForm.name,
            password: this.ruleForm.password,
            roleIds: this.selectRoleId ? this.selectRoleId : [],
            username: this.ruleForm.username
          }
          this.$public.user.adduser(val).then(res => {
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
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //修改用户
    editUser() {
      //   this.editUserForm
      const amend = {
        accountNonLocked: false,
        description: this.editUserForm.description,
        enabled: false,
        mobile: this.editUserForm.mobile,
        name: this.editUserForm.name,
        // password: this.editUserForm.password,
        roleIds: this.selectRoleId ? this.selectRoleId : []
      }
      console.log('editUser -> amend', amend)
      //   this.$public.user.amendkeyuser(this.editUserForm.id, amend).then(src => {
      //     if (src.code == '000000') {
      //       this.$message({
      //         message: '修改成功',
      //         type: 'success'
      //       })
      //       this.$refs.page.getList(1)
      //       this.editDialogVisible = false
      //     }
      //   })
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
      this.$public.user.getkeyuser(id).then(res => {
        if (res.code == '000000') {
          this.roleAl()

          this.editUserForm = res.data
          console.log('handleEdit -> res.data', res.data)
          this.editDialogVisible = true
        }
      })
    },
    // 删除用户
    handleDelete(index, id) {
      //
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$public.user.deleteuser(id).then(src => {
            if (src.code == '000000') {
              this.$message({
                message: '恭喜你，删除成功',
                type: 'success'
              })
              this.$refs.page.getList(1)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })

      //
    }
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
.el-select {
  width: 100%;
}
</style>