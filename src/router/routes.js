const routes = [{
        path: "/",
        redirect: '/index'
    },
    {
        path: '/index',
        name: '首页',
        meta: {
            title: '欢迎来到净慈寺首页'
        },
        component: resolve => require(['../views/home'], resolve),
        children: [{
                path: '/',
                name: '首页',
                meta: {
                    title: '首页'
                },
                component: resolve => require(['../views/homepage'], resolve),
            },
            {
                path: 'regards',
                name: '关于净慈',
                meta: {
                    title: '关于净慈'
                },
                component: resolve => require(['../views/homepage/Regards.vue'], resolve),
            },
            {
                path: 'dynamic',
                name: '净慈动态',
                meta: {
                    title: '净慈动态'
                },
                component: resolve => require(['../views/homepage/Dynamic.vue'], resolve),
            },
            {
                path: 'figure',
                name: '净慈人物',
                meta: {
                    title: '净慈人物'
                },
                component: resolve => require(['../views/homepage/Figure.vue'], resolve),
            },
            {
                path: 'culture',
                name: '净慈文化',
                meta: {
                    title: '净慈文化'
                },
                component: resolve => require(['../views/homepage/Culture.vue'], resolve),
            },
            {
                path: 'law',
                name: '净慈法务',
                meta: {
                    title: '净慈法务'
                },
                component: resolve => require(['../views/homepage/Law.vue'], resolve),
            },
            {
                path: 'help',
                name: '助建净慈',
                meta: {
                    title: '助建净慈'
                },
                component: resolve => require(['../views/homepage/Help.vue'], resolve),
            },
            {
                path: 'volunteer',
                name: '净慈义工',
                meta: {
                    title: '净慈义工'
                },
                component: resolve => require(['../views/homepage/Volunteer.vue'], resolve),
            },
            {
                path: 'contactUS',
                name: '联系我们',
                meta: {
                    title: '联系我们'
                },
                component: resolve => require(['../views/homepage/ContactUS.vue'], resolve),
            }
        ]
    },
    {
        path: '/backstage/login',
        name: '登录',
        meta: {
            title: '净慈寺后台登录'
        },
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/backstage',
        name: '后台盒子',
        meta: {
            title: '净慈寺后台管理系统'
        },
        component: () =>
            import ('../components/layout'),
        children: [{
                path: 'index',
                name: '后台首页',
                meta: {
                    title: '后台首页'
                },
                component: () =>
                    import ('../views/backstage')
            },
            // --------------------------------------------------权限 start
            {
                path: 'Jurisdictiontube',
                name: '角色管理',
                meta: {
                    title: '角色管理'
                },
                component: () =>
                    import ('../views/backstage/jurisdiction/JurisdictionTube.vue')
            },
            {
                path: 'JurisdictionAllot',

                name: '用户管理',
                meta: {
                    title: '用户管理'
                },
                component: () =>
                    import ('../views/backstage/jurisdiction/JurisdictionAllot.vue')
            },
            // --------------------------------------------------权限 end
            // --------------------------------------------------编辑 start
            {
                path: 'redact1',
                name: '富文本编辑',
                meta: {
                    title: '富文本编辑'
                },
                component: () =>
                    import ('../views/backstage/redact/Redact1.vue')
            },
            {
                path: 'redact2',
                name: '编辑2',
                meta: {
                    title: '编辑2'
                },
                component: () =>
                    import ('../views/backstage/redact/Rable2.vue')
            },
            // --------------------------------------------------编辑 end

        ]
    }
]

export default routes