<template >
  <div>
    <!-- 招募介绍 -->

    <div class="mian_top">
      <div>
        <b>净慈义工</b>
      </div>
      <div class="mian_bias"></div>
      <div style=" position: absolute;left: 110px;top: 50px;">565656</div>
    </div>
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
.mian_top {
  height: 50px;
  display: flex;
  position: relative;
}
.mian_bias {
  position: relative;
  width: 80px;
  top: 36px;
  left: -25px;
  box-sizing: border-box;
  /* // background-color:#333; */
  line-height: 120px;
  text-indent: 5px;
}

.mian_bias::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #000;
  transform: rotateZ(-45deg) scale(1.414);
}

/* @keyframes slash {
  0% {
    transform: rotateZ(0deg) scale(1);
  }
  30% {
    transform: rotateZ(45deg) scale(1);
  }
  60% {
    transform: rotateZ(45deg) scale(1.414);
  }
  100% {
    transform: rotateZ(45deg) scale(1.414);
  }
} */
</style>