<template>
  <div class="login">
    <div class="inp_box">
      <div class="login_mian">
        <el-form :model="from" :rules="rules" ref="from" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="from.username" @keyup.enter.native="submitForm('from')"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="from.password"
              @keyup.enter.native="submitForm('from')"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="validCode">
            <el-input v-model="from.validCode" @keyup.enter.native="submitForm('from')"></el-input>
            <img style="width='100%;" :src="codeimg" @click="key()" alt="验证码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('from')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import utils from 'utils'
export default {
  name: 'login',
  data() {
    return {
      labelPosition: 'left',
      //

      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        validCode: [
          {
            required: true,
            message: '验证码',
            trigger: 'blur'
          }
        ]
      },
      loadingout: '',
      from: {
        key: '',
        username: '',
        password: '',
        validCode: ''
        //验证码
      },
      codeimg: '' //验证码
    }
  },
  created() {
    this.key()
  },
  mounted() {},
  methods: {
    key() {
      this.$public.system().then(res => {
        if (res.code == '000000') {
          this.from.key = res.data
          this.gaincode() //验证码
        }
      })
    },
    // ================================================
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.openFullScreen() //
          this.$store.dispatch('login', this.from).then(
            result => {
              this.$message({
                type: 'success',
                message: '登录成功'
              })
              this.$router.push({
                path: '/backstage/index'
              })
              this.loadingout.close()
            },
            err => {
              this.key()
              this.loadingout.close()
              this.$$message({
                message: err,
                type: 'warning'
              })
            }
          )
          //登录
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    // ================================================

    //获取验证码
    gaincode() {
      //   this.$public.getcode().then(res => {
      //     console.log('gaincode -> res', res)
      //   })
      this.codeimg = `${window.apiBase}/system/${this.from.key}` //缓存+${new Date().getTime()}
    },
    //提示成功
    openSuccess(val) {
      this.$message({
        message: `${val}`,
        type: 'success'
      })
    },
    //提示错误
    openError(val) {
      this.$message.error(`${val}`)
    },
    //服务遮罩
    openFullScreen() {
      this.loadingout = this.$loading({
        lock: true,
        text: 'Loading...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
  },
  components: {}
}
</script>
<style >
.codeimg {
  display: flex;
}
.el-form-item__content {
  display: flex;
}
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  content: '';
  margin-right: 0px;
}
</style>


