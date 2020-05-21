<template >
  <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"> -->
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
      <div class="Gallery_title" v-show="this.GalleryList.length>=0">
        <span>正在展出</span>
      </div>

      <div style="position: absolute;
    right:70px;
    top: 0px;">
        <div>
          <el-row :gutter="1">
            <el-col :span="15">
              <el-date-picker
                v-model="Dateshijian"
                type="daterange"
                align="right"
                unlink-panels
                @blur="getlist"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="9">
              <el-input placeholder="请输入标题" clearable @clear="getlist" v-model="data.title">
                <el-button slot="append" icon="el-icon-search" @click="getlist"></el-button>
              </el-input>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="Gallerylist">
        <ul>
          <li v-for=" (item,index) in GalleryList" :key="index" @click="RoutePath(item.id)">
            <div>
              <img :src="item.picture" alt="活动照片" />
            </div>
            <div class="Gallery_introduce">
              <p>{{item.title}}</p>
              <p>
                <span>展览时间：</span>
                {{item.openTime}}
              </p>
              <p>
                <span>主办单位：</span>
                {{item.sponsor}}
              </p>
              <p>
                <span>展览场地：</span>
                {{item.address}}
              </p>
              <p>
                <span>开放时间：</span>
                {{item.startDate}}-{{item.endDate}}
              </p>
              <div class="Gallery_synopsis">
                <p style="float:left;">
                  <span>
                    简
                    <span style="float:right;">介：</span>
                  </span>
                </p>
                <div class="jianjie">{{item.synopsis}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 2 -->
    <div class="Gallery_main">
      <div class="Gallery_title">
        <span>已经结束</span>
      </div>
      <div class="Gallerylist">
        <ul>
          <li v-for=" (item,index) in GalleryList" :key="index" @click="RoutePath(item.id)">
            <div>
              <img :src="item.picture" alt />
            </div>
            <div class="Gallery_introduce">
              <p>{{item.title}}</p>
              <p>
                <span>展览时间：</span>
                {{item.openTime}}
              </p>
              <p>
                <span>主办单位：</span>
                {{item.sponsor}}
              </p>
              <p>
                <span>展览场地：</span>
                {{item.address}}
              </p>
              <p>
                <span>开放时间：</span>
                {{item.startDate}}-{{item.endDate}}
              </p>
              <div class="Gallery_synopsis">
                <p style="float:left;">
                  <span>
                    简
                    <span style="float:right;">介：</span>
                  </span>
                </p>
                <div class="jianjie">{{item.synopsis}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- </el-backtop> -->
</template>
<script>
export default {
  name: '',
  data() {
    return {
      data: {
        current: '1',
        size: '5',
        entDate: '',
        startDate: '',
        title: ''
      },
      GalleryList: [],
      show2: false,
      Dateshijian: ''
    }
  },
  watch: {
    Dateshijian() {
      ;(this.data.entDate = this.Dateshijian[0]),
        (this.data.startDate = this.Dateshijian[1])
      // this.Dateshijian.forEach(element => {})
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
  mounted() {},
  methods: {
    RoutePath(val) {
      console.log('RoutePath -> val', val)
      this.$router.push({
        path: 'GalleryDetails',
        query: { id: val }
      })
    },
    getlist() {
      this.$public.noAuthController
        .noAuthExhibitionConditions(this.data)
        .then(res => {
          console.log('getlist -> res', res)
          if (res.code == '000000') {
            this.GalleryList = res.data.records
            console.log('getlist -> this.GalleryList', this.GalleryList)
          }
        })
    }
  },
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
  flex-wrap: wrap;
}
.Gallerylist > ul > li {
  width: 45%;
}
.Gallerylist > ul > li > div {
  /* width: 573px;
  height: 349px; */
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
  position: relative;
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
.jianjie {
  float: right;
  width: 497px;
  height: 60px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.Gallery_main > .el-button {
  background: #000;
  width: 57px;
  height: 57px;
  border-radius: 0 !important;
}
.el-button:focus,
.el-button:hover {
  border-color: #c6e2ff;
  background-color: #ecf5ff;
  color: #fff;
  background: rgb(27, 27, 27);
}
.el-input-group__append,
.el-input-group__prepend {
  background-color: #000000;
  color: #909399;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 20px;
  width: 1px;
  white-space: nowrap;
}
.el-input__inner {
  border: 1px solid #000;
}
</style>