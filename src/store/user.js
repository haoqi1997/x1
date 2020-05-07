import { USERSET } from './constant'

import { base } from '../api/public'


import { setUserInfo, logout } from '../utils/auth'
const uservuex = {
    state: { //状态管理 初始化变量
        userName: ''
    },
    mutations: { //修改初始化的变量
        [USERSET](state, action) {
            console.log('state', state)
            console.log('action', action)
        }
    },
    actions: { //方法名
        login({ commit }, params) {
            return new Promise((resolve, reject) => {
                base.loginIn(params).then(res => {
                    if (res.code == '000000') {
                        //账户权限存下来
                        const { data } = res
                        localStorage.setItem('menuList', JSON.stringify(data))
                        setUserInfo({
                            token: res.data.token,
                        })
                        resolve(
                            res
                        )
                    } else {
                        reject(res.mesg)
                    }

                })
            })
        },
        // 退出登录
        logout({ commit }, params) {
            logout()
            window.location.href = '/'
        },
        // 刷新vuex
        setUserInfo({ commit }) {

        }
    }
}

export default uservuex