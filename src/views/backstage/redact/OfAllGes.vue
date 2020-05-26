<template >
  <div>
    <div class="buttons">
      <div class="buttons">
        <el-row>
          <el-col :span="7">
            <el-input placeholder="请输入标题" clearable @clear="getUserList" v-model="ofgettitle">
              <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4" id="user_add">
            <el-button type="primary" @click="adduser">添加文章</el-button>
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
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="orderNum" label="排序"></el-table-column>

        <el-table-column label="操作" width="150">
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
    <!-- 添加对话框 -->
    <el-dialog title="添加" :visible.sync="addFormVisible">
      <el-form :model="form" ref="dateForm" :rules="rules">
        <div style="display: flex;
    justify-content: space-evenly;">
          <div>
            <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
              <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="序号" :label-width="formLabelWidth" prop="orderNum">
              <el-input v-model.number="form.orderNum" autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-upload
              :class="{hide:hideUpload}"
              :action="uploadUrl"
              list-type="picture-card"
              :on-success="handleSuccess"
              :headers="importHeaders"
              :on-remove="handleRemove"
              name="files"
              :on-change="handleChange"
              :file-list="imgFilesList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </div>

        <div style="margin-top: 50px;position: relative;">
          <!-- <el-button
            @click="adduploads"
            type="primary"
            size="small"
            style="position: absolute;
    right: 0;"
          >上传照片</el-button>-->
          <quill-editor
            :id="56565"
            class="editor"
            ref="addQuillEditor"
            :options="editorOption"
            v-model="form.detailHtml"
          ></quill-editor>
        </div>
      </el-form>
      <el-dialog width="30%" title="上传图片" :visible.sync="addVisible" append-to-body>
        <el-upload
          :class="{hide:hideUpload}"
          :action="uploadUrl"
          list-type="picture-card"
          :on-success="editorSuccess"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :headers="importHeaders"
          name="files"
          :file-list="editorimgFilesList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <img width="100%" :src="dialogImageUrl" alt />
        <div slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSuccess ">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('dateForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="dateForm" :rules="rules">
        <div style="display: flex;
    justify-content: space-evenly;">
          <div>
            <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
              <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="序号" :label-width="formLabelWidth" prop="orderNum">
              <el-input v-model.number="form.orderNum" autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-upload
              :class="{hide:hideUpload}"
              :action="uploadUrl"
              list-type="picture-card"
              :on-success="handleSuccess"
              :on-change="handleChange"
              :headers="importHeaders"
              :on-remove="handleRemove"
              :limit="1"
              name="files"
              :file-list="imgFilesList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </div>
        <!-- 富文本1 -->
        <div style="margin-top: 50px;position: relative;">
          <!-- <el-button
            @click="uploads"
            type="primary"
            size="small"
            style="position: absolute;
    right: 0;"
          >上传照片</el-button>-->
          <quill-editor
            ref="myQuillEditor"
            class="editor"
            :id="56562565"
            :options="editorOption"
            v-model="form.detailHtml"
          ></quill-editor>
        </div>
        <!-- 富文本2 -->
      </el-form>
      <el-dialog width="30%" title="上传图片" :visible.sync="innerVisible" append-to-body>
        <el-upload
          :action="uploadUrl"
          list-type="picture-card"
          :on-success="editorSuccess"
          :headers="importHeaders"
          name="files"
          :file-list="editorimgFilesList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <img width="100%" :src="dialogImageUrl" alt />
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="Success ">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="putbeforeorsince('dateForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 富文本的上传 -->
  </div>
</template>
<script>
import CtrlPage from 'components/component/CtrlPage'
import { getUserInfo } from '../../../utils/auth'
// import quillConfig from '../../../utils/quill-config'

export default {
  name: '',
  data() {
    return {
      hideUpload: false,
      limitCount: 1,
      //   数量
      addVisible: false,
      innerVisible: false, //内
      editorimg: [], //富文本上传接口
      editorimgFilesList: [], //富文本上传
      formLabelWidth: '120px',
      ofloading: true, //获取表格数据时的遮罩
      ofgettitle: '', //搜索的内容
      oftableData: [], //内容
      editUserForm: '', //编辑
      dialogFormVisible: false, //添加
      addFormVisible: false, //修改
      ids: '',
      form: {
        detailHtml: '',
        orderNum: '',
        picture: '',
        title: '',
        username: ''
      },
      uploadUrl: `${window.apiBase}/file/uploadFiles`,
      importHeaders: {
        token: getUserInfo().token
      },
      dialogVisible: false,
      dialogImageUrl: '',
      fileList: [], //上传列表
      imgFilesList: [],
      rules: {
        title: [{ required: true, message: '请输入标题名称', trigger: 'blur' }],
        orderNum: [
          { required: true, message: '请输入序号', trigger: 'blur' },
          { type: 'number', message: '序号必须为数字值' }
        ]
      },

      editorOption: {},
      quilllength: '' //光标位置
    }
  },
  created() {},
  mounted() {
    this.$refs.page.getList(1)
  },
  methods: {
    //超出限制数隐藏
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount
      console.log('handleChange -> hideUpload', this.hideUpload)
    },
    //   富文本上传cg
    editorSuccess(res) {
      console.log('editorSuccess -> res', res)
      this.editorimg.push(res.data[0])
    },

    getContent() {
      console.log('content', this.content)
    },
    onEditorBlur($event) {
      console.log('$event', $event)
    },
    onEditorFocus($event) {
      console.log('$event', $event)
    },

    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      let that = this
      that.imgList = []
      //   alert(526)
      this.hideUpload = fileList.length >= this.limitCount
      fileList.map(function(item) {
        that.imgList.push(item.response.data[0])
      })
    },

    // 文件上传成功时的钩子
    handleSuccess(res) {
      console.log('handleSuccess -> res', res)
      this.fileList.push(res.data[0])
      this.form.picture = this.fileList[0]
      // console.log(this.imgList);
    },
    //   点击搜索
    getUserList() {},
    //新增
    adduploads() {
      this.quilllength = ''
      let quill = this.$refs.addQuillEditor.quill
      this.quilllength = quill.getSelection().index || 0
      console.log('uploads ->  quill.getSelection()', quill.getSelection())
      this.addVisible = true
    },
    uploads() {
      let quill = this.$refs.myQuillEditor.quill
      this.quilllength = quill.getSelection().index || 0
      this.innerVisible = true
    },
    // 富文本上传成功
    addSuccess() {
      // 获取富文本组件实例
      this.addVisible = false
      let res = this.editorimg[0]
      let quill = this.$refs.addQuillEditor.quill
      // 如果上传成功
      if (res) {
        // 获取光标所在位置
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(this.quilllength, 'image', res)
        // 调整光标到最后
        quill.setSelection(this.quilllength + 1)
        this.editorimgFilesList = []
      } else {
        // 提示信息，需引入Message
        Message.error('图片插入失败')
      }
    },
    // 富文本上传成功
    Success() {
      // 获取富文本组件实例
      this.innerVisible = false
      let res = this.editorimg[0]
      console.log('Success -> res', res)
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      if (res) {
        // 获取光标所在位置
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(this.quilllength, 'image', res)
        // 调整光标到最后
        quill.setSelection(this.quilllength + 1)
        this.editorimgFilesList = []
      } else {
        // 提示信息，需引入Message
        Message.error('图片插入失败')
      }
    },
    // 添加
    adduser() {
      const _this = this
      ;(_this.hideUpload = false),
        (this.form = {
          detailHtml: '',
          orderNum: 0,
          picture: '',
          title: '',
          username: ''
        })
      this.imgFilesList = []
      this.addFormVisible = true
    }, //搜索
    //确认
    editUser() {},
    getUserList() {
      this.$refs.page.getList(1)
    },
    //打开编辑
    handleEdit(index, id) {
      const _this = this
      this.ids = id
      this.imgFilesList = []
      this.$public.InRegards.inquirebeforeorsincedetails(id).then(res => {
        if (res.code == '000000') {
          this.form = res.data
          this.imgFilesList.push({
            url: res.data.picture,
            name: res.data.title,
            id: res.data.id
          })
          this.hideUpload = this.imgFilesList.length >= this.limitCount
          this.dialogFormVisible = true
        }
      })
    },
    //修改
    putbeforeorsince(dateForm) {
      const aa = {
        detailHtml: this.form.detailHtml,
        orderNum: this.form.orderNum,
        picture: this.form.picture,
        title: this.form.title,
        username: this.form.username
      }
      this.$refs[dateForm].validate(valid => {
        if (valid) {
          this.$public.InRegards.putbeforeorsince(this.ids, aa).then(res => {
            if (res.code == '000000') {
              this.$$message({
                message: '修改成功！',
                type: 'success'
              })
              this.dialogFormVisible = false
              this.$refs.page.getList(1)
              this.$refs[dateForm].resetFields()
            }
          })
        }
      })
    },

    // 删除用户
    handleDelete(index, id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$public.InRegards.DELETEbeforeorsince(id).then(res => {
            console.log('handleDelete -> res', res)
            if (res.code == '000000') {
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
    submitForm(dateForm) {
      this.$refs[dateForm].validate(valid => {
        if (valid) {
          this.form.username = JSON.parse(
            localStorage.getItem('menuList')
          ).userVo.username

          this.$public.InRegards.allbeforeorsince(this.form).then(res => {
            if (res.code == '000000') {
              this.$$message({
                message: '添加成功！',
                type: 'success'
              })
              this.addFormVisible = false
              this.$refs[dateForm].resetFields()
              this.$refs.page.getList(1)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  components: { CtrlPage }
}
</script>
<style>
.el-table .warning-row:nth-child(2n) {
  background: oldlace;
}

.el-table th,
.el-table tr th {
  background-color: #f8f8f8;
}
.el-select {
  width: 100%;
}
.cell {
  height: 29px;
  width: 697px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ql-image {
  display: none !important;
}
.hide .el-upload--picture-card {
  display: none;
}
.hide .el-upload--picture-card {
  display: none;
}
</style>