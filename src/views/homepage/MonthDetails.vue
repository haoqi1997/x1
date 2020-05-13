<template >
  <div>
    <!-- toubu  -->
    <div class="banner_img">
      <div class="banner_img_cephalosome"></div>
      <div class="banner_text">
        <div class="across"></div>南屏指月
        <div class="alittle">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <!-- 2 -->
    <div class="tagss">
      <el-tabs v-model="MonthName" @tab-click="handleClick">
        <el-tab-pane
          v-for="item in MonthList"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        >
          <div class="qzyue">
            <p>佛说无量寿经</p>
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
      MonthName: 'Montclassics',
      MonthList: [
        {
          label: '佛学经典',
          name: 'Montclassics'
        },
        {
          label: '南屏禅话',
          name: 'Monthbuddhist'
        },
        {
          label: '佛教公案',
          name: 'Monthcomplicated'
        },
        {
          label: '诗词鉴赏',
          name: 'Monthappreciate'
        },
        {
          label: '佛经故事',
          name: 'Monthstory'
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
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  },
  components: {}
}
</script>
<style >
.banner_img {
  width: 100%;
  height: 500px;
  line-height: 500px;
  position: relative;
  background: url('../../assets/img/month/500px.png') no-repeat;
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
.help_box {
  padding-bottom: 250px;
}
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

.tagss_tags > ul {
  display: flex;
  width: 7.19%;
  height: 35.3%;
  cursor: pointer;
}
.tagss_tags > ul > li {
  padding: 10px 15px;
  border: 1px solid rgba(196, 196, 196, 1);
}
.tagss_tags > ul > li:nth-child(1) {
  border-right: none !important;
}
.tagss_tags > ul > li > img {
  width: 37px;
  height: 36px;
}
.DigitalSubscript {
  position: relative;
}
.el-pagination {
  position: absolute;
  right: 17%;
}
.el-pager li {
  font-size: 20px;
  font-weight: 400;
  color: rgba(196, 196, 196, 1);
  height: 32px !important;
}
.el-pager li.active {
  color: #000000;
  cursor: default;
  border-bottom: 3px solid #000;
}
.el-pager li:hover {
  color: #000000;
}
.qzyue {
  margin-top: 64px;
}
</style>