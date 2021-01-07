export const financeRoute = [
    {
        path: 'income-pay',
        name: 'IncomePay',
        component: () => import(/* webpackChunkName: "finance" */ 'views/Finance/IncomePay.vue'),
        meta: {
            title: '收支分布'
        }
    },
    {
        path: 'finance-analysis',
        name: 'FinanceAnalysis',
        component: () => import(/* webpackChunkName: "finance" */ 'views/Finance/FinanceAnalysis.vue'),
        meta: {
            title: '资金统计'
        }
    },
    {
        path: 'finance-list',
        name: 'FinanceList',
        component: () => import(/* webpackChunkName: "finance" */ 'views/Finance/FinanceList.vue')
    }
];