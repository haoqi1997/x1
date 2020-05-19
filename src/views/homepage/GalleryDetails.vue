<template >
  <div>
    <!-- toubu  -->
    <div class="banner_img">
      <div class="banner_img_cephalosome"></div>
      <div class="banner_text">“慧日峰下——宋代僧家茶事”展</div>
    </div>
    <!-- 2 -->
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
  components: {}
}
</script>
<style >
.Gallery_synopsis {
  font-size: 14px;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
}
.Gallery_synopsis > p:nth-child(1) {
  width: 71px;
  height: 19px;
  font-size: 14px;
}
.Gallerylist > ul {
  margin-top: 2.78%;
  display: flex;
  justify-content: space-between;
}
.Gallerylist > ul > li {
  width: 45%;
}
.Gallerylist > ul > li > div {
  width: 573px;
  height: 349px;
}

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
.across {
  position: absolute;
  top: 30%;
  width: 52px;
  height: 0px;
  border-bottom: 3px solid #fff;
}

.Gallery_main {
  width: 63.1%;

  margin: 3.29% auto;
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
.Gallery_introduce {
  padding-top: 3.526%;
}
.Gallery_introduce > p {
  font-size: 14px;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
  opacity: 1;
  padding-bottom: 12px;
}
.Gallery_introduce > p > span {
  display: inline-block;
  width: 71px;
  height: 19px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
}
.Gallery_introduce > p:nth-child(1) {
  height: 47px;
  font-size: 20px;
  font-family: GenRyuMin TW TTF;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
</style>