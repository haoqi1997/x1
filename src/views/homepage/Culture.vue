<template >
  <div style="padding-bottom: 2500px;">
    <!-- toubu  -->
    <div class="banner_img">
      <div class="banner_img_cephalosome"></div>
      <div class="banner_text">
        <div class="across"></div>南屏妙音
        <div class="alittle">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <!-- 2 -->
    <div class="culture_miao">
      <el-table :data="tableData" style="width: 100%" row-class-name="warning-row">
        <el-table-column prop="date" label="歌名"></el-table-column>
        <el-table-column prop="name" label="时间" width="180"></el-table-column>
        <el-table-column label="地址" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text">
              <img src="../../assets/img/culture/xiazai@2x.png" alt />
            </el-button>
            <el-button type="text">
              <img src="../../assets/img/culture/xiazai@2x.png" alt />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      tableData: [
        {
          date: '《这是另一首歌》',
          name: '时长2:55'
        }
      ]
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleClick(row) {
      console.log('handleClick -> row', row)
    }
  },
  components: {}
}
</script>
<style>
.el-table .warning-row:nth-child(2n) {
  background: #f6f6f6;
}

/*  */

.banner_img {
  width: 100%;
  height: 500px;
  /* margin-top: 84px; */
  line-height: 500px;
  /* background-color: #f79623; */
  position: relative;
  background: url('../../assets/img/culture/building-1007425.png') no-repeat;
  background-size: 100% 100%;
}
.el-table thead {
  color: #909399;
  font-weight: 500;
  display: none;
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
.culture_miao {
  width: 65.5%;
  height: 46.92%;
  margin: 3.36% auto 0;
  border: 1px solid #000;
}
.el-table td,
.el-table th {
  padding: 0.7% 1%;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
.el-button--text {
  width: 20px;
  color: #409eff;
  background: 0 0;
  padding-left: 0;
  padding-right: 0;
}
</style>