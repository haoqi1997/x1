<template >
  <div>
    <div class="buttons">
      <div class="buttons">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-input
              placeholder="请输入标题"
              clearable
              @clear="getUFineArtsList"
              v-model="FineArtstitle"
            >
              <el-button slot="append" icon="el-icon-search" @click="getUFineArtsList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4" id="user_add">
            <el-button type="primary" @click="addFineArts">添加法会报道</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--  -->
    <div class="mian">
      <el-table
        :data="FineArtsData"
        style="width: 100%"
        row-class-name="warning-row"
        border
        v-loading="ofloading"
        element-loading-text="正在获取列表，请稍等..."
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="synopsis" label="简介"></el-table-column>

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
      <CtrlPage :setPage="getList" ref="page" v-show="0 < FineArtsData.length" />
      <!-- </div> -->
    </div>
    <!-- 添加 -->
    <el-dialog title="添加法会报道" :visible.sync="FineArtsDataVisible" width="50%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入活动标题"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="synopsis">
          <!-- <el-input v-model="ruleForm.synopsis" placeholder="请输入简介"></el-input> -->
          <el-input
            type="textarea"
            v-model="ruleForm.synopsis"
            placeholder="请输入简介"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="上传照片" prop="picture">
          <el-input v-model="ruleForm.picture" style="display: none !important;"></el-input>
          <el-upload
            :class="{hide:hideUpload}"
            :action="uploadUrl"
            list-type="picture-card"
            :on-success="FineArtsSuccess"
            :headers="importHeaders"
            :on-remove="handleRemove"
            name="files"
            :on-change="handleChange"
            :file-list="FineArtsFilesList"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <!-- 富文本1 -->
        <div style="margin-top: 50px;position: relative;">
          <el-button
            @click="uploads"
            type="primary"
            size="small"
            style="position: absolute;
    right: 0;"
          >上传照片</el-button>
          <quill-editor
            ref="myQuillEditor"
            class="editor"
            :options="editorOption"
            v-model="ruleForm.detailHtml"
          ></quill-editor>
        </div>
        <!-- 富文本2 -->
        <!-- 上传 -->
        <el-dialog width="30%" title="上传图片" :visible.sync="innerVisible" append-to-body>
          <el-upload
            :action="uploadUrl"
            list-type="picture-card"
            :on-success="editorSuccess"
            :headers="importHeaders"
            name="files"
            :file-list="editorimgFilesList"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>

          <div slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">取 消</el-button>
            <el-button type="primary" @click="Success ">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 上传 -->

        <el-form-item style="margin-top:30px">
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 添加 -->
    <!-- 编辑1 -->
    <el-dialog title="编辑活动" :visible.sync="FineArts" width="50%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="Form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="synopsis">
          <!-- <el-input v-model="ruleForm.synopsis" placeholder="请输入简介"></el-input> -->
          <el-input
            type="textarea"
            v-model="ruleForm.synopsis"
            placeholder="请输入简介"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="上传照片" prop="picture">
          <el-input
            v-model="ruleForm.picture"
            placeholder="请选择协办单位"
            style="display: none !important;"
          ></el-input>
          <el-upload
            :class="{hide:hideUpload}"
            :action="uploadUrl"
            list-type="picture-card"
            ref="uplo"
            :on-success="FineArtsSuccess"
            :headers="importHeaders"
            :on-remove="handleRemove"
            name="files"
            :file-list="FineArtsFilesList"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <!-- 富文本1 -->
        <div style="margin-top: 50px;position: relative;">
          <el-button
            @click="uploads"
            type="primary"
            size="small"
            style="position: absolute;
    right: 0;"
          >上传照片</el-button>
          <quill-editor
            ref="myQuillEditor"
            class="editor"
            :options="editorOption"
            v-model="ruleForm.detailHtml"
          ></quill-editor>
        </div>
        <!-- 富文本2 -->
        <!-- 上传 -->
        <el-dialog width="30%" title="上传图片" :visible.sync="innerVisible" append-to-body>
          <el-upload
            :action="uploadUrl"
            list-type="picture-card"
            :on-success="editorSuccess"
            :headers="importHeaders"
            name="files"
            :file-list="editorimgFilesList"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <div slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">取 消</el-button>
            <el-button type="primary" @click="Success ">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 上传 -->
        <el-form-item style="margin-top:30px">
          <el-button type="primary" @click="redactForm('Form')">确认编辑</el-button>
          <el-button @click="resetForm('Form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import CtrlPage from 'components/component/CtrlPage'
import { getUserInfo } from 'utils/auth'
//import quillConfig from 'utils/quill-config'
export default {
  name: '',
  data() {
    return {
      FineArtsDataVisible: false, //添加的
      dialogImageUrl: '',
      ofloading: true, //列表遮罩
      FineArts: false, //列表遮罩
      FineArtsData: [],
      editorimg: [],
      editorimgFilesList: [],
      dialogVisible: false,
      FineArtsFilesList: [],
      FineArtstitle: '', //搜索的
      ids: '',
      innerVisible: false, //内

      Dateshijian: '',
      ruleForm: {
        picture: '',
        synopsis: '',
        title: '',
        typeCode: 'report',
        detailHtml: ''
      },

      uploadUrl: `${window.apiBase}/file/uploadFiles`,
      importHeaders: {
        token: getUserInfo().token
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        synopsis: [{ required: true, message: '请输入简介', trigger: 'blur' }],
        picture: [
          {
            required: true,
            message: '请上传照片'
          }
        ]
      },
      editorOption: {},
      quilllength: '', //光标位置
      hideUpload: false,
      limitCount: 1
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
      console.log('editorSuccess -> this.editorimg', this.editorimg)
    },
    //点击上传时拿到富文本的位置
    uploads() {
      let quill = this.$refs.myQuillEditor.quill
      this.quilllength = quill.getSelection() ? quill.getSelection().index : 0
      console.log('uploads -> this.quilllength', this.quilllength)
      this.innerVisible = true
    },
    beforeAvatarUpload(file) {
      console.log('beforeAvatarUpload -> file', file)
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return isLt2M
    },
    //打开编辑
    handleEdit(index, id) {
      this.ids = id
      this.FineArtsFilesList = []
      this.$public.happeningController.happeningid(id).then(res => {
        if (res.code == '000000') {
          this.ruleForm = res.data
          this.FineArtsFilesList.push({
            url: res.data.picture,
            name: res.data.title,
            id: res.data.id
          })
          this.FineArts = true
        }
      })
    },
    //   上传照片
    FineArtsSuccess(res) {
      this.ruleForm.picture = res.data[0]
      //   if (this.ruleForm.picture) {
      //     let box = document.getElementsByClassName('el-upload').style
      //     // box.style.display = 'none'
      //     console.log('FineArtsSuccess -> box', box)
      //   }
    },
    //   搜索
    getUFineArtsList() {
      this.$refs.page.getList(1)
    },
    //   添加
    addFineArts() {
      ;(this.hideUpload = false),
        (this.ruleForm = {
          picture: '',
          synopsis: '',
          title: '',
          typeCode: 'report',
          detailHtml: ''
        })
      this.FineArtsFilesList = []
      this.FineArtsDataVisible = true
    },
    // 富文本上传成功
    Success() {
      // 获取富文本组件实例
      this.innerVisible = false
      this.editorimg.forEach(item => {
        let res = item
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
      })
      this.editorimg = []
    },
    //获取表格列表
    // pageIndex, //每行几个
    // rows,//第几行
    //  callback
    getList(pageIndex, rows, callback) {
      // this.Dateshijian

      this.$public.happeningController
        .happeningConditions({
          current: pageIndex,
          size: rows,
          title: this.FineArtstitle,
          typeCode: 'report'
        })
        .then(res => {
          if (res.code == '000000') {
            this.FineArtsData = res.data.records
            this.ofloading = false
            callback(this.FineArtsData, +res.data.total)
          }
        })
    },
    // 提交
    submitForm(formName) {
      console.log('submitForm -> this.ruleForm', this.ruleForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$public.happeningController
            .addhappening(this.ruleForm)
            .then(res => {
              if (res.code == '000000') {
                this.$$message({
                  message: '添加成功！',
                  type: 'success'
                })
                this.$refs[formName].resetFields()
                // this.$refs[formName].resetFields()
                this.$refs.page.getList(1)
                this.FineArtsDataVisible = false
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 编辑
    redactForm(formName) {
      console.log('redactForm -> formName', formName)
      const v1 = {
        detailHtml: this.ruleForm.detailHtml,
        picture: this.ruleForm.picture,
        synopsis: this.ruleForm.synopsis,
        title: this.ruleForm.title,
        typeCode: 'report'
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$public.happeningController
            .puthappeningid(this.ids, v1)
            .then(res => {
              if (res.code == '000000') {
                this.$$message({
                  message: '修改成功！',
                  type: 'success'
                })
                this.$refs[formName].resetFields()
                this.$refs.page.getList(1)
                this.FineArts = false
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //重置
    resetForm(formName) {
      this.FineArts = false
      this.FineArtsDataVisible = false
      this.$refs[formName].resetFields()
    },

    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.ruleForm.picture = ''
      this.hideUpload = fileList.length >= this.limitCount
    },
    // 删除用户
    handleDelete(index, id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$public.happeningController.DELETEhappening(id).then(res => {
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
    }
  },
  components: { CtrlPage }
}
</script>
<style >
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
.cell {
  height: 29px;
  width: 697px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hide .el-upload--picture-card {
  display: none;
}
</style>