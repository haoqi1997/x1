<template >
  <div class="backstage_box">
    <el-container>
      <el-aside width="205px;">
        <div class="logo_index" @click="goindex"></div>
        <Acccls></Acccls>
      </el-aside>
      <el-container>
        <!-- <div class="">
          <img src="../../assets/img/后台/三条杠.png" alt />
        </div>-->
        <el-header>
          <el-row :gutter="20">
            <el-col :span="6" :offset="6">
              <div style="color: #fff;">2</div>
            </el-col>
            <el-col :span="6" :offset="6">
              <div>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <div style="line-height: 103px;">
                      <el-dropdown :hide-on-click="false">
                        <span class="el-dropdown-link">
                          <el-badge :value="2" class="item">
                            <span class="ld"></span>
                          </el-badge>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>
                            <router-link to="OfAllGes" style="color: #000000;">关于净慈模块古往今来1条消息未读</router-link>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <router-link to="WillReport" style="color: #000000;">法会报道2条消息未读</router-link>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <router-link to="Information" style="color: #000000;">讯息新闻2条消息未读</router-link>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <router-link to="Benefit" style="color: #000000;">公益慈善2条消息未读</router-link>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div>
                      <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                      ></el-avatar>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div>{{username}}</div>
                  </el-col>
                  <el-col :span="6">
                    <div>
                      <el-button size="small" plain @click.native="logout">退出</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>

          <!-- 
          -->
        </el-header>
        <div style="background-color:#fcfcfc;height: 100%;">
          <el-main style="height: 100%;padding-top: 10px;">
            <div>
              <Tags></Tags>
            </div>

            <div style="width: 97%; padding: 20px;">
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
        </div>
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
      sessionData: [],
      username: ''
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
    this.username = JSON.parse(localStorage.getItem('menuList')).userVo.name
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
  height: 75px;
  line-height: 75px;
  background: url('../../assets/img/后台/logo.png') no-repeat;
  background-size: 100% 100%;
}
.el-header,
.el-footer {
  background-color: #ffffff;
  color: #333;
  text-align: end;
  height: 75px !important;
  line-height: 75px;
}
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  content: '*';
  color: #f56c6c;
  margin-right: 4px;
}
.content {
  background-color: #fff;
  padding: 15px;
  border-radius: 17px;
  min-height: 76vh;
}
.ld {
  display: inline-block;
  width: 35px;
  height: 35px;
  background: url('../../assets/img/后台/铃铛.png') no-repeat 100% 100%;
  background-size: 100%;
}
.el-badge__content.is-fixed {
  top: 30px;
  right: 17px;
}
.el-dropdown-menu {
  top: 52px !important;
}
</style>