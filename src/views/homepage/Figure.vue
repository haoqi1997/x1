<template >
  <div>
    <!-- toubu  -->
    <div class="banner_img">
      <div class="banner_img_cephalosome"></div>
      <div class="banner_text">
        <div class="across"></div>祖师法嗣
        <div class="alittle">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <!-- 2 -->
    <div class="figure_main">
      <div class="figure_box">
        <div class="figure_img">
          <img :src="this.onelist.picture" alt />
        </div>
        <div class="figure_text">
          <p>{{this.onelist.name}}</p>
          <div class="ql-editor" v-html="this.onelist.detailHtml"></div>
        </div>
      </div>
      <div class="figure_boss">
        <p>住持</p>
        <span
          style="    width: 18px;
    height: 18px;
    color: rgb(198, 35, 38);
    opacity: 1;"
        >\</span>
        <div class="niandai">
          <p v-for=" item in zclists" :key="item.id">
            <span v-if="item.generationNum==0">{{item.generation}}</span>
            <span v-else>第{{item.generation}}代</span>
            <i style="display: inline-block;width:18px"></i>
            <span>{{item.name}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="figure_boss">
      <p>法嗣</p>
      <span
        style="    width: 18px;
    height: 18px;
    color: rgb(198, 35, 38);
    opacity: 1;"
      >\</span>
      <div class="niandai">
        <p v-for=" item in stlists" :key="item.id">
          <span>第{{item.generation}}代</span>
          <i style="display: inline-block;width:18px"></i>
          <span>{{item.name}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      onelist: [],
      Figurelist: [],
      zclists: [],
      stlists: [],
      index: '',
      data: {
        current: 1,
        size: 10
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
    // this.getlist()
    this.zclist()
    this.stlist()
  },
  mounted() {},
  methods: {
    // getlist() {
    //   this.$public.noAuthController.noAuthConditions(this.data).then(res => {
    //     console.log('handleDelete -> res', res)
    //     if (res.code == '000000') {
    //       this.Figurelist = res.data.records
    //       this.Figurelist.forEach((item, index) => {
    //         if (item.generationNum == -1) {
    //           this.onelist = item
    //           this.index = index
    //           this.Figurelist.splice(index, 1)
    //         }
    //       })
    //     }
    //   })
    // }
    zclist() {
      this.$public.noAuthController.noAuthMasterAll(1).then(res => {
        console.log('zclist -> res', res)
        if (res.code == '000000') {
          this.onelist = res.data[0]
          this.Figurelist = res.data.shift()
          this.zclists = res.data

          console.log('zclist -> this.onelist', this.onelist)
        }
      })
    },
    stlist() {
      this.$public.noAuthController.noAuthMasterAll(0).then(res => {
        console.log('stlist -> res', res)

        if (res.code == '000000') {
          this.stlists = res.data
        }
      })
    }
  },
  components: {}
}
</script>
<style >
.figure_boss {
  width: 58%;
  margin: 0 auto;
  margin-top: 61px;
}
.figure_boss > p {
  width: 40px;
  height: 23px;
  font-size: 20px;
  font-family: GenRyuMin TW TTF;
  font-weight: bold;
  line-height: 38px;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
.figure_main {
  height: 1545px;
}
.figure_box {
  padding-top: 68px;
  width: 100%;
  height: 962px;
  background: rgba(247, 247, 247, 1);
  display: flex;
  justify-content: center;
}
.figure_img {
  position: relative;
  top: 230px;
  margin-right: 135px;
  width: 410px;
  height: 503px;
}
.figure_text {
  width: 50.52%;
}
.figure_text > p {
  font-size: 24px;
  font-family: GenRyuMin TW TTF;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
.figure_text > div {
  width: 100%;
  /* height: 762px; */
  margin-top: 46px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 38px;
  color: rgba(0, 0, 0, 1);
}
/*  */
.banner_img {
  width: 100%;
  height: 500px;
  /* margin-top: 84px; */
  line-height: 500px;
  /* background-color: #f79623; */
  position: relative;
  background: url('../../assets/img/figure/building-1007425@2x.png') no-repeat;
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
.niandai {
  width: 390px;
  margin-top: 45px;
  font-size: 14px;
  font-weight: 400;
  line-height: 38px;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
</style>