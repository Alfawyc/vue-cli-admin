export const financeRoute = [
    {
        path: 'income-pay',
        name: 'IncomePay',
        component: () => import(/* webpackChunkName: "finance" */ 'views/Finance/IncomePay.vue'),
        meta: {
            title: '收支分布'
        }
    }
];