<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="cus-fl">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="toPage.currentPage" :page-size="toPage.perpage-0" layout="total,prev, pager, next, jumper" :total="toPage.totalCount"></el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name : 'pagination',
    data(){
        return {

        }
    },
    props: {
        toPage: {
            type : Object,
            default: {
                currentPage: 1,
                totalCount: 0,
                perpage: 0
            }
        },
        keyName: {
            type: String,
            default: ''
        }
    },
    created(){

    },
    methods: {
        handleSizeChange(val){
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.$emit('from-page', val, this.keyName);
        }
    }

}
</script>

<style lang="less" scoped>
.cus-fl {
    text-align: right;
    margin-top: 10px;
}
</style>