export const TaskRouter = [
    {
        path: 'task-list',
        name: 'TaskList',
        component: () => import(/* webpackChunkName: "system" */ 'views/Task/TaskList.vue'),
        meta: {
            title: '任务列表',
        }
    },
]