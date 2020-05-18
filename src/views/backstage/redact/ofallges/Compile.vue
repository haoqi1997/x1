<template>
  <div>
    <el-form :model="form" ref="dateForm" :rules="rules">
      <div style="display: flex;
    justify-content: space-evenly; width: 50%;height:276px">
        <div>
          <el-form-item label="标题:" :label-width="formLabelWidth" prop="title">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="序号:" :label-width="formLabelWidth" prop="orderNum">
            <el-input v-model.number="form.orderNum" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-upload
            :action="uploadUrl"
            list-type="picture-card"
            :on-success="handleSuccess"
            :headers="importHeaders"
            :on-preview="handlePictureCardPreview"
            :limit="1"
            name="files"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </div>
    </el-form>
    <div>
      <!-- 富文本 -->
      <vue-ueditor-wrap v-model="form.detailHtml" :config="myConfig"></vue-ueditor-wrap>
      <!-- 富文本 end -->
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '../../../../utils/auth'
import VueUeditorWrap from 'vue-ueditor-wrap'

export default {
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
        orderNum: '',
        picture: '',
        title: '',
        username: ''
      },
      fileList: [], //上传列表

      uploadUrl: `${window.apiBase}/file/uploadFiles`,
      importHeaders: {
        token: getUserInfo().token
      },
      dialogImageUrl: '',
      dialogVisible: false,
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        // serverUrl: `${window.apiBase}/file/uploadFiles`,
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/UEditor/'
      },
      rules: {
        title: [{ required: true, message: '请输入标题名称', trigger: 'blur' }],
        orderNum: [
          { required: true, message: '请输入序号', trigger: 'blur' },
          { type: 'number', message: '序号必须为数字值' }
        ]
      }
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isLt2M
    },
    handlePictureCardPreview(file) {
      console.log('handlePictureCardPreview -> file', file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      let that = this
      that.imgList = []
      fileList.map(function(item) {
        that.imgList.push(item.response.data[0])
      })
      console.log('handleRemove -> fileList', fileList)
      // console.log('Remove', that.imgList);
    },

    // 文件上传成功时的钩子
    handleSuccess(res) {
      console.log('handleSuccess -> res', res)
      this.fileList.push(res.data[0])
      this.form.picture = this.fileList[0]
      // console.log(this.imgList);
    },
    submitForm() {
      this.form.username = JSON.parse(
        localStorage.getItem('menuList')
      ).userVo.username
      console.log('form', this.form)
      this.$public.InRegards.allbeforeorsince(this.form).then(res => {
        if (res.code == '000000') {
          this.$$message({
            message: '编辑成功！',
            type: 'success'
          })
          this.$router.push({
            path: '/backstage/OfAllGes'
          })
        }
      })
    }
  },
  components: {
    VueUeditorWrap
  }
}
</script>