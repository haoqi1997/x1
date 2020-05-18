import * as login from '../api/public'
import * as request from '@/api/request'
import axios from 'axios';
import {
    dateFormat,
    joinImgPrefix,
    transFileUrl,
    passPortValid
} from '../filter/filter'

// import module from 'module'
import Vue from 'vue'
const ServerMixin = {
    Event: new Vue()
}
ServerMixin.install = function(v, opt) {
    //登录
    v.prototype.$public = login.base
        // 异步封装
    v.prototype.$request = request

    Vue.prototype.$axios = axios;
    // 日期格式化
    v.prototype.$dateFormat = dateFormat
        // 图片前缀
    v.prototype.$joinImgPrefix = joinImgPrefix
        // string类型的图片转list
    v.prototype.$transFileUrl = transFileUrl
        // 证件号码验证str 需要验证的字符串 typeCode 为字典表中的编码
    v.prototype.$passPortValid = passPortValid

    v.prototype.$$message = (options) => {
        let opts = {
            showClass: true,
            type: 'warning'
        }
        return v.prototype.$message({...opts, ...options })
    }

    v.prototype.$$notify = (options) => {
        let opts = {
            title: '提示',
            type: 'success'
        }
        return v.prototype.$notify({...opts, ...options })
    }

    v.prototype.$$confirm = (options) => {
        let opts = {
            title: '提示',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
        let o = {...opts, ...options }
        return v.prototype.$confirm(o.message, o.title, o)
    }

    v.prototype.$$alert = (options) => {
        let opts = {
            title: '提示',
            confirmButtonText: '确定'
        }
        let o = {...opts, ...options }
        return v.prototype.$alert(o.message, o.title, o)
    }

    v.prototype.$updateArray = (arr, fieldName, fieldValue, newRow) => {
            // 先查找是否有同样的主键（key），如果有，说明是修改。这里主键暂时不支持复合主键
            for (let i in arr) {
                if (arr[i][fieldName] == fieldValue) {
                    for (let j in arr[i]) {
                        v.prototype.$set(arr[i], j, newRow[j])
                    }
                    break
                }
            }
        }
        //二维码
    v.prototype.$QRCodeSC = (url) => {
        var qrcode = new QRCode('qrcode', { // qrcode  html为标签id
            width: 120, // 长度
            height: 120, // 宽度
            text: url // 内容
                // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas)
                // background: '#f0f'
                // foreground: '#ff0'
        })
        return qrcode
    }

    v.prototype.$checkPhone = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('手机号不能为空'));
        } else {
            const isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/; //手机号码
            const isMob = /^0?1[3|4|5|8][0-9]\d{8}$/; // 座机格式  区号之后用'-'隔开
            if (isMob.test(value) || isPhone.test(value)) {
                callback();
            } else {
                return callback(new Error('请输入正确的手机号'));
            }
        }
    }
}

export default ServerMixin