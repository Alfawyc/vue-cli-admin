export const permission = [
    {
        id : 1,
        title : '首页',
        icon : 'icondashboard',
        path : '/',
        hidden : false,
        noDropdown : true
    },
    {
        id : 2,
        title : '用户管理',
        icon : 'iconuser',
        path : '/user-manage',
        hidden : false,
        noDropdown : false,
        children : [
            {
                id : '201',
                title : '用户列表',
                path : 'user-list',
                routerType : '',
            },
            {
                id: '202',
                title: '用户分析',
                path: 'user-analysis',
                routerType: ''
            }
        ]
    },
    // {
    //     id : 3,
    //     title : 'Element UI',
    //     icon : 'iconshare',
    //     path : '/share-manage',
    //     hidden : false,
    //     noDropdown : false,
    //     children: [
    //         {
    //             id: 302,
    //             title: 'Button按钮',
    //             path: 'button',
    //             routerType: ''
    //         },
    //         {
    //             id: 304,
    //             title: 'Markdown',
    //             path: 'markdown',
    //             routerType: ''
    //         },
    //         {
    //             id: 305,
    //             title: '富文本WangEditor',
    //             path: 'wang-editor',
    //             routerType: ''
    //         }
    //     ]
    // },
    {
        id : 4,
        title : '商品管理',
        icon : 'iconinfo',
        path : '/product-manage',
        hidden : true,
        noDropdown : false,
        children: [
            {
                id: 401,
                title: '产品列表',
                path: 'sku-product',
                routerType: ''
            }
        ]
    },
    // {
    //     id : 5,
    //     title : '资金管理',
    //     icon : 'iconpay3',
    //     path : '/finance-manege',
    //     hidden : false,
    //     noDropdown : false,
    //     children: [
    //         {
    //             id : '501',
    //             title : '收入支出',
    //             path : 'income-pay',
    //             routerType : '',
    //         },
    //         {
    //             id: 502,
    //             title: '资金统计',
    //             path: 'finance-analysis',
    //             routerType: '',
    //         },
    //         {
    //             id: 503,
    //             title: '收支记录',
    //             path: 'finance-list',
    //             routerType: ''
    //         }
    //     ]
    // },
    // {
    //     id : 6,
    //     title : '资金数据',
    //     icon : 'iconecharts',
    //     path : '/finance-data',
    //     hidden : false,
    //     noDropdown : true
    // },
    {
        id : 7,
        title : '系统设置',
        icon : 'iconpermission',
        path : '/system-list',
        hidden : false,
        noDropdown : false,
        children: [
            {
                id: 701,
                title: '角色权限',
                path: 'role-auth',
                routerType: '',
            },
            {
                id: 702,
                title: "api管理",
                path: "api-list",
                routerType: '',
            }
        ]
    },
    {
        id : 8,
        title : '错误页面',
        icon : 'iconError',
        path : '/error-page',
        hidden : false,
        noDropdown : false,
        children : [
            {
                id : '81',
                title : '401',
                path : 'error-one',
                routerType : '',
            },
            {
                id : '82',
                title : '404',
                path : 'error-four',
                routerType : '',
            }
        ]
    },
    {
        id: 9,
        title: 'Go Blog',
        icon : 'iconecharts',
        path : '/cate',
        hidden : true,
        noDropdown : false,
        children : [
            {
                id : '901',
                title : '分类列表',
                path : 'cate-list',
                routerType : '',
            },
            {
                id: '902',
                title: '标签列表',
                path: 'tag-list',
                routerType: ''
            },
            {
                id: '903',
                title: '文章列表',
                path: 'post-list',
                routerType: ''
            }
        ]
    },
    {
        id: 10,
        title: '任务管理',
        icon:'iconfufei0',
        path:'/task',
        hidden: false,
        noDropdown: false,
        children: [
            {
                id: '1001',
                title: '任务列表',
                path: 'task-list',
                routerType: ''
            },
            {
                id:'1002',
                title: '任务日志',
                path: 'task-log',
                routerType: ''
            }
        ]
    }
];
