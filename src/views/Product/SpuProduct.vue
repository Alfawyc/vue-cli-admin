<template>
    <div class="fillcontain">
        <div class="contain">
            <el-tabs type="border-card" v-model="activeName" @tab-click="tabClick"> 
                <el-tab-pane label="SKU" name="sku">SKU</el-tab-pane>
                <el-tab-pane label="SPU" name="spu">
                    <el-button type="primary" @click="jumpTo('/product-manage/add-spu')">新增SPU产品</el-button>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SpuProduct',
    data(){
        return {
            activeName: 'spu',
        }
    },
    created(){

    },
    methods: {
        tabClick(){
            if(this.activeName == 'sku'){
                this.$router.push({ path: '/product-manage/sku-product' });
            }
        },
        jumpTo(path , query = {  }){
            this.$router.push({ path: path , query: query });
        }
    }
}
</script>

<style lang="less" scoped>

</style>