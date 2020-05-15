<template >
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <!-- 富文本 -->
        <vue-ueditor-wrap v-model="form.content" :config="myConfig"></vue-ueditor-wrap>
        <!-- 富文本 end -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  name: '',
  data() {
    return {
      form: {
        title: '', //标题
        name: '', //作者
        content: '这是我调用vue-ueditor-wrap的案例' //富文本内容
      },
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: `${window.apiBase}/file/uploadFiles`,
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/UEditor/'
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('data -> form', this.form)
    }
  },
  created() {},
  mounted() {},

  components: {
    VueUeditorWrap
  }
}
</script>
<style>
</style>