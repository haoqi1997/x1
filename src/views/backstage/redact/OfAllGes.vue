<template >
  <div>
    <div class="buttons">
      <div class="buttons">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-input placeholder="请输入用户姓名" clearable @clear="getUserList" v-model="ofgettitle">
              <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4" id="user_add">
            <el-button type="primary" @click="adduser">添加</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--  -->
    <div class="mian">
      <el-table
        :data="oftableData"
        style="width: 100%"
        row-class-name="warning-row"
        border
        v-loading="ofloading"
        element-loading-text="正在获取列表，请稍等..."
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="detailHtml" label="内容"></el-table-column>

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
      <CtrlPage :setPage="getList" ref="page" v-show="0 < oftableData.length" />
      <!-- </div> -->
    </div>
    <!-- 修改用户对话框 -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <div style="display: flex;
    justify-content: space-evenly;">
        <div>
          <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <imgUpload
            :imgSetting="{
                limit: 1,
                isShow:true
            }"
            :getImgUrl="getImgUrl"
          />
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CtrlPage from 'components/component/CtrlPage'
import imgUpload from '../../../components/component/other/upload/imgUpload'

export default {
  name: '',
  data() {
    return {
      formLabelWidth: '120px',
      ofloading: true, //获取表格数据时的遮罩
      ofgettitle: '', //搜索的内容
      oftableData: [], //内容
      editUserForm: '', //编辑
      dialogFormVisible: false,
      form: {
        detailHtml: '',
        orderNum: 0,
        picture: '',
        title: '',
        username: ''
      }
    }
  },
  created() {},
  mounted() {
    this.$refs.page.getList(1)
  },
  methods: {
    //   点击搜索
    getUserList() {},
    // 添加
    adduser() {
      this.dialogFormVisible = true
    }, //搜索
    //确认
    editUser() {},
    getUserList() {
      this.$refs.page.getList(1)
    },
    //打开编辑
    handleEdit(index, id) {
      this.$public.InRegards.inquirebeforeorsincedetails(id).then(res => {
        console.log('handleEdit -> res', res)
        this.editUserForm = res.data
      })
    },

    // 删除用户
    handleDelete(index, id) {
      //
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //   this.$public.user.deleteuser(id).then(src => {
          //     if (src.code == '000000') {
          //       this.$message({
          //         message: '恭喜你，删除成功',
          //         type: 'success'
          //       })
          //       this.$refs.page.getList(1)
          //     }
          //   })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })

      //
    },
    //获取表格列表
    // pageIndex, //每行几个
    // rows,//第几行
    //  callback
    getList(pageIndex, rows, callback) {
      this.$public.InRegards.inquirebeforeorsince({
        current: pageIndex,
        name: this.getUser,
        title: this.ofgettitle,
        size: rows
      }).then(res => {
        if (res.code == '000000') {
          this.oftableData = res.data.records
          this.ofloading = false
          callback(this.oftableData, +res.data.total)
        }
      })
    },
    //获取图片
    getImgUrl(data) {
      console.log('getImgUrl -> data', data)
      // this.form.logo = data
    }
  },
  components: { CtrlPage, imgUpload }
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