<template>
  <div class="clear" style="padding-bottom:18px;">
    <form class="uploadPicForm clearfix" enctype="multipart/form-data">
      <div class="addimg" v-if="this.fileList.length<imgSetting.limit">
        <div class="showBg" v-if="showBg">
          <img :src="showBg" alt />
        </div>
        <input type="file" class="uploadFile" accept="image/*" @change="readLocalFile($event)" />
        <i class="el-icon-plus" v-if="!showBg"></i>
        <span class="limit" v-if="!imgSetting.isShow">最多可上传{{imgSetting.limit}}张</span>
      </div>
      <div
        class="img1 clearfix"
        :class="[imgSetting.limit>1? 'ismargin' : 'nomargin']"
        v-for="(urls, index) in fileList "
        :key="urls"
      >
        <div class="delete clearfix" @click="deleteImg(index)">
          <i class="el-icon-error"></i>
        </div>
        <img v-imgPreview class="img" :src="$joinImgPrefix(urls)" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    imgSetting: Object,
    imgUrls: {
      type: Array,
      default: function() {
        return []
      }
    },
    appUrls: {
      type: Array,
      default: function() {
        return []
      }
    },
    getImgUrl: Function,
    showBg: {
      type: String,
      default: function() {
        return null
      }
    }
  },
  data() {
    return {
      files: [],
      fileList: [],
      isImg: true,
      appFileList: []
    }
  },
  watch: {
    imgUrls() {
      this.fileList = this.imgUrls.filter(item => {
        return item != ''
      })
    },
    appUrls() {
      this.appFileList = this.appUrls.filter(item => {
        return item != ''
      })
    }
  },
  mounted() {
    this.fileList = this.imgUrls.filter(item => {
      return item != ''
    })
    this.appFileList = this.appUrls.filter(item => {
      return item != ''
    })
  },
  methods: {
    //删除图片
    deleteImg(index) {
      this.fileList.splice(index, 1)
      this.appFileList.splice(index, 1)
      this.$$message({
        message: '图片删除成功！',
        type: 'success'
      })
      if (this.imgSetting.isAppSetting) {
        this.getImgUrl(this.appFileList)
      } else {
        this.getImgUrl(this.fileList.join(','))
      }
    },
    deleteallImg() {
      this.fileList.splice(0)
      this.appFileList.splice(0)
    },
    //图片上传
    readLocalFile(e) {
      console.log('readLocalFile -> e', e)
      let localFile = e.target.files[0]
      if (!localFile || localFile.size == 0) {
        return
      }
      this.files.push(localFile)

      //获取图片base64代码
      var reader = new FileReader()
      var content
      var current = this
      content = reader.readAsDataURL(localFile, 'UTF-8')

      reader.onload = event => {
        content = event.target.result
        // current.imgs.push(content);
      }
      reader.onerror = event => {
        alert('error')
      }
      //上传开始
      var formData = new FormData()
      formData.append('file', this.files[this.files.length - 1])
      console.log(
        'readLocalFile -> this.files[this.files.length - 1]',
        this.files[this.files.length - 1]
      )

      this.$public.file
        .uploadFiles(formData)
        .then(res => {
          console.log('readLocalFile -> res', res)
          if (res.code == '000000') {
            this.$$message({
              message: '图片上传成功！',
              type: 'success'
            })
            if (this.imgSetting.isAppSetting) {
              this.fileList.push(res.data.fileUrl)
              this.appFileList.push(res.data)
              this.getImgUrl(this.appFileList)
            } else {
              this.fileList.push(res.data.fileUrl)
              this.getImgUrl(this.fileList.join(','))
            }
          }
        })
        .catch(res => {
          console.log(res)
        })
    },
    clearFileList() {
      this.fileList = []
    }
  }
}
</script>

<style lang="less">
//拍照
.uploadPicForm {
  .ismargin {
    margin-left: 30px;
  }
  .img1 {
    float: left;
    position: relative;
    .delete {
      text-align: right;
      position: absolute;
      right: -10px;
      top: -15px;
      padding: 0px;
      i {
        float: left;
        font-size: 20px;
        opacity: 0.5;
        cursor: pointer;
      }
    }
    .img {
      border: none;
      display: block;
      height: 120px;
      max-width: 240px;
    }
  }
  .addimg {
    width: 160px;
    height: 120px;
    border: 1px dashed #cccccc;
    border-radius: 6px;
    float: left;
    padding: 0;
    background: #fbfdff;
    position: relative;
    margin-bottom: 25px;
    .uploadFile {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      opacity: 0;
      z-index: 1;
    }
    i {
      display: inline-block;
      width: 160px;
      height: 120px;
      line-height: 120px !important;
      text-align: center;
      font-size: 25px;
      cursor: pointer;
      color: #cccccc;
    }
    .limit {
      font-size: 14px;
      color: #606266;
    }
    .showBg {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .addimg:hover {
    border-color: #409eff;
    i {
      color: #409eff;
    }
  }
}
</style>

