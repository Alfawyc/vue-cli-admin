<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-table :data="logData" border style="100%">
                <el-table-column label="ID" prop="id"></el-table-column>
                <el-table-column label="任务id" prop="task_id"></el-table-column>
                <el-table-column label="执行结果" prop="result"></el-table-column>
                <el-table-column label="开始时间" prop="start_time"></el-table-column>
                <el-table-column label="结束时间" prop="end_time"></el-table-column>
            </el-table>
            <pagination :toPage="toPage" @from-page="fromPage"></pagination>
        </div>
    </div>
</template>

<script>
import paginate from 'components/Paginate.vue';
export default {
    name: "TaskLog",
    components: {
        pagination: paginate
    },
    data(){
        return {
            searchParams:{
                page: 1,
            },
            toPage: {
                currentPage: 1,
                totalCount: 0,
                perpage: 1
            },
            logData: []
        }
    },
    created(){
        this.getLog();
    },
    methods: {
        getLog(){
            _api.get("/task/log-list" , this.searchParams).then((res) => {
                if(res.code != 0){
                    _g.toastMsg("error" , res.msg);
                    return false;
                }
                console.log(res);
                this.logData = res.data.list;
                this.toPage.currentPage = res.data.page;
                this.toPage.totalCount = res.data.total;
                this.toPage.perpage = res.data.page_size;
            });
        },
        fromPage(val){
            this.searchParams.page = val;
            this.getLog();
        }
    }
}
</script>

<style lang="less" scoped>

</style>