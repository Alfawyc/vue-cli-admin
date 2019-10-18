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
    }
]