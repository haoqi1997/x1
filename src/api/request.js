import axios from 'axios';
import qs from 'qs';
import ServerMixin from '../mixin/serverMixin'

let isLoginTip = false

import { getUserInfo } from '../utils/auth'

export const doExec = (url, params, contentType, methods) => {
    let pstr = qs.stringify(params, { arrayFormat: 'brackets' });
    return axios({
            url: (methods && methods.toUpperCase()) !== 'GET' ? url : `${url}?${pstr}`,
            params: null,
            data: (contentType && contentType.toUpperCase()) === 'JSON' ? params : qs.stringify(params),
            method: methods || 'POST',
            headers: {
                token: getUserInfo() ? getUserInfo().token : ""

            },
            beforeSend: function(xmlHttp) {
                xmlHttp.setRequestHeader("If-Modified-Since", "0");
                xmlHttp.setRequestHeader("Cache-Control", "no-cache");
            },
        })
        .then(res => {
            if (res.data.code == 4000) {
                ServerMixin.Event.$emit('login', res.data.data)
                return {}
            } else {
                return res.data
            }
        })
        .catch(res => {
            // if (res.request.status == 403 && !isLoginTip) {
            //     isLoginTip = true
            //     ServerMixin.Event.$$alert({
            //         message: '登录超时，请重新登录。',
            //         showClose: false,
            //         type: 'warning',
            //     }).then(() => {
            //         ServerMixin.Event.$emit('login', res.response.data)
            //     })
            // } else if (res.request.status == 500) {
            //     isLoginTip = true
            //     ServerMixin.Event.$$alert({
            //         message: '服务器连接超时，请稍后再试。',
            //         showClose: false,
            //         type: 'warning',
            //     }).then(() => {
            //         ServerMixin.Event.$emit('login', res.response.data)
            //     })
            // }
        })
};