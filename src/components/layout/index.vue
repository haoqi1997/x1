<template >
  <div class="backstage_box">
    <el-container>
      <el-aside width="201px;">
        <!-- <vue-scroll :ops="ops" style="height:100%"> -->
        <div class="logo_index" @click="goindex">logo</div>
        <Acccls></Acccls>
        <!-- </vue-scroll> -->
      </el-aside>
      <el-container>
        <el-header>
          <!-- <el-badge :value="12" class="item">
            <i class="el-icon-bell"></i>
          </el-badge>-->

          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <el-button plain @click.native="logout">退出</el-button>
        </el-header>

        <el-row>
          <el-col :span="24">
            <Tags></Tags>
          </el-col>
        </el-row>
        <el-main style="height: 100%;">
          <!-- <vue-scroll :ops="ops" style="width:100%;height:100%"> -->
          <div style="width: 98%; padding: 20px;">
            <div class="content">
              <transition name="move" mode="out-in">
                <keep-alive :include="tagsList">
                  <router-view></router-view>
                </keep-alive>
              </transition>
            </div>
          </div>
          <!-- </vue-scroll> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Acccls from '../component/Acccls'
import Tags from '../component/Tags.vue'
import bus from '../bus.js'
export default {
  name: 'backstageBox',

  data() {
    return {
      tagsList: [], //缓存表
      sessionData: []
    }
  },
  created() {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      let arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
  },
  mounted() {},
  methods: {
    //关闭菜单配置dialog前
    logout() {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出成功'
          })
          this.$store.dispatch('logout').then(() => {
            this.$router.push({
              path: '/'
            })
          })
        })
        .catch(() => {
          console.log('取消')
        })
    },
    goindex() {
      this.$router.push({
        path: '/backstage/index'
      })
    }
  },
  components: {
    Acccls,
    Tags
  }
}
</script>
<style >
.el-button--default {
  margin-right: 2%;
}
.logo_index {
  height: 60px;
  line-height: 60px;
  background-color: antiquewhite;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: end;
  line-height: 60px;
}
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  content: '*';
  color: #f56c6c;
  margin-right: 4px;
}
</style>