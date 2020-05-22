<template>
  <div class="home">
    <div class="header" v-if="path!='/index'" style="background:rgb(0,0,0);
opacity:0.3;">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="rgba(255,255,255,0)"
        text-color="#808080"
        active-text-color="rgb(255,255,255)"
        style="float: right;right: 10%"
        router
      >
        <el-submenu
          :index="item.frontUrl"
          v-for="item in taglist"
          :key="item.frontUrl"
          @click="eClose(item)"
          v-if="item.childList&&item.functionUrl!='dynamic'"
        >
          <template slot="title">{{item.name}}</template>
          <el-menu-item
            :index="items.frontUrl"
            v-for="items in item.childList"
            :key="items.frontUrl"
            @click="eClose(items)"
          >{{items.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.frontUrl" @click="eClose(item)" v-else>{{item.name}}</el-menu-item>
      </el-menu>
    </div>
    <el-container>
      <el-main>
        <button @click="login">后台</button>
        <div v-if="path=='/index'" style="position: relative;">
          <div class="header">
            <el-menu
              :default-active="activeIndex1"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="rgba(255,255,255,0)"
              text-color="#808080"
              active-text-color="rgb(255,255,255)"
              style="float: right;right: 10%"
              router
            >
              <el-submenu
                :index="item.frontUrl"
                v-for="item in taglist"
                @click="eClose(item)"
                :key="item.frontUrl"
                v-if="item.childList&&item.functionUrl!='dynamic'"
              >
                <template slot="title">{{item.name}}</template>
                <el-menu-item
                  :index="items.frontUrl"
                  v-for="items in item.childList"
                  @click="eClose(items)"
                  :key="items.frontUrl"
                >{{items.name}}</el-menu-item>
              </el-submenu>
              <el-menu-item :index="item.frontUrl" @click="eClose(item)" v-else>{{item.name}}</el-menu-item>
            </el-menu>
          </div>
          <!-- 轮播 -->
          <el-carousel indicator-position="outside" height="1080px" arrow="always" :interval="5000">
            <el-carousel-item v-for="item in bannerImg" :key="item.src">
              <img style="width:100%" :src="item.src" alt="轮播" />
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="mian_content">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      activeIndex2: this.$route.path,
      activeIndex1: '/index', //默认高亮
      title: this.$route.meta.title,
      path: this.$route.path,
      bannerImg: [
        { src: require('../../assets/img/home/1.jpg') },
        { src: require('../../assets/img/home/2.jpg') },
        { src: require('../../assets/img/home/3.jpg') }
      ],
      taglist: [
        //     {
        //       path: '/index',
        //       name: '首页'
        //     },
        //     {
        //       path: '/index/regards',
        //       name: '关于净慈',
        //       children: [
        //         {
        //           path: '/index/OfAllGes',
        //           name: '古往今来'
        //         }
        //       ]
        //     },
        //     {
        //       path: '/index/dynamic',
        //       name: '净慈动态'
        //     },
        //     {
        //       path: '/index/figure',
        //       name: '净慈人物'
        //     },
        //     {
        //       path: '/index/culture',
        //       name: '净慈文化',
        //       children: [
        //         {
        //           path: '/index/culture',
        //           name: '南屏妙音'
        //         },
        //         {
        //           path: '/index/Gallery',
        //           name: '净寺美术馆'
        //         },
        //         {
        //           path: '/index/Month',
        //           name: '南屏指月'
        //         }
        //       ]
        //     },
        //     {
        //       path: '/index/law',
        //       name: '净慈法务'
        //     },
        //     {
        //       path: '/index/help',
        //       name: '助建净慈'
        //     },
        //     {
        //       path: '/index/volunteer',
        //       name: '净慈义工'
        //     },
        //     {
        //       path: '/index/contactUS',
        //       name: '联系我们'
        //     }
      ]
    }
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    $route(to, from) {
      this.title = to.meta.title
      this.path = to.path
    }
  },
  created() {
    this.getlist()
  },
  mounted() {},
  methods: {
    //登录
    login() {
      this.$router.push({ path: '/backstage/login' })
    },
    //标签变换时触发
    handleSelect(key, keyPath) {
      console.log('handleSelect -> key, keyPath', key, keyPath)
      this.activeIndex2 = key || '/index' //默认高亮
    },
    getlist() {
      this.$public.noAuthController.resourceIndex().then(res => {
        if (res.code == '000000') {
          this.taglist = res.data
        }
      })
    },
    eClose(data) {
      console.log('eClose -> key', data)
      localStorage.setItem('taglis', JSON.stringify(data))
      //   this.$public.resource.QueryMenuButton(this.username, key).then(res => {
      //     if (res.code == '000000') {
      //       localStorage.setItem('buttonList', JSON.stringify(res.data))
      //     }
      //   })
    }
  },
  components: {}
}
</script>
<style >
/* 首页 */
.el-header,
.el-footer {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 85px;
}

.el-container {
  height: 100%;
}

.el-button.is-plain {
  background: #fff;
  border-color: #f79623;
  color: #f79623;
}

.el-button.is-plain:focus,
.el-button.is-plain:hover {
  background: #fff;
  border-color: #f79623;
  color: #f79623;
}

.el-main {
  padding: 0;
  color: #333;
  border-top: 1px solid #e9eef3;
}
.el-menu--horizontal > .el-menu-item {
  height: 85px;
  line-height: 85px;
}
.header {
  height: 85px;
  padding: 0;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100vw;
  position: absolute;

  z-index: 99;
  /* background-color: #73cbd8; */
}
.header > ul > li:hover {
  background-color: rgba(255, 255, 255, 0) !important;
  color: #ffffff !important;
}
.header > ul > li > div:hover {
  background-color: rgba(255, 255, 255, 0) !important;
  color: #ffffff !important;
}
.el-menu--horizontal > ul > li:hover {
  background-color: rgba(255, 255, 255, 0) !important;
  color: #ffffff !important;
}
.el-menu--horizontal > ul > li > div:hover {
  background-color: rgba(255, 255, 255, 0) !important;
  color: #ffffff !important;
}
.el-menu--popup {
  border: none;
  padding: 5px 0;
  border-radius: 0px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0);
}
.el-menu-demo > .el-menu-item {
  margin: 0 11.5px !important;
}
.el-submenu__title {
  padding: 0 11.5px !important;
}

.el-menu--popup {
  box-shadow: 0;
}

.tab_top {
  float: right;
  width: 50%;
  display: flex;
}
.tab_top > li {
  width: 11%;
}
.tab_top > li > a {
  color: #fff;
}
.el-menu--horizontal > .el-menu-item.is-active {
  /* border: none; */
  height: 55px;
}
.el-menu-item {
  transition: none !important;
  height: 100%;
  padding: 0;
  margin: 0 20px !important;
}
.el-menu.el-menu--horizontal {
  border: none;
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 85px;
  line-height: 85px;
}
/* banner 0*/

/*白色遮罩 */
.white_baneer {
  width: 100%;
  height: 1080px;
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.mian_content {
  margin: 0 auto;
}
.el-carousel__container {
  position: relative;
  height: 500px;
}
.el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
  display: none;
}
.el-carousel__indicators--outside {
  display: none;
}
.el-carousel__arrow {
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  height: 30px;
  width: 51px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 0 !important;
  background-color: rgba(31, 45, 61, 0.11);
  color: #fff;
  position: absolute;
  top: 996px;
  right: 120px;
  transform: translateY(-50%);
  text-align: center;
  font-size: 12px;
  z-index: 100;
}
.el-carousel__arrow--left {
  background: url('../../assets/img/home/baner_left.png') no-repeat;
  background-size: 25px;
}
.el-carousel__arrow--right {
  background: url('../../assets/img/home/baner_right.png') no-repeat;
  background-size: 25px;
}
.el-carousel__arrow > i {
  display: none;
}
.el-carousel__arrow:hover {
  background-color: rgba(31, 45, 61, 0);
}
/* 文字 */
.home_title {
  width: 150px;
  height: 58px;
  font-size: 50px;
  font-family: 'GenRyuMin TW TTF';
  font-weight: bold;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 55px;
  line-height: 85px;
}
</style>

   
