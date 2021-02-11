export const TaskRouter = [
    {
        path: 'task-list',
        name: 'TaskList',
        component: () => import(/* webpackChunkName: "system" */ 'views/Task/TaskList.vue'),
        meta: {
            title: '任务列表',
        }
    },
    {
        path: 'task-log',
        name: 'TaskLog',
        component: () => import(/* webpackChunkName: "system" */ 'views/Task/TaskLog.vue'),
        meta: {
            title: '任务日志',
        }
    }
]