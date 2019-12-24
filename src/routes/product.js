export const productRoute = [
    {
        path: 'sku-product',
        name: 'SkuProduct',
        component: () => import(/* webpackChunkName: "product" */ 'views/Product/SkuProduct.vue'),
        meta: {
            title: 'SKU产品',
        }
    },
    {
        path: 'spu-product',
        name: 'SpuProduct',
        component: () => import(/* webpackChunkName: "product" */ 'views/Product/SpuProduct.vue'),
        meta: {
            title: 'SPU产品',
        }
    },
    {
        path: 'add-spu',
        name: 'AddSpu',
        component: () => import(/* webpackChunkName: "product" */ 'views/Product/AddSpu.vue'),
        meta: {
            title: '添加SPU产品',
        }
    }
]