import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import uservuex from './user'
export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        uservuex
    }
})