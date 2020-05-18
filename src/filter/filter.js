import utils from '@/utils/'
/**
 * Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
 * Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 (new
 * Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 (new
 * Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 (new
 * Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
export const dateFormat = (date, format = 'yyyy/MM/dd') => {
    if (!date) {
        return '-'
    }
    try {
        date = date.replace(/t/gi, ' ').replace(/-/gi, '/')
    } catch (e) {
        // 
    }
    let d = new Date(date)

    let o = {
        'M+': d.getMonth() + 1,
        // 月份
        'd+': d.getDate(),
        // 日
        'h+': d.getHours() % 12 == 0 ? 12 : d.getHours() % 12,
        // 小时
        'H+': d.getHours(),
        // 小时
        'm+': d.getMinutes(),
        // 分
        's+': d.getSeconds(),
        // 秒
        'q+': Math.floor((d.getMonth() + 3) / 3),
        // 季度
        'S': d.getMilliseconds()
            // 毫秒
    }
    let week = {
        '0': '\u65e5',
        '1': '\u4e00',
        '2': '\u4e8c',
        '3': '\u4e09',
        '4': '\u56db',
        '5': '\u4e94',
        '6': '\u516d'
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + '')
            .substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(format)) {
        format = format.replace(
            RegExp.$1,
            ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' :
                    '/u5468') :
                '') + week[d.getDay() + ''])
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
                (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return format
}

// 配置图片前缀
export const joinImgPrefix = (val) => {
    if (!val) {
        return val
    }
    return window.imgPreSrc + val
}
export function getItemName(value, arr, key, prop) {
    // value 值
    // arr 查询的数组
    // 查找数组中哪一项的key的值等于value
    // 返回这一项的prop的值
    if (!!value && !!arr && arr.length) {
        const item = arr.find(item => {
            return item[key] == value
        })
        return item[prop];
    }
}
//String转Number

export function getNumberArray(arr) {
    let newArr = []
    arr.map((v) => {
        newArr.push(Number(v))
    })
    return newArr
}

// string类型的图片转list  single  tree时返回单个json
export function transFileUrl(str, single) {
    let data = []
    if (utils.isNotEmpty(str)) {
        if (str instanceof Array) {
            data = str
        } else {

            try {
                const file = JSON.parse(str)
                if (file instanceof Array) {
                    data = file.filter(v => {
                        return !!v.url
                    })
                } else {
                    data = [{
                        url: file.fileUrl || file.url,
                        name: file.fileName || file.name
                    }]
                }
            } catch (e) {
                str.split(',').forEach(v => {
                    data.push({
                        url: v
                    })
                })
            }
        }
    }

    return !single ? data : (data[0] || {})
}

// 证件号码验证str 需要验证的字符串 typeCode 为字典表中的编码
export function passPortValid(str, typeCode) {
    console.log('输入的值', str)
    switch (typeCode) {
        // 身份证
        case '1003-1':
            {
                return utils.isIdCard(str)
            }
            // 军官证
        case '1003-2':
            {
                return /^[a-zA-Z0-9]{7,21}$/.test(str)
            }
            // 学生证
        case '1003-3':
            {
                return /^[a-zA-Z0-9]{6,18}$/.test(str)
            }
            // 驾驶证
        case '1003-4':
            {
                return utils.isIdCard(str)
            }
            // 护照
        case '1003-5':
            {
                return /^[a-zA-Z0-9]{3,21}$/.test(str)
            }
            // 港澳通行证
        case '1003-6':
            {
                return /^[a-zA-Z0-9]{5,21}$/.test(str)
            }
        default:
            {
                return false
            }
    }
}