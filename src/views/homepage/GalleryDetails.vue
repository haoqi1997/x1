<template >
  <div>
    <!-- toubu  -->
    <div class="banner_img">
      <div class="banner_img_cephalosome"></div>
      <div class="banner_text">{{this.gallerylist.title}}</div>
    </div>
    <!-- 2 -->
    <div style="height:549px;background:rgba(247,247,247,1);">
      <div style="width:64%;margin:auto;padding-top:4.21%">
        <div class="Gallery_title">
          <span>正在展出</span>
        </div>

        <div style="display:flex; position: relative;">
          <div class="zhanshi">
            <p>【展览信息】</p>
            <p>
              <span>1、展览名称：</span>
              {{this.gallerylist.title}}
            </p>
            <p>
              <span>2、主办单位：</span>
              {{this.gallerylist.sponsor}}
            </p>
            <p>
              <span>3、协办单位：</span>
              {{this.gallerylist.coSponsor}}
            </p>
            <p>
              <span>4、展 期：</span>
              {{this.gallerylist.startDate}}-{{this.gallerylist.endDate}}
            </p>
            <p>
              <span>5、展览地址：</span>
              {{this.gallerylist.address}}
            </p>
            <p>
              <span>6、美术馆开放时间：</span>
              {{this.gallerylist.openTime}}
            </p>
          </div>
          <div style="width:585px;
height:261px; position: absolute;top:2px;right:2px">
            <img src="../../assets/img/Gallery/building-1007425@2x.png" alt />
          </div>
        </div>
      </div>
    </div>
    <div style="width:64%;margin:auto;padding-top:4.21%">
      <div v-html="this.gallerylist.detailHtml"></div>
    </div>
    <div style="height:100px"></div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      id: this.$route.query.id,
      gallerylist: []
    }
  },
  created() {},
  mounted() {
    console.log('data -> id', this.id)
    this.getlist()
  },
  methods: {
    getlist() {
      this.$public.noAuthController.exhibition(this.id).then(res => {
        console.log('getlist -> res', res)
        if (res.code == '000000') {
          this.gallerylist = res.data
        }
      })
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
  background: url('../../assets/img/Gallery/building-1007425@2x.png') no-repeat;
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
.Gallery_title {
  width: 80px;
  background: rgba(0, 0, 0, 1);
  text-align: end;
  padding: 29px 8px 5px 94px;
}
.Gallery_title > span {
  font-size: 20px;
  font-family: GenRyuMin TW TTF;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.zhanshi > p {
  margin-top: 7%;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
}
</style>