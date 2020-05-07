import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import { getUserInfo } from 'utils/auth'

//引入重置样式
import "./assets/styleshennts/reset.css"
//登录和主页样式
import 'assets/styleshennts/login.css'
//后台
import 'assets/styleshennts/backstage.css'
import 'default-passive-events'

Vue.use(ElementUI);
import ServerMixin from './mixin/serverMixin'
Vue.use(ServerMixin)
    // ？富文本
    // import VueQuillEditor from "vue-quill-editor"
    // import "quill/dist/quill.core.css"
    // import "quill/dist/quill.snow.css"
    // import "quill/dist/quill.bubble.css"
    // Vue.use(VueQuillEditor)
    // 修改滚动条
Vue.config.productionTip = false

import * as filters from './filter/filter'

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

//拦截白名单

const whiteList = '/backstage/'

router.beforeEach((to, from, next) => {
    if (to.path.indexOf(whiteList) != -1) {
        //在后台管理里面
        //是否存在token
        if (getUserInfo()) {
            //存在
            if (to.path === '/backstage/login') {
                next({
                    path: '/backstage/index'
                })
            } else {
                next()
            }
        } else {
            // 不存在token
            if ("/backstage/login".indexOf(to.path) != -1) {
                next()
            } else {

                next({
                    path: '/backstage/login'
                })
            }


        }
    } else {
        //不在后台管理里面
        next()
    }

})




new Vue({
        router, //全局注册路由
        store,
        axios,
        // vueAccordion,
        render: h => h(App),
        mounted() {
            // 解决ie中el-link跳转问题
            if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) {
                window.addEventListener('hashchange', () => {
                    var currentPath = window.location.hash.slice(1)
                    if (this.$route.path !== currentPath) {
                        this.$router.replace(currentPath)
                    }
                }, false)
            }
            ServerMixin.Event.$on('login', () => {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push({
                            path: '/backstage/login',

                        })
                    })
            })
        }

    })
    .$mount('#app')