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
          :label="item.label"
          :name="item.name"
        >
          <div style="height:62px"></div>
          <div>
            <ul>
              <router-link :to="{name:'details',query:{id:item.name}}" class="dynamicshowzhuimg">
                <li v-for="(iten,index) in item.children" :key="index">
                  <div class="dynamicimg">
                    <img :src="iten.img" alt />
                  </div>
                  <div class="dynamictext">
                    <p>{{iten.title}}</p>
                    <p>{{iten.aaa}}</p>
                    <p>{{iten.shijan}}</p>
                  </div>
                </li>
              </router-link>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      dynamicName: 'WillReport',
      dynamicList: [
        {
          label: '法会报道',
          name: 'WillReport',
          children: [
            {
              img: require('../../assets/img/dynamic/焰口002@2x.png'),
              title: '净慈寺己亥年“解行并举，福慧同修”华严法会圆满',
              aaa:
                '2019年4月25日下午，我寺己亥年“解行并举，福慧同修”华严法会功德圆满。法会期间，我寺两序大众及居士善信汇集于大雄宝殿毗卢遮那佛前，虔诚恭诵《大方广佛华严经》八十卷。',
              shijan: '2019年4月25日'
            },
            {
              img: require('../../assets/img/dynamic/焰口002@2x.png'),
              title: '净慈寺己亥年“解行并举，福慧同修”华严法会圆满',
              aaa:
                '2019年4月25日下午，我寺己亥年“解行并举，福慧同修”华严法会功德圆满。法会期间，我寺两序大众及居士善信汇集于大雄宝殿毗卢遮那佛前，虔诚恭诵《大方广佛华严经》八十卷。',
              shijan: '2019年4月25日'
            }
          ]
        },
        {
          label: '新闻资讯',
          name: 'information',
          children: [
            {
              img: require('../../assets/img/dynamic/焰口002@2x.png'),
              title: '净慈寺己亥年“解行并举，福慧同修”华严法会圆满',
              aaa:
                '2019年4月25日下午，我寺己亥年“解行并举，福慧同修”华严法会功德圆满。法会期间，我寺两序大众及居士善信汇集于大雄宝殿毗卢遮那佛前，虔诚恭诵《大方广佛华严经》八十卷。',
              shijan: '2019年4月25日'
            },
            {
              img: require('../../assets/img/dynamic/焰口002@2x.png'),
              title: '净慈寺己亥年“解行并举，福慧同修”华严法会圆满',
              aaa:
                '2019年4月25日下午，我寺己亥年“解行并举，福慧同修”华严法会功德圆满。法会期间，我寺两序大众及居士善信汇集于大雄宝殿毗卢遮那佛前，虔诚恭诵《大方广佛华严经》八十卷。',
              shijan: '2019年4月25日'
            }
          ]
        },
        {
          label: '公益慈善',
          name: 'public',
          children: [
            {
              img: require('../../assets/img/dynamic/焰口002@2x.png'),
              title: '净慈寺己亥年“解行并举，福慧同修”华严法会圆满',
              aaa:
                '2019年4月25日下午，我寺己亥年“解行并举，福慧同修”华严法会功德圆满。法会期间，我寺两序大众及居士善信汇集于大雄宝殿毗卢遮那佛前，虔诚恭诵《大方广佛华严经》八十卷。',
              shijan: '2019年4月25日'
            },
            {
              img: require('../../assets/img/dynamic/焰口002@2x.png'),
              title: '净慈寺己亥年“解行并举，福慧同修”华严法会圆满',
              aaa:
                '2019年4月25日下午，我寺己亥年“解行并举，福慧同修”华严法会功德圆满。法会期间，我寺两序大众及居士善信汇集于大雄宝殿毗卢遮那佛前，虔诚恭诵《大方广佛华严经》八十卷。',
              shijan: '2019年4月25日'
            }
          ]
        }
      ]
    }
  },
  created() {
    $(document).ready(function() {
      if (location.href.indexOf('#reloaded') == -1) {
        location.href = location.href + '#reloaded'
        location.reload()
      }
    })
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
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
.dynamicshowzhuimg > li:nth-child(1) {
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