<template>
  <div class="home">
    <el-container>
      <el-main>
        <el-header>
          <el-button plain @click.native="login">登录</el-button>
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="float: right;"
            router
          >
            <el-submenu :index="item.path" v-for="item in taglist" :key="item.path">
              <template slot="title">{{item.name}}</template>
              <el-menu-item
                :index="items.path"
                v-for="items in item.children"
                :key="items.path"
              >{{items.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-header>
        <!-- 是否首页轮播 -->
        <div class="banner_img" v-if="path!='/index'">
          <p class="banner_text">{{title}}</p>
        </div>
        <div v-else>
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in bannerImg" :key="item">
              <img style="width:100%" :src="item" alt />
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
      activeIndex2: this.$route.path, //默认高亮
      title: this.$route.meta.title,
      path: this.$route.path,
      bannerImg: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587893468647&di=349a7d02a23398e1cd9e7e75259a97a9&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181215%2Fdcf755e47be94e50bc02d8eda3f30803.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587893468646&di=42975289ea7ef511f8d611cac10e7274&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20161022%2F94d5fb1c3ac34b32817a910c81a38181_th.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587893468645&di=dd617b5471beab08208af39e8fa1c710&imgtype=0&src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2F100m0x000000ldck62667.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587893468644&di=3ab88a880f466535f01daa929b97b583&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20200312%2F6cc876cf23364bffa955394a1992d7c8.jpeg'
      ],
      taglist: [
        {
          path: '/index',
          name: '首页'
        },
        {
          path: '/index/regards',
          name: '关于净慈',
          children: [
            {
              path: '/index11',
              name: '首页1'
            },
            {
              path: '/index22',
              name: '首页3'
            },
            {
              path: '/index33',
              name: '首页2'
            }
          ]
        },
        {
          path: '/index/dynamic',
          name: '净慈动态',
          children: [
            {
              path: '/index44',
              name: '首页4'
            },
            {
              path: '/index55',
              name: '首页44'
            },
            {
              path: '/index66',
              name: '首页44'
            }
          ]
        },
        {
          path: '/index/figure',
          name: '净慈人物'
        },
        {
          path: '/index/culture',
          name: '净慈文化'
        },
        {
          path: '/index/law',
          name: '净慈法务'
        },
        {
          path: '/index/help',
          name: '助建净慈'
        },
        {
          path: '/index/volunteer',
          name: '净慈义工'
        },
        {
          path: '/index/contactUS',
          name: '联系我们'
        }
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
  created() {},
  mounted() {},
  methods: {
    //登录
    login() {
      this.$router.push({ path: '/backstage/login' })
    },
    //标签变换时触发
    handleSelect(key, keyPath) {}
  },
  components: {}
}
</script>
<style >
/* 首页 */
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
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
.el-header {
  padding: 0;
  box-sizing: border-box;
  flex-shrink: 0;
  background-color: #545c64;
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
  height: 41px;
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
/* banner 0*/
.banner_img {
  width: 100%;
  height: 300px;
  line-height: 300px;
  background-color: #f79623;
}
.banner_img > .banner_text {
  font-size: 50px;
  text-indent: 50px;
}
.mian_content {
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
.el-carousel__container {
  position: relative;
  height: 500px;
}
</style>

   
