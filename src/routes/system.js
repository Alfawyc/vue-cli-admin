export const systemRoute = [
    {
        path: 'role-auth',
        name: 'RoleAuth',
        component: () => import(/* webpackChunkName: "system" */ 'views/System/RoleAuth.vue'),
        meta: {
            title: '角色权限',
        }
    },
    {
        path: 'api-list',
        name: 'ApiList',
        component: () => import(/* webpackChunkName: "system" */ 'views/System/Api.vue'),
        meta: {
            title: '系统工具',
        }
    }
]