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
    {
        id : 3,
        title : '分享功能',
        icon : 'iconshare',
        path : '/share-manage',
        hidden : false,
        noDropdown : true,
    },
    {
        id : 4,
        title : '信息管理',
        icon : 'iconinfo',
        path : '/message-list',
        hidden : false,
        noDropdown : true
    },
    {
        id : 5,
        title : '资金管理',
        icon : 'iconpay3',
        path : '/finance-manege',
        hidden : false,
        noDropdown : false,
        children: [
            {
                id : '501',
                title : '收入支出',
                path : 'income-pay',
                routerType : '',
            },
            {
                id: 502,
                title: '资金统计',
                path: 'finance-analysis',
                routerType: '',
            }
        ]
    },
    {
        id : 6,
        title : '资金数据',
        icon : 'iconecharts',
        path : '/finance-data',
        hidden : false,
        noDropdown : true
    },
    {
        id : 7,
        title : '系统设置',
        icon : 'iconpermission',
        path : '/system-list',
        hidden : false,
        noDropdown : true
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
    }
];
