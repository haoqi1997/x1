<template >
  <div>
    <!-- toubu  -->
    <div class="banner_img">
      <div class="banner_img_cephalosome"></div>
      <div class="banner_text">
        <div class="across"></div>净慈动态
        <div class="alittle">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <!-- 744 -->
    <div class="tagss">
      <el-tabs v-model="dynamicName" @tab-click="handleClick">
        <el-tab-pane
          v-for="item in dynamicList"
          :key="item.name"
          :id="item.code"
          :label="item.name"
          :name="item.functionUrl"
        >
          <div style="height:62px"></div>
          <div>
            <ul v-if="rouurl!='details'">
              <a class="dynamicshowzhuimg">
                <li v-for="(iten,index) in dynamicdetails" :key="index" style>
                  <router-link :to="{name:'details',query:{id:iten.id}}" style="display: flex;">
                    <div class="dynamicimg">
                      <img :src="iten.picture" alt="图片" />
                    </div>
                    <div class="dynamictext">
                      <p>{{iten.title}}</p>
                      <p>{{iten.synopsis}}</p>
                      <p>{{iten.createdTime}}</p>
                    </div>
                  </router-link>
                </li>
              </a>
              <div style="height:62px"></div>
            </ul>
            <!-- 详情展示 -->
            <router-view v-else></router-view>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  watch: {
    $route(to, from) {
      console.log('$route -> to, from', to.name)
      this.rouurl = to.name
    }
  },
  data() {
    return {
      dynamicName: 'WillReport',
      dynamicdetails: [], //细节
      rouurl: '',
      dynamicList: [],
      data: {
        current: 1,
        size: 10,
        typeCode: 'report'
      }
    }
  },
  created() {
    $(document).ready(function() {
      if (location.href.indexOf('#reloaded') == -1) {
        location.href = location.href + '#reloaded'
        location.reload()
      }
    })
    this.getlist()
  },
  mounted() {
    this.dynamicList = JSON.parse(localStorage.getItem('taglis')).childList
  },
  methods: {
    handleClick(tab) {
      if (this.rouurl == 'details') {
        this.$router.push('/index/dynamic')
      }
      console.log(tab.$attrs.id)
      this.data.typeCode = tab.$attrs.id
      this.getlist()
    },
    getlist() {
      this.$public.noAuthController
        .noAuthhappeningConditions(this.data)
        .then(res => {
          console.log('handleDelete -> res', res)
          if (res.code == '000000') {
            this.dynamicdetails = res.data.records
            console.log('getlist -> this.dynamicdetails', this.dynamicdetails)
          }
        })
    }
  },
  components: {}
}
</script>
<style >
.dynamicimg {
  width: 380px;
  height: 230px;
  margin-right: 26px;
}
.dynamicshowzhuimg > li {
  display: flex;
}
.dynamicshowzhuimg > li {
  margin-bottom: 42px;
}
.dynamictext {
  width: 794px;
}
.dynamictext > p:nth-child(1) {
  font-size: 20px;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
.dynamictext > p:nth-child(2) {
  display: inline-block;
  width: 794px;
  height: 119px;
  font-size: 14px;
  font-weight: 400;
  line-height: 38px;
  color: rgba(196, 196, 196, 1);
  opacity: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 28px 0 32px 0;
}
.dynamictext > p:nth-child(3) {
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  color: rgba(196, 196, 196, 1);
  opacity: 1;
}
/*  */
.banner_img {
  width: 100%;
  height: 500px;
  /* margin-top: 84px; */
  line-height: 500px;
  /* background-color: #f79623; */
  position: relative;
  background: url('../../assets/img/dynamic/lotus-temple-1098460@2x.png')
    no-repeat;
  background-size: 100% 100%;
}
.banner_img_cephalosome {
  position: absolute;

  width: 100%;
  height: 500px;
  background: rgba(0, 0, 0, 0.65);
}
.banner_img > .banner_text {
  position: absolute;
  /* width: 100%; */
  height: 100%;
  margin-left: 18.78%;
  z-index: 56;
  font-size: 60px;
  font-family: GenRyuMin TW TTF;
  font-weight: 400;
  line-height: 500px;
  color: rgba(255, 255, 255, 1);
}
.across {
  position: absolute;
  top: 30%;
  width: 52px;
  height: 0px;
  border-bottom: 3px solid #fff;
}
.alittle {
  position: absolute;
  top: 64.8%;
  right: 0;
  height: 10%;
  line-height: 0;
}
.alittle > span {
  display: inline-block;
  margin: 0 24px;
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 1);
  border-radius: 50%;
}
/*  */
.el-tabs__nav {
  white-space: nowrap;
  position: relative;
  transition: transform 0.3s;
  float: left;
  left: 19%;
  z-index: 2;
  height: 70px;
}
.el-tabs__content {
  overflow: hidden;
  position: relative;
  left: 19%;
  width: 65%;
}
.el-tabs__nav-wrap::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #e4e7ed;
  z-index: 1;
}
.el-tabs__nav-scroll {
  overflow: hidden;
  height: 70px;
}
.el-tabs__item {
  padding: 0 20px;
  height: 70px;
  box-sizing: border-box;
  line-height: 70px;
  display: inline-block;

  color: #303133;
  position: relative;

  font-size: 16px;
  font-family: GenRyuMin TW TTF;
  font-weight: 400;
  color: rgba(196, 196, 196, 1);
}
.el-tabs__item.is-active {
  color: #000;
}
.el-tabs__item:hover {
  color: #303133;
  cursor: pointer;
}
.el-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: #000;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  list-style: none;
}
</style>