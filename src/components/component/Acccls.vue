<template >
  <div style="padding: 0 6px;">
    <el-menu
      :default-active="onRoutes"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#1a1a1a"
      text-color="#ffffff"
      active-text-color="#ffffff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.childList">
          <el-submenu :index="item.functionUrl" :key="item.id">
            <template slot="title">
              <i>
                <span style="display: inline-block;width: 28px;height: 28px;margin-right: 10px;">
                  <img src="../../assets/img/后台/动态.png" alt />
                </span>
              </i>
              <!-- 二级1 -->
              <span slot="title">{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.childList">
              <el-submenu v-if="subItem.childList" :index="subItem.functionUrl" :key="subItem.id">
                <template slot="title">{{ subItem.name }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.childList"
                  :key="i"
                  :index="threeItem.functionUrl"
                >{{ threeItem.name }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                @click="eClose(subItem.id,subItem)"
                :index="subItem.functionUrl"
                :key="subItem.id"
              >
                <svg
                  t="1590481961902"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5654"
                  width="200"
                  height="200"
                >
                  <path
                    d="M512.00337692 223.62507194c-39.07811828 0-76.40824868 7.54812851-112.02349786 22.7966725-35.61524846 15.24854397-66.28448731 35.85361048-92.03419966 61.53711098-25.75633368 25.82254479-46.28194643 56.45205638-61.51062641 92.02757833-15.26178662 35.70794488-22.88274757 72.93213694-22.88274757 112.07646705 0 39.01190645 7.62096168 76.36852217 22.88274757 111.94404411 15.22868071 35.71456621 35.75429346 66.3440778 61.51062641 92.1666226 25.74971235 25.69012185 56.41895047 46.14952278 92.03419966 61.53049039a284.03475437 284.03475437 0 0 0 112.02349786 22.80329382c39.06487635 0 76.39500676-7.69379412 112.01025522-22.80329382 35.61524846-15.38096763 66.28448731-35.84698987 92.03419965-61.5304904 25.75633368-25.82254479 46.28194643-56.45205638 61.51062642-92.16662258 15.28827122-35.57552195 22.88274757-72.93213694 22.88274758-111.94404412 0-39.1443301-7.5944771-76.36852217-22.88274758-112.07646704-15.22868071-35.57552195-35.75429346-66.21165414-61.51062642-92.03419894-25.74971235-25.67687918-56.41895047-46.28194643-92.03419965-61.53049038C588.39838368 231.17982179 551.06163194 223.62507194 511.99675559 223.62507194m0-82.41364616c50.20167629 0 98.25809517 9.75297643 144.02359033 29.39797427 45.79860107 19.63837652 85.22764104 46.0104785 118.27387798 79.10968462 33.07272152 32.96678243 59.41833818 72.38920181 79.03023011 118.2606353 19.61851326 45.73901058 29.43770153 93.81529271 29.45094418 143.94413656 0.03972724 50.27450871-9.81918826 98.35079085-29.45094418 144.08980216-19.62513458 45.87143423-45.97075126 85.29385288-79.03023011 118.254014-33.03299426 33.10582743-72.43554966 59.47792868-118.27387797 79.12292725C610.19526027 872.88993219 562.19181056 882.78195289 512.00337692 882.78195289c-50.18843363 0-98.19188333-9.89202143-144.02359031-29.39797427-45.85157025-19.63837652-85.26736828-46.0104785-118.28712063-79.1096846C216.62656579 741.30751156 190.28757045 701.8850922 170.66243587 656.00703736 151.03068066 610.27464813 141.17176516 562.19836599 141.21149168 511.93047787c0.01324266-50.13546446 9.83243092-98.21174661 29.45094419-143.94413656 19.61189194-45.88467617 45.950888-85.3004742 79.03023011-118.26725664 33.0396156-33.10582743 72.47527689-59.47130809 118.28712063-79.11630594C413.73866043 150.96440221 461.78845799 141.21142578 511.99675559 141.21142578"
                    p-id="5655"
                    fill="#e6e6e6"
                  />
                </svg>
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.functionUrl" :key="item.id">
            <i :class="item.iconClass"></i>
            <span style="display: inline-block;width: 28px;height: 28px;margin-right: 10px;">
              <img src="../../assets/img/后台/首页.png" alt />
            </span>

            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      isCollapse: false, //是否折叠
      items: [], //权限列表
      username: '' //权限列表
    }
  },
  created() {
    this.items = JSON.parse(localStorage.getItem('menuList')).menuList
    this.username = JSON.parse(localStorage.getItem('menuList')).userVo.username
  },
  mounted() {
    // this.eClose()
  },
  methods: {
    handleOpen(key, keyPath) {
      //   console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      //   console.log(key, keyPath)
      //   QueryMenuButton
    },
    eClose(key, data) {
      console.log('eClose -> key', key, data)
      localStorage.setItem('parentId', JSON.stringify(data))
      this.$public.resource.QueryMenuButton(this.username, key).then(res => {
        if (res.code == '000000') {
          localStorage.setItem('buttonList', JSON.stringify(res.data))
        }
      })
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/backstage/', '') //高亮
    }
  },
  components: {}
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /* background: #1a1a1a; */
}
.el-aside {
  text-align: initial !important;
  background: #1a1a1a;
}
.is-active {
  background-color: #e7b137 !important;
  border-radius: 13px;
}
.el-menu-item,
.el-submenu__title {
  font-size: 16px;
}
.el-menu {
  /* background-color: #282828 !important; */
}
/* .el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  min-width: 190px;
  width: 190px;
} */

.el-menu-item {
  border-radius: 13px;
}
</style>