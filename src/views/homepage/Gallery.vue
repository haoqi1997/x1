<template >
  <div>
    <!-- toubu  -->
    <div class="banner_img">
      <div class="banner_img_cephalosome"></div>
      <div class="banner_text">
        <div class="across"></div>美术馆
        <div class="alittle">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <!-- 2 -->
    <div class="Gallery_main">
      <div class="Gallery_title">
        <span>已经结束</span>
      </div>
      <div class="Gallerylist">
        <ul>
          <li v-for=" (item,index) in GalleryList" :key="index">
            <div>
              <img :src="item.src" alt />
            </div>
            <div class="Gallery_introduce">
              <p>{{item.title}}</p>
              <p>
                <span>展览时间：</span>
                {{item.aaa}}
              </p>
              <p>
                <span>主办单位：</span>
                {{item.bbb}}
              </p>
              <p>
                <span>展览场地：</span>
                {{item.ccc}}
              </p>
              <p>
                <span>开放时间：</span>
                {{item.ddd}}
              </p>
              <div class="Gallery_synopsis">
                <p style="float:left;">
                  <span>
                    简
                    <span style="float:right;">介：</span>
                  </span>
                </p>
                <p style="float:right;width:497px;
height:181px;">{{item.eee}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      GalleryList: [
        {
          src: require('../../assets/img/Gallery/ancient-architecture-asia-bench-301614.png'),
          title: '“慧日峰下——宋代僧家茶事”展',
          aaa: '2020年1月5日—4月5日',
          bbb: '杭州净慈寺美术馆',
          ccc: '杭州净慈寺美术馆（杭州市南山路56号）',
          ddd: '8:00-16:00（节假日正常开放）',
          eee:
            '“茶为国饮，杭为茶都”，茶是杭州的骄傲，更是中国的骄傲。宋代“ 荐绅之士，韦布之流，沐浴膏泽，熏陶德化，盛以雅尚相推，从事茗饮”，同时“以豪华相尚，以俭陋相訾。愈厌而好新，月异而岁殊”，这时的茶道既崇尚“雅”，由于“理学”的约束而内敛、自省，又求新斗奇，奢靡之风盛行，这点在宋代各式各样不同风格的饮茶器中表现得淋漓尽致。在这个文人巧匠能才辈出的时代，茶事艺术和制瓷工艺得以融会贯通。这还是一个承上启下的时代，不仅继承了唐人开创的茶文化，并为元明清茶文化的发展开辟了新的前景。'
        },
        {
          src: require('../../assets/img/Gallery/ancient-architecture-asia-bench-301614.png'),
          title: '“慧日峰下——宋代僧家茶事”展',
          aaa: '2020年1月5日—4月5日',
          bbb: '杭州净慈寺美术馆',
          ccc: '杭州净慈寺美术馆（杭州市南山路56号）',
          ddd: '8:00-16:00（节假日正常开放）',
          eee:
            '“茶为国饮，杭为茶都”，茶是杭州的骄傲，更是中国的骄傲。宋代“ 荐绅之士，韦布之流，沐浴膏泽，熏陶德化，盛以雅尚相推，从事茗饮”，同时“以豪华相尚，以俭陋相訾。愈厌而好新，月异而岁殊”，这时的茶道既崇尚“雅”，由于“理学”的约束而内敛、自省，又求新斗奇，奢靡之风盛行，这点在宋代各式各样不同风格的饮茶器中表现得淋漓尽致。在这个文人巧匠能才辈出的时代，茶事艺术和制瓷工艺得以融会贯通。这还是一个承上启下的时代，不仅继承了唐人开创的茶文化，并为元明清茶文化的发展开辟了新的前景。'
        }
      ]
    }
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
  background: url('../../assets/img/Gallery/building-1007425.png') no-repeat;
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