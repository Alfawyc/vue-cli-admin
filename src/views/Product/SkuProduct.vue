<template>
    <div class="fillcontain">
        <div class="contain">
            
            <el-tabs type="border-card" v-model="activeName" @tab-click="tabClick"> 
                <el-tab-pane label="SKU" name="sku">
                    <div class="marb10">
                        <el-button type="primary">新增SKU</el-button>
                    </div>
                    <el-table :data="tableData" border style="width:100%">
                        <el-table-column prop="sku" label="sku"></el-table-column>
                        <el-table-column prop="spu" label="spu"></el-table-column>
                        <el-table-column prop="名称" label="名称"></el-table-column>
                        <el-table-column prop="主图" label="主图"></el-table-column>
                        <el-table-column prop="尺寸" label="尺寸"></el-table-column>
                        <el-table-column prop="首次报价" label="首次报价"></el-table-column>
                        <el-table-column prop="首选供应商" label="首选供应商"></el-table-column>
                        <el-table-column prop="产品分类" label="产品分类"></el-table-column>
                        <el-table-column prop="产品开发" label="产品开发"></el-table-column>
                        <el-table-column prop="备注" label="备注"></el-table-column>
                        <el-table-column prop="创建时间" label="创建时间"></el-table-column>
                        <el-table-column prop="操作" label="操作"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="SPU" name="spu">SPU</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SkuProduct',
    data(){
        return {
            activeName: 'sku',
            tableData: []
        }
    },
    created(){

    },
    methods: {
        tabClick(){
            if(this.activeName == 'spu'){
                this.$router.push({ path: '/product-manage/spu-product' });
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>