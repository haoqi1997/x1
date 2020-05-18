const routes = [{
        path: "/",
        redirect: '/index'
    },
    {
        path: '/index',

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
            // 二级1
            {
                path: 'ofallages',
                name: '古往今来',
                meta: {
                    title: '古往今来'
                },
                component: resolve => require(['../views/homepage/Ofallages.vue'], resolve),
            },
            {
                path: 'Square',
                name: '四方上下',
                meta: {
                    title: '四方上下'
                },
                component: resolve => require(['../views/homepage/Square.vue'], resolve),
            },
            {
                path: 'WillReport',
                name: '法会报道',
                meta: {
                    title: '法会报道'
                },
                component: resolve => require(['../views/homepage/WillReport.vue'], resolve),
            },
            {
                path: 'information',
                name: '新闻讯息',
                meta: {
                    title: '新闻讯息'
                },
                component: resolve => require(['../views/homepage/Information.vue'], resolve),
            },
            {
                path: 'public',
                name: '公益慈善',
                meta: {
                    title: '公益慈善'
                },
                component: resolve => require(['../views/homepage/Public.vue'], resolve),
            },
            // 二级2
            {
                path: 'dynamic',
                name: '净慈动态',
                meta: {
                    title: '净慈动态'
                },
                component: resolve => require(['../views/homepage/Dynamic.vue'], resolve),
            },
            {
                path: 'dynamic/details',
                name: 'details',
                meta: {
                    title: '法嗣录'
                },
                component: resolve => require(['../views/homepage/DynamicDetails.vue'], resolve),
            },
            // 
            {
                path: 'Figure',
                name: '祖师录',
                meta: {
                    title: '祖师录'
                },
                component: resolve => require(['../views/homepage/Figure.vue'], resolve),
            },
            {
                path: 'culture',
                name: '南屏妙音',
                meta: {
                    title: '南屏妙音'
                },
                component: resolve => require(['../views/homepage/Culture.vue'], resolve),
            },
            {
                path: 'Gallery',
                name: '净寺美术馆',
                meta: {
                    title: '净寺美术馆'
                },
                component: resolve => require(['../views/homepage/Gallery.vue'], resolve),
            },
            {
                path: 'Month',
                name: '南屏指月',
                meta: {
                    title: '南屏指月'
                },
                component: resolve => require(['../views/homepage/Month.vue'], resolve),
            },
            {
                path: 'MonthDetails',
                name: 'onthDetails',
                meta: {
                    title: '南屏指月'
                },
                component: resolve => require(['../views/homepage/MonthDetails.vue'], resolve),
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
            // {
            //     path: 'redact1',
            //     name: '富文本编辑',
            //     meta: {
            //         title: '富文本编辑'
            //     },
            //     component: () =>
            //         import ('../views/backstage/redact/Redact1.vue')
            // },
            {
                path: 'OfAllGes',
                name: '古往今来',
                meta: {
                    title: '古往今来'
                },
                component: () =>
                    import ('../views/backstage/redact/OfAllGes.vue')
            },
            {
                path: 'compile',
                name: '编辑',
                meta: {
                    title: '编辑'
                },
                component: () =>
                    import ('../views/backstage/redact/ofallges/Compile.vue')
            },
            // --------------------------------------------------编辑 end

        ]
    }
]

export default routes