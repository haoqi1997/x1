<template >
  <div>
    <!-- toubu  -->
    <div class="banner_img">
      <div class="banner_img_cephalosome"></div>
      <div class="banner_text">
        <div class="across"></div>古往今来
        <div class="alittle">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <!-- 2 -->
    <div class="ofallages_mian">
      <div class="ofallages_title">
        <p>{{this.returnArrone.title}}</p>
        <p>——记浙江省杭州净慈寺</p>
        <div class="ql-editor" v-html="this.returnArrone.detailHtml"></div>
      </div>
      <div class="ofallages_img">
        <img :src="this.returnArrone.picture" alt />
        <p class="sanjian">
          山门全景
          <i></i>
        </p>
      </div>
    </div>
    <!-- 2 -->
    <!-- 3 -->
    <div v-for="(item,index) in list" :key="index">
      <div class="ofallages_introduce" style="margin-top: 127px;">
        <p class="p1">{{item.title}}</p>
        <p class="p2">
          <i class="xie"></i>
        </p>
        <div class="ofallages_flex">
          <div class="ofallages_text ql-editor" v-html="item.detailHtml"></div>
          <div class="ofallages_introduceimg">
            <img :src="item.picture" alt />
            <p class="sanjian">
              乾隆诗御碑亭
              <i></i>
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="ofallages_introduce ofallages_flex" style="margin-top: 127px;" v-show="index=2*n">
        <div class="ofallages_introduceimg">
          <img :src="item.picture" alt />
          <p class="sanjian">
            乾隆诗御碑亭
            <i></i>
          </p>
        </div>
        <div>
          <p class="p1">{{item.title}}</p>
          <p class="p2">
            <i class="xie"></i>
          </p>
          <div class="ofallages_flex">
            <div class="ofallages_text" v-html="item.detailHtml"></div>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      data: {
        current: '1',
        size: '5'
      },
      n: 2,
      list: [],
      returnArrone: []
    }
  },
  created() {},

  mounted() {
    this.getlist()
  },
  methods: {
    getlist() {
      this.$public.noAuthController
        .noAuthBeforeOrSinceConditions(this.data)
        .then(res => {
          if (res.code == '000000') {
            this.returnArrone = res.data.records.shift()
            this.list = res.data.records
          }
        })
    }
  },
  components: {}
}
</script>
<style>
.ofallages_mian {
  width: 41.25%;
  margin: 45px auto;
}

.ofallages_title > p:nth-child(1) {
  font-size: 25px;
  font-family: GenRyuMin TW TTF;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  margin-bottom: 13px;
}
.ofallages_title > p:nth-child(2) {
  font-size: 14px;
  font-family: GenRyuMin TW TTF;
  font-weight: 400;
  color: rgba(196, 196, 196, 1);
  text-align: center;
  text-indent: 22em;
  margin-bottom: 55px;
}
.ofallages_title > p:nth-child(3) {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 38px;
  color: rgba(0, 0, 0, 1);
  text-indent: 2em;
}
.sanjian {
  font-size: 14px;
  font-family: GenRyuMin TW TTF;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  text-align: end;
  position: relative;
  right: 20px;
  margin-top: 12px;
  margin-bottom: 172px;
}

.sanjian > i:after {
  position: absolute;
  content: '';
  right: -22px;
  top: -13px;
  width: 0;
  height: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-top: 12px solid transparent;
  border-bottom: 12px solid red;
}
/* 3 */
.xie {
  position: absolute;
  top: 2px;
  left: 5px;
  width: 19px;
  height: 19px;
  box-sizing: border-box;
  line-height: 120px;
  text-indent: 5px;
  background: linear-gradient(
    45deg,
    transparent 49.5%,
    deeppink 49.5%,
    deeppink 50.5%,
    transparent 50.5%
  );
}
.ofallages_introduce {
  width: 63.3%;
  margin: auto;
}
.p1 {
  font-size: 20px;
  font-family: GenRyuMin TW TTF;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
}
.p2 {
  width: 19px;
  height: 19px;
  position: relative;
}
.ofallages_introduceimg {
  width: 390px;
  height: 300px;
}
.ofallages_flex {
  display: flex;
  justify-content: space-between;
}
.ofallages_text {
  width: 794px;
  text-indent: 2em;
  width: 794px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 38px;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
/*  */
.banner_img {
  width: 100%;
  height: 500px;
  line-height: 500px;
  position: relative;
  background: url('../../assets/img/ofallages/building-1007425@2x.png')
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
</style>