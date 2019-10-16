export const errorRoute = [
    {
        path : 'error-one',
        name : 'page401',
        component: () => import(/* webpackChunkName: "base" */ 'views/Error/401.vue')
    },
    {
        path : 'error-four',
        name : 'page404',
        component: () => import(/* webpackChunkName: "base" */ 'views/Error/404.vue')
    }
];