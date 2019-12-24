export const systemRoute = [
    {
        path: 'role-auth',
        name: 'RoleAuth',
        component: () => import(/* webpackChunkName: "system" */ 'views/System/RoleAuth.vue'),
        meta: {
            title: '角色权限',
        }
    }
]