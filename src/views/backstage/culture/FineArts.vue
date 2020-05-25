<template >
  <div>
    <div class="buttons">
      <div class="buttons">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-date-picker
              v-model="Dateshijian"
              type="daterange"
              align="right"
              unlink-panels
              @blur="getUFineArtsList"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-col>
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
            <el-button type="primary" @click="addFineArts">添加活动</el-button>
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
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="openTime" label="开放时间"></el-table-column>
        <el-table-column prop="startDate" label="开始时间"></el-table-column>
        <el-table-column prop="endDate" label="结束时间"></el-table-column>
        <el-table-column prop="sponsor" label="主办单位"></el-table-column>
        <el-table-column prop="coSponsor" label="协办单位"></el-table-column>

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
    <el-dialog title="添加活动" :visible.sync="FineArtsDataVisible" width="50%">
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
        <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address" placeholder="请输入活动地址"></el-input>
        </el-form-item>
        <el-form-item label="开放时间" prop="openTime">
          <el-input v-model="ruleForm.openTime" placeholder="请输入开放时间"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" required>
          <el-form-item prop="startDate">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="ruleForm.startDate"
              type="date"
              placeholder="请选择开始日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="结束日期" required>
          <el-form-item prop="endDate">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="ruleForm.endDate"
              type="date"
              placeholder="请选择结束日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="主办单位" prop="sponsor">
          <el-input v-model="ruleForm.sponsor" placeholder="请选择主办单位"></el-input>
        </el-form-item>
        <el-form-item label="协办单位" prop="coSponsor">
          <el-input v-model="ruleForm.coSponsor" placeholder="请选择协办单位"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="synopsis">
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
            :action="uploadUrl"
            list-type="picture-card"
            :on-success="FineArtsSuccess"
            :headers="importHeaders"
            :on-remove="handleRemove"
            name="files"
            :limit="1"
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
          <el-input v-model="ruleForm.title" placeholder="请输入活动标题"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address" placeholder="请输入活动地址"></el-input>
        </el-form-item>
        <el-form-item label="开放时间" prop="openTime">
          <el-input v-model="ruleForm.openTime" placeholder="请输入开放时间"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" required>
          <el-form-item prop="startDate">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="ruleForm.startDate"
              type="date"
              placeholder="请选择开始日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="结束日期" required>
          <el-form-item prop="endDate">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="ruleForm.endDate"
              type="date"
              placeholder="请选择结束日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="主办单位" prop="sponsor">
          <el-input v-model="ruleForm.sponsor" placeholder="请选择主办单位"></el-input>
        </el-form-item>
        <el-form-item label="协办单位" prop="coSponsor">
          <el-input v-model="ruleForm.coSponsor" placeholder="请选择协办单位"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="synopsis">
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
            :action="uploadUrl"
            list-type="picture-card"
            ref="uplo"
            :on-success="FineArtsSuccess"
            :headers="importHeaders"
            :on-remove="handleRemove"
            name="files"
            :limit="1"
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
          <el-button type="primary" @click="redactForm('Form')">确认修改</el-button>
          <el-button @click="resetForm()">取消</el-button>
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
      dialogVisible: false,
      FineArtsFilesList: [],
      FineArtstitle: '', //搜索的
      ids: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      Dateshijian: '',
      ruleForm: {
        address: '',
        coSponsor: '',
        endDate: '',
        openTime: '',
        picture: '',
        sponsor: '',
        startDate: '',
        title: ''
        // detailHtml: ''
      },
      //   11
      innerVisible: false,
      editorimg: [],
      editorimgFilesList: [],
      //   22

      uploadUrl: `${window.apiBase}/file/uploadFiles`,
      importHeaders: {
        token: getUserInfo().token
      },
      rules: {
        title: [{ required: true, message: '请输入活动标题', trigger: 'blur' }],
        synopsis: [
          { required: true, message: '请输入活动简介', trigger: 'blur' }
        ],
        openTime: [
          { required: true, message: '请输入开放时间', trigger: 'blur' }
        ],
        sponsor: [
          { required: true, message: '请输入主办单位名称', trigger: 'blur' }
        ],
        coSponsor: [
          { required: true, message: '请输入协办单位名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请选择活动地点', trigger: 'change' }
        ],
        openTime: [
          {
            type: 'string',
            required: true,
            message: '请选择选择开放日期',
            trigger: 'change'
          }
        ],
        startDate: [
          {
            type: 'string',
            required: true,
            message: '请选择开始日期',
            trigger: 'change'
          }
        ],
        endDate: [
          {
            type: 'string',
            required: true,
            message: '请选择结束时间',
            trigger: 'change'
          }
        ],
        picture: [
          {
            required: true,
            message: '请上传照片'
          }
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
    //   11
    //   富文本上传cg
    editorSuccess(res) {
      console.log('editorSuccess -> res', res)
      this.editorimg.push(res.data[0])
    },
    //点击上传时拿到富文本的位置
    uploads() {
      let quill = this.$refs.myQuillEditor.quill
      this.quilllength = quill.getSelection() ? quill.getSelection().index : 0
      this.innerVisible = true
    }, // 富文本上传成功
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
    //   22
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 1MB!')
      }
      return isLt2M
    },
    //打开编辑
    handleEdit(index, id) {
      this.ids = id
      this.FineArtsFilesList = []
      this.$public.exhibitionController.exhibitionid(id).then(res => {
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
      ;(this.ruleForm = {
        address: '',
        coSponsor: '',
        endDate: '',
        openTime: '',
        picture: '',
        sponsor: '',
        startDate: '',
        title: ''
        // detailHtml: ''
      }),
        (this.FineArtsFilesList = []),
        (this.FineArtsDataVisible = true)
    },
    //获取表格列表
    // pageIndex, //每行几个
    // rows,//第几行
    //  callback
    getList(pageIndex, rows, callback) {
      // this.Dateshijian

      this.$public.exhibitionController
        .exhibitionConditions({
          current: pageIndex,
          title: this.FineArtstitle,
          size: rows,
          entDate: this.Dateshijian[1] || '',
          startDate: this.Dateshijian[0] || ''
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
          this.$public.exhibitionController
            .addexhibition(this.ruleForm)
            .then(res => {
              if (res.code == '000000') {
                this.$$message({
                  message: '添加成功！',
                  type: 'success'
                })
                this.$refs[formName].resetFields()
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
      const v1 = {
        address: this.ruleForm.address,
        coSponsor: this.ruleForm.coSponsor,
        endDate: this.ruleForm.endDate,
        openTime: this.ruleForm.openTime,
        picture: this.ruleForm.picture,
        sponsor: this.ruleForm.sponsor,
        startDate: this.ruleForm.startDate,
        title: this.ruleForm.title,
        synopsis: this.ruleForm.synopsis
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$public.exhibitionController
            .putexhibitionid(this.ids, v1)
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
      //   let that = this
      //   that.imgList = []
      //   fileList.map(function(item) {
      //     that.imgList.push(item.response.data[0])
      //   })
    }, // 删除用户
    handleDelete(index, id) {
      console.log('handleDelete -> index, id', index, id)
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$public.exhibitionController.DELETEexhibition(id).then(res => {
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
.ql-image {
  display: none !important;
}
.wids {
  width: 460px;
}
.el-table td,
.el-table th {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>