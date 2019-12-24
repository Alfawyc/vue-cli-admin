<template>
    <div class="fillcontain">
        <div class="contain">
            <el-tabs type="border-card" v-model="activeName" @tab-click="tabClick"> 
                <el-tab-pane label="SKU" name="sku">SKU</el-tab-pane>
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
            activeName: 'sku'
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