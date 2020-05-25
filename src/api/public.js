import { doExec } from './request'

const apiPrefix = window.apiBase
    //登录管理
export const base = {
    //===========================登录管理===========================
    //获取id 和验证码 
    system(id, opts) {
        return doExec(`${apiPrefix}/system`, opts, null, 'get')
    },
    // //获取验证码
    getcode(key, opts) {
        return doExec(`${apiPrefix}/system/${key}`, opts, null, 'get')
    },
    //登录
    loginIn(opts) {
        return doExec(`${apiPrefix}/system`, opts, 'JSON', 'post')
    },

    //===========================用户管理===========================
    user: {
        //获取用户
        getuser(opts) {
            return doExec(`${apiPrefix}/user`, opts, null, 'get')
        },
        //新增用户
        adduser(opts) {
            return doExec(`${apiPrefix}/user`, opts, 'JSON', 'post')
        },
        // 获取用户${key}
        getkeyuser(key, opts) {
            return doExec(`${apiPrefix}/user/${key}`, opts, null, 'get')
        },
        // 修改用户${key}
        amendkeyuser(key, opts) {
            return doExec(`${apiPrefix}/user/${key}`, opts, 'JSON', 'put')
        },
        // 删除用户${key}DELETE
        deleteuser(key, opts) {
            return doExec(`${apiPrefix}/user/${key}`, opts, null, 'DELETE')
        },
        // 搜索用户
        seekuser(opts) {
            return doExec(`${apiPrefix}/user/conditions`, opts, 'JSON', 'post')
        },
    },
    //===========================角色管理===========================
    role: {
        // 新增角色
        addUserRole(opts) {
            return doExec(`${apiPrefix}/role`, opts, 'JSON', 'post')
        },
        //获取角色
        getRole(key, opts) {
            return doExec(`${apiPrefix}/role/${key}`, opts, null, 'get')
        },
        //修改角色
        alterRole(key, opts) {
            return doExec(`${apiPrefix}/role/${key}`, opts, 'JSON', 'put')
        },
        //删除角色
        deleteRole(key, opts) {
            return doExec(`${apiPrefix}/role/${key}`, opts, null, 'DELETE')
        },
        // 获取所有角色
        roleAll(opts) {
            return doExec(`${apiPrefix}/role/all`, opts, null, 'get')
        },
        // 搜索角色
        roleConditions(opts) {
            return doExec(`${apiPrefix}/role/conditions`, opts, 'JSON', 'post')
        },
        // 查询角色
        roleUser(key, opts) {
            return doExec(`${apiPrefix}/role/user/${key}`, opts, null, 'get')
        },
    },
    //===========================资源管理===========================
    resource: {
        //查询所有资源
        inquireResource(opts) {
            return doExec(`${apiPrefix}/resource`, opts, null, 'get')
        },
        //新增资源
        addResource(opts) {
            return doExec(`${apiPrefix}/resource`, opts, null, 'post')
        },
        //查询资源详情
        // inquireResource(key, opts) {
        //     return doExec(`${apiPrefix}/resource${key}`, opts, null, 'get')
        // },
        //更新资源信息
        updateResource(key, opts) {
            return doExec(`${apiPrefix}/resource${key}`, opts, null, 'put')
        },
        //删除资源
        deleteResource(key, opts) {
            return doExec(`${apiPrefix}/resource${key}`, opts, null, 'DELETE')
        },
        //条件查询资源
        conditionInquireResource(opts) {
            return doExec(`${apiPrefix}/resource/conditions`, opts, null, 'post')
        },
        //查询所有的资源，树形结构

        inquireResourceTree(opts) {
            return doExec(`${apiPrefix}/resource/tree`, opts, null, 'get')
        },
        //查询资源
        // inquireResource(opts) {
        //     return doExec(`${apiPrefix}/resource/user`, opts, null, 'get')
        // },
        // 查询菜单下按钮
        QueryMenuButton(username, parentId, opts) {
            return doExec(`${apiPrefix}/resource/user/${username}/${parentId}`, opts, null, 'get')
        },
    },
    // --------------------------关于净慈-------------------------
    InRegards: {
        //新增古往今来记录
        allbeforeorsince(opts) {
            return doExec(`${apiPrefix}/beforeorsince`, opts, "json", 'post')
        },
        //查询详情
        inquirebeforeorsincedetails(key, opts) {
            return doExec(`${apiPrefix}/beforeorsince/${key}`, opts, null, 'get')
        },
        // 条件查询
        inquirebeforeorsince(opts) {
            return doExec(`${apiPrefix}/beforeorsince/conditions`, opts, 'JSON', 'post')
        },
        //修改古往今来记录
        putbeforeorsince(key, opts) {
            return doExec(`${apiPrefix}/beforeorsince/${key}`, opts, "json", 'put')
        },
        //DELETE古往今来记录
        DELETEbeforeorsince(key, opts) {
            return doExec(`${apiPrefix}/beforeorsince/${key}`, opts, null, 'DELETE')
        },

    },
    // ------------------文件上传
    file: {
        uploadFiles(opts) {
            return doExec(`${apiPrefix}/file/uploadFiles`, opts, "JSON", 'post')
        },
        mp3(opts) {
            return doExec(`${apiPrefix}/file/mp3`, opts, "JSON", 'post')
        },
    },
    // -------------------------美术馆
    exhibitionController: {
        //新增
        addexhibition(opts) {
            return doExec(`${apiPrefix}/exhibition`, opts, "json", 'post')
        },
        //分页查询
        exhibitionConditions(opts) {
            return doExec(`${apiPrefix}/exhibition/conditions`, opts, "json", 'post')
        },
        //查询详情
        exhibitionid(key, opts) {
            return doExec(`${apiPrefix}/exhibition/${key}`, opts, null, 'get')
        },
        //更新
        putexhibitionid(key, opts) {
            return doExec(`${apiPrefix}/exhibition/${key}`, opts, "json", 'put')
        },
        //DELETE记录
        DELETEexhibition(key, opts) {
            return doExec(`${apiPrefix}/exhibition/${key}`, opts, null, 'DELETE')
        },

    },
    // ？----------------------happening-controller净慈动态
    happeningController: {

        // 新增净慈动态
        addhappening(opts) {
            return doExec(`${apiPrefix}/happening`, opts, "json", 'post')
        },
        //分页查询
        happeningConditions(opts) {
            return doExec(`${apiPrefix}/happening/conditions`, opts, "json", 'post')
        },
        //查询详情
        happeningid(key, opts) {
            return doExec(`${apiPrefix}/happening/${key}`, opts, null, 'get')
        },
        //更新-修改
        // 修改净慈动态
        puthappeningid(key, opts) {
            return doExec(`${apiPrefix}/happening/${key}`, opts, "json", 'put')
        },
        //DELETE净慈动态记录
        DELETEhappening(key, opts) {
            return doExec(`${apiPrefix}/happening/${key}`, opts, null, 'DELETE')
        },
    },
    noAuthController: {
        //    首页菜单 资源列表-展示页面菜单显示
        resourceIndex(opts) {
            return doExec(`${apiPrefix}/noAuth/resource/index`, opts, null, 'get')
        },
        //    古往今来-查询详情
        beforeOrSince(id, opts) {
            return doExec(`${apiPrefix}/noAuth/beforeOrSince/${id}`, opts, null, 'get')
        },
        //    美术馆-查询详情
        exhibition(id, opts) {
            return doExec(`${apiPrefix}/noAuth/exhibition/${id}`, opts, null, 'get')
        },
        //    净慈动态-查询详情
        happening(id, opts) {
            return doExec(`${apiPrefix}/noAuth/happening/${id}`, opts, null, 'get')
        },
        // 祖师法嗣-查询详情
        noAuth(id, opts) {
            return doExec(`${apiPrefix}/noAuth/${id}`, opts, null, 'get')
        },
        // 祖祖师法嗣-根据条件查询全部祖师或法嗣
        noAuthMasterAll(id, opts) {
            return doExec(`${apiPrefix}/noAuth/master/all/${id}`, opts, null, 'get')
        },
        // /noAuth/conditions
        // 祖师法嗣-条件查询
        noAuthConditions(opts) {
            return doExec(`${apiPrefix}/noAuth/conditions`, opts, "json", 'post')
        },
        //古往今来-条件查询
        noAuthBeforeOrSinceConditions(opts) {
            return doExec(`${apiPrefix}/noAuth/beforeOrSince/conditions`, opts, "json", 'post')
        },
        //南屏妙音-条件查询
        noAuthaudioFileConditions(opts) {
            return doExec(`${apiPrefix}/noAuth/audioFile/conditions`, opts, "json", 'post')
        },
        //美术馆-条件查询 分页
        noAuthExhibitionConditions(opts) {
            return doExec(`${apiPrefix}/noAuth/exhibition/conditions`, opts, "json", 'post')
        },
        //净慈动态-条件查询
        noAuthhappeningConditions(opts) {
            return doExec(`${apiPrefix}/noAuth/happening/conditions`, opts, "json", 'post')
        },
        //   资源列表-根据父级ID子集菜单
        noAuthresource(opts) {
            return doExec(`${apiPrefix}/noAuth/resource`, opts, "json", 'post')
        },
    },
    // --------------------------------------南屏妙音----------------------
    audioFileController: {
        // 新增南屏妙音记录
        adsdaudioFile(opts) {
            return doExec(`${apiPrefix}/audioFile`, opts, "json", 'post')
        },
        // 查询详情
        audioFileid(id, opts) {
            return doExec(`${apiPrefix}/audioFile/${id}`, opts, null, 'get')
        },
        // 修改记录
        putaudioFile(id, opts) {
            return doExec(`${apiPrefix}/audioFile/${id}`, opts, "json", 'put')
        },
        // 删除
        DELETEaudioFile(id, opts) {
            return doExec(`${apiPrefix}/audioFile/${id}`, opts, null, 'DELETE')
        },
        //         /audioFile/conditions
        // 条件查询
        //查询详情
        audioFileConditions(opts) {
            return doExec(`${apiPrefix}/audioFile/conditions`, opts, "json", 'post')
        },
    },
    // --------------------------------------祖师法嗣----------------------
    masterController: {
        // 新增
        adsmaster(opts) {
            return doExec(`${apiPrefix}/master`, opts, "json", 'post')
        },
        // 查询详情
        aumaster(id, opts) {
            return doExec(`${apiPrefix}/master/${id}`, opts, null, 'get')
        },
        // 修改记录
        putmaster(id, opts) {
            return doExec(`${apiPrefix}/master/${id}`, opts, "json", 'put')
        },
        // 删除
        DELETEmaster(id, opts) {
            return doExec(`${apiPrefix}/master/${id}`, opts, null, 'DELETE')
        },
        //         /master/conditions
        // 条件查询
        //查询详情
        masterConditions(opts) {
            return doExec(`${apiPrefix}/master/conditions`, opts, "json", 'post')
        },
    }




}