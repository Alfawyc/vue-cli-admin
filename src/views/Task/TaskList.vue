<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-table :data="list" border style="100%">
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="spec" label="Spec"></el-table-column>
                <el-table-column prop="command" label="Command"></el-table-column>
                <el-table-column prop="retry_times" label="重试次数"></el-table-column>
                <el-table-column prop="retry_interval" label="重试间隔（S）"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
                <el-table-column prop="operate" label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" icon="el-icon-check" circle @click="recover(scope.row)"></el-button>
                        <el-button icon="el-icon-close" type="danger" circle @click="stop(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination :toPage="toPage" @from-page="fromPage"></pagination>
        </div>
    </div>
</template>

<script>
import paginate from 'components/Paginate.vue';
export default {
    name: 'TaskList',
    components: {
        pagination: paginate
    },
    data(){
        return {
            toPage: {
                currentPage: 1,
                totalCount: 0,
                perpage: 1
            },      
            list: [],
            searchParams: {
                page: 1
            }
        }
    },
    created(){
        this.getTask();
    },
    methods: {
        getTask(){
            _api.get('/task/task-list' , this.searchParams).then((res) => {
                if (res.code != 0){
                    _g.toastMsg("error" , res.msg);
                    return false;
                }
                this.list = res.data.list;
                this.toPage.currentPage = res.data.page;
                this.toPage.totalCount = res.data.total;
                this.toPage.perpage = res.data.page_size;
            })
        },
        fromPage(val){
            this.searchParams.page = val;
            this.getTask();
        },
        stop(row){
            _g.confirmMsg("warning" , "提示" , "确定要停止该任务吗？？？" , () => {
                _api.post("/task/remove-task" , { id: row.ID}).then((res) => {
                    if(res.code != 0){
                        _g.toastMsg("error" , res.message);
                        return false;
                    }
                    _g.toastMsg("success" , "操作成功" , 1500 , () => {
                        this.getTask();
                    })
                });
            })
        },
        recover(row){
            _g.confirmMsg("warning" , "提示" , "确定要重置该任务吗？？？" , () => {
                _api.post("/task/recover-task" , { id: row.ID}).then((res) => {
                    if(res.code != 0){
                        _g.toastMsg("error" , res.message);
                        return false;
                    }
                    _g.toastMsg("success" , "操作成功" , 1500 , () => {
                        this.getTask();
                    })
                });
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>