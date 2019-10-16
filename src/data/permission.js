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
        path : 'user-mamage',
        hidden : false,
        noDropdown : true
    },
    {
        id : 3,
        title : '分享功能',
        icon : 'iconshare',
        path : 'share-manage',
        hidden : false,
        noDropdown : true,
    },
    {
        id : 4,
        title : '信息管理',
        icon : 'iconinfo',
        path : 'message-list',
        hidden : false,
        noDropdown : true
    },
    {
        id : 5,
        title : '资金管理',
        icon : 'iconpay3',
        path : 'finance-manege',
        hidden : false,
        noDropdown : true
    },
    {
        id : 6,
        title : '资金数据',
        icon : 'iconecharts',
        path : 'finance-data',
        hidden : false,
        noDropdown : true
    },
    {
        id : 7,
        title : '系统设置',
        icon : 'iconpermission',
        path : 'system-list',
        hidden : false,
        noDropdown : true
    },
    {
        id : 8,
        title : '错误页面',
        icon : 'iconError',
        path : 'error-page',
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
