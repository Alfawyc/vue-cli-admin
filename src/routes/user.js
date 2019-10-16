export const userRoute = [
    {
        path : 'user-list',
        name : 'UserList',
        component: () => import(/* webpackChunkName: "base" */ 'views/User/UserList.vue')
    }
]