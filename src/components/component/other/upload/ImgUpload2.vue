<template>
  <dl class="clear">
    <dd class="clear">
      <div class="item" v-for="(lst, index) in list" :key="index">
        <img :src="$joinImgPrefix(lst.url)" :alt="lst.name" v-if="lst.url" />
        <span v-else class="el-icon-loading"></span>
        <i class="icon-x-yyguanbi2" @click="del(index)"></i>
      </div>
    </dd>
    <dt v-if="list.length < limit">
      <div class="file-wrap">
        <i class="icon-x-Upload-pictures"></i>
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png, image/gif"
          @change="readerFile($event)"
          :multiple="limit - list.length > 1"
        />
      </div>
      <p>{{ list.length }}/{{ limit }}</p>
    </dt>
  </dl>
</template>

<script>
export default {
  props: {
    limit: {
      type: Number,
      default() {
        return 3
      }
    },
    value: {
      type: [Array, Object],
      default() {
        return []
      }
    }
  },
  data() {
    return {
      list: this.value || []
    }
  },
  watch: {
    value() {
      this.list = this.value || []
    }
  },
  methods: {
    // 读取图片
    readerFile(e) {
      let files = e.target.files
      if (files.length) {
        if (files.length > this.limit - this.list.length) {
          this.$$message({
            message: `最多可上传${this.limit - this.list.length}张图片`
          })
          e.target.value = ''
        } else {
          for (let i = 0; i < files.length; i++) {
            this.uploader(files[i])
            if (i == files.length - 1) {
              e.target.value = ''
            }
          }
        }
      }
    },
    // 上传图上
    uploader(file) {
      let formData = new FormData()
      formData.append('file', file)
      let item = {
        name: file.name
      }
      this.list.push(item)
      this.$public.file.uploadFiles(formData).then(res => {
        if (res.code == 1000) {
          this.$set(item, 'url', res.data.fileUrl)
          this.$emit('input', this.list)
        } else {
          this.$$message({
            message: res.message
          })
        }
      })
    },
    // 删除
    del(index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style scoped>
dl {
  line-height: 1;
}
dt {
  float: left;
}
.file-wrap {
  position: relative;
  width: 120px;
  height: 90px;
  line-height: 90px;
  text-align: center;
  background: rgba(248, 248, 248, 1);
  border: 1px solid rgba(232, 232, 232, 1);
  border-radius: 4px;
  box-sizing: border-box;
}
dt input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  opacity: 0;
  z-index: 1;
  cursor: pointer;
}
dt i {
  font-size: 30px;
  color: #c6c6c6;
}
dt p {
  margin-top: 10px;
  font-size: 12px;
  color: #aaa;
}
dd {
  float: left;
}
dd .item {
  width: 120px;
  height: 90px;
  line-height: 90px;
  float: left;
  position: relative;
  margin: 0 10px 10px 0;
  text-align: center;
  border: 1px solid rgba(232, 232, 232, 1);
  box-sizing: border-box;
}
dd .item span {
  font-size: 30px;
}
dd .item img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 4px;
}
dd .item i {
  position: absolute;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  top: -10px;
  right: -10px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}
</style>