<template >
  <div>
    <div class="buttons">
      <div class="buttons">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-input placeholder="请输入标题" clearable @clear="getUsongList" v-model="songtitle">
              <el-button slot="append" icon="el-icon-search" @click="getUsongList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4" id="user_add">
            <el-button type="primary" @click="addsong">添加妙音</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--  -->
    <div class="mian">
      <el-table
        :data="songData"
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
      <CtrlPage :setPage="getList" ref="page" v-show="0 < songData.length" />
      <!-- </div> -->
    </div>
    <!-- 添加 -->
    <el-dialog title="添加妙音" :visible.sync="songDataVisible" width="50%">
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
        <el-form-item label="上传音频" prop="filePath">
          <el-input v-model="ruleForm.filePath" style="display: none !important;"></el-input>
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :on-preview="addhandlePreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :before-remove="beforeRemove"
            :headers="importHeaders"
            :limit="1"
            multiple
            name="files"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">选取文件</el-button>
          </el-upload>
          <audio src id="eventAudio" controls preload>您的浏览器不支持 audio 标签。</audio>
          <!-- <el-input v-model="ruleForm.picture" style="display: none !important;"></el-input>
          <el-upload
            :class="{hide:hideUpload}"
            :action="uploadUrl"
            multiple
            :on-success="songSuccess"
            :headers="importHeaders"
            :on-remove="handleRemove"
            name="files"
            :on-change="handleChange"
            :file-list="songFilesList"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>-->
        </el-form-item>
        <!-- 富文本1 -->
        <!-- <div style="margin-top: 50px;position: relative;">
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
        </el-dialog>-->

        <!-- 上传 -->

        <el-form-item style="margin-top:30px">
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 添加 -->
    <!-- 编辑1 -->
    <el-dialog title="编辑活动" :visible.sync="song" width="50%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="Form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题：" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="简介：" prop="synopsis">
          <el-input
            type="textarea"
            v-model="ruleForm.synopsis"
            placeholder="请输入简介"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item label="上传文件：" prop="picture">
          <el-input v-model="ruleForm.filePath" style="display: none !important;"></el-input>
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :before-remove="beforeRemove"
            :headers="importHeaders"
            :limit="1"
            multiple
            name="files"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <audio src id="eventAudio" controls preload>您的浏览器不支持 audio 标签。</audio>
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
import quillConfig from 'utils/quill-config'
export default {
  name: '',
  data() {
    return {
      songDataVisible: false, //添加的
      dialogImageUrl: '',
      ofloading: true, //列表遮罩
      song: false, //列表遮罩
      songData: [],
      editorimg: [],
      editorimgFilesList: [],
      dialogVisible: false,
      songFilesList: '',
      songtitle: '', //搜索的
      ids: '',
      innerVisible: false, //内

      Dateshijian: '',
      ruleForm: {
        filePath: '',
        synopsis: '',
        title: ''
      },

      uploadUrl: `${window.apiBase}/file/uploadFiles`,
      importHeaders: {
        token: getUserInfo().token
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        synopsis: [{ required: true, message: '请输入简介', trigger: 'blur' }]
      },
      fileList: [] //文件列表
    }
  },
  created() {},
  mounted() {
    this.$refs.page.getList(1)
  },

  methods: {
    //   点击播放
    handleClick(url) {
      console.log('handleClick -> url', url)
      let buttonAudio = document.getElementById('eventAudio')
      buttonAudio.setAttribute('src', url)
      buttonAudio.play()
    },
    handleAvatarSuccess(res, file) {
      console.log('handleAvatarSuccess -> res, file', res, file)
      this.ruleForm.filePath = res.data[0]
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log('handlePreview -> file', file)
      this.handleClick(file.url)
    },
    addhandlePreview(file) {
      this.handleClick(file.response.data)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    //超出限制数隐藏
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount
      console.log('handleChange -> hideUpload', this.hideUpload)
    },
    //   富文本上传cg

    //打开编辑
    handleEdit(index, id) {
      this.ids = id
      this.songFilesList = []
      this.$public.audioFileController.audioFileid(id).then(res => {
        if (res.code == '000000') {
          this.ruleForm = res.data
          this.fileList = [
            {
              name: '音频.mp3',
              url: res.data.filePath
            }
          ]
          this.songFilesList = res.data.filePath
          this.song = true
        }
      })
    },
    //   搜索
    getUsongList() {
      this.$refs.page.getList(1)
    },
    //   添加
    addsong() {
      this.ruleForm = {
        synopsis: '',
        title: '',
        filePath: ''
      }
      this.fileList = []
      this.songDataVisible = true
    },

    //获取表格列表
    // pageIndex, //每行几个
    // rows,//第几行
    //  callback
    getList(pageIndex, rows, callback) {
      this.$public.audioFileController
        .audioFileConditions({
          current: pageIndex,
          size: rows,
          title: this.songtitle
        })
        .then(res => {
          if (res.code == '000000') {
            this.songData = res.data.records
            this.ofloading = false
            callback(this.songData, +res.data.total)
          }
        })
    },
    // 提交
    submitForm(formName) {
      this.handleClick('')
      console.log('submitForm -> this.ruleForm', this.ruleForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$public.audioFileController
            .adsdaudioFile(this.ruleForm)
            .then(res => {
              if (res.code == '000000') {
                this.$$message({
                  message: '添加成功！',
                  type: 'success'
                })
                this.$refs[formName].resetFields()
                this.$refs.page.getList(1)
                this.songDataVisible = false
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
      this.handleClick('')
      console.log('redactForm -> formName', formName)
      const v1 = {
        filePath: this.ruleForm.filePath,
        synopsis: this.ruleForm.synopsis,
        title: this.ruleForm.title
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$public.audioFileController
            .putaudioFile(this.ids, v1)
            .then(res => {
              if (res.code == '000000') {
                this.$$message({
                  message: '修改成功！',
                  type: 'success'
                })
                this.$refs[formName].resetFields()
                this.$refs.page.getList(1)
                this.song = false
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
      this.handleClick('')
      this.song = false
      this.songDataVisible = false
      this.$refs[formName].resetFields()
    },

    // 删除用户
    handleDelete(index, id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$public.audioFileController.DELETEaudioFile(id).then(res => {
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
#eventAudio {
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  display: none;
}
</style>