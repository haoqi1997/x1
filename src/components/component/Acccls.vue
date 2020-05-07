<template >
  <div>
    <el-menu
      :default-active="onRoutes"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      active-text-color="#FFE793"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.childList">
          <el-submenu :index="item.functionUrl" :key="item.id">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="item.iconClass" />
              </svg>
              &nbsp;
              <span slot="title">{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.childList">
              <el-submenu v-if="subItem.childList" :index="subItem.functionUrl" :key="subItem.id">
                <template slot="title">{{ subItem.name }}111</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.childList"
                  :key="i"
                  :index="threeItem.functionUrl"
                >
                  <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.iconClass" />
                  </svg>
                  &nbsp;
                  {{ threeItem.name }}222
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                @click="eClose(subItem.id)"
                :index="subItem.functionUrl"
                :key="subItem.id"
              >{{ subItem.name }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.functionUrl"
            :key="item.id"
            :class="{tophome:item.name === '系统管理'}"
          >
            <i :class="item.iconClass"></i>
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.iconClass" />
            </svg>
            &nbsp;
            <span slot="title">{{ item.name }}333</span>
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
    eClose(key) {
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
  /* min-height: 100vh; */
}
</style>