<template>
  <div style="line-height: 1;">
    <script id="editor" type="text/plain"></script>111
  </div>
</template>
<script>
export default {
  name: 'UE',
  data() {
    return {
      editor: null
    }
  },
  methods: {
    load(callback) {
      this.editor = UE.getEditor('editor') // 初始化UE
      this.editor.addListener('ready', function() {
        if (typeof callback === 'function') {
          callback()
        }
      })
    },
    getContent() {
      // 获取内容方法
      return this.editor.getContent()
    },
    setContent(content) {
      this.editor.setContent(content)
    }
  },
  destroyed() {
    this.editor.destroy()
  }
}
</script>