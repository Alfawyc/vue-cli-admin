export const userRoute = [
    {
        path : 'user-list',
        name : 'UserList',
        component: () => import(/* webpackChunkName: "user" */ 'views/User/UserList.vue'),
        meta: {
            title: '用户列表'
        }
    },
    {
        path: 'user-analysis',
        name: 'UserAnalysis',
        component: () => import(/* webpackChunkName: "user" */ 'views/User/UserAnalysis.vue'),
        meta: {
            title: '用户分析'
        }
    },
    {
        path: 'add-user',
        name: 'AddUser',
        component: () => import(/* webpackChunkName: "user" */ 'views/User/AddUser.vue'),
        meta: {
            title: '新增用户'
        }
    },
    {
        path: 'edit-article',
        name: 'EditArticle',
        component: () => import(/* webpackChunkName: "user" */ 'views/User/EditArticle.vue'),
        meta: {
            title: '添加文章'
        }
    }
]