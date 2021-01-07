export const shareRoute = [
    {
        path: 'button',
        name: 'Button',
        component: () => import(/* webpackChunkName: "share" */ 'views/Element/Button.vue'),
        meta: {
            title: '按钮'
        }
    },
    {
        path: 'markdown',
        name: 'Markdown',
        component: () => import(/* webpackChunkName: "share" */ 'views/Element/Markdown.vue'),
        meta: {
            title: 'Markdown编辑器'
        }
    },
    {
        path: 'wang-editor',
        name: 'WangEditor',
        component: () => import(/* webpackChunkName: "share" */ 'views/Element/WangEditor.vue'),
        meta: {
            title: '富文本编辑器WangEditor'
        }
    }
];