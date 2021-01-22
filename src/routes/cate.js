export const CateRoute = [
    {
        path: 'cate-list',
        name: 'CateList',
        component:() => import(/* webpackChunkName: "blog" */ 'views/Blog/CateList.vue'),
        meta:{
            title: '分类列表'
        }
    },
    {
        path: 'tag-list',
        name: 'TagList',
        component:() => import(/* webpackChunkName: "blog" */ 'views/Blog/TagList.vue'),
        meta:{
            title: '标签列表'
        }
    },
    {
        path: 'post-list',
        name: 'PostList',
        component:() => import(/* webpackChunkName: "blog" */ 'views/Blog/Post.vue'),
        meta: {
            title: '文章列表'
        }
    }
]