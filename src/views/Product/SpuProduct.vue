<template>
    <div class="fillcontain">
        <div class="contain">
            <el-tabs type="border-card" v-model="activeName" @tab-click="tabClick"> 
                <el-tab-pane label="SKU" name="sku">SKU</el-tab-pane>
                <el-tab-pane label="SPU" name="spu">
                    <el-button type="primary" @click="jumpTo('/product-manage/add-spu')">新增SPU产品</el-button>
                </el-tab-pane>
                <el-table :data="tableData" style="width: 100%" class="mart10" v-loading="loading">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="spu" label="SPU"></el-table-column>
                    <el-table-column prop="product_name" label="产品名称"></el-table-column>
                    <el-table-column prop="source" label="来源"></el-table-column>
                    <el-table-column prop="username" label="创建人"></el-table-column>
                    <el-table-column prop="create_time" label="更新时间"></el-table-column>
                    <el-table-column prop="create_time" label="添加时间"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button type="success" icon="el-icon-edit" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle @click="deleteProduct(scope)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mart20">
                    <el-button type="info">批量删除</el-button>
                    <el-button type="warning" plain>批量修改</el-button>

                </div>
                <paginate :from-page="fromPage" :toPage="toPaga"></paginate>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import paginate from '@/components/Paginate';
export default {
    name: 'SpuProduct',
    components: {
        paginate: paginate
    },
    data(){
        return {
            activeName: 'spu',
            toPaga: {
                currentPage: 1,
                totalCount: 100,
                perpage: 10
            },
            loading : true,
            tableData: [

            ]
        }
    },
    created(){
        this.mockProduct();
    },
    methods: {
        tabClick(){
            if(this.activeName == 'sku'){
                this.$router.push({ path: '/product-manage/sku-product' });
            }
        },
        jumpTo(path , query = {  }){
            this.$router.push({ path: path , query: query });
        },
        fromPage(){
            console.log('form-page');
        },
        mockProduct(){
            let fakeData = Mock.mock({
                'array|10': [
                    {
                        "spu" : /\d{6}/,
                        "product_name": '@csentence(5)',
                        'source' : '@csentence(3)',
                        'username' : '@cname',
                        'create_time' : '@datetime("yyyy-MM-dd HH:mm:ss")'
                    }
                ]
            });
            this.tableData = fakeData.array;
            setTimeout(() => {
                this.loading = false
            } , 1000);
        },
        deleteProduct(scope){
            _g.confirmMsg('warning' , '提示' , '确定要删除该SPU吗？？？' , () => {
                let index = scope.$index;
                this.loading = true;
                _g.toastMsg('success' , '删除成功' , 1500 , () => {
                    this.loading = false;
                    this.tableData.splice(index , 1);
                });
            });
        }
    }
}
</script>

<style lang="less" scoped>

</style>