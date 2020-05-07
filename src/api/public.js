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
}