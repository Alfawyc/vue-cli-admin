<template>
    <div class="fillcontain">
        <div class="table_container">
            <div class="marb10">
                <el-button type="primary" @click="dialogVisible = true">添加任务</el-button>
            </div>
            <el-table :data="list" border style="100%">
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="spec" label="Spec"></el-table-column>
                <el-table-column prop="command" label="Command"></el-table-column>
                <el-table-column prop="timeout" label="超时时间（S）"></el-table-column>
                <el-table-column prop="retry_times" label="重试次数"></el-table-column>
                <el-table-column prop="retry_interval" label="重试间隔（S）"></el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">可用</span>
                        <span v-else>禁用</span>
                    </template>
                </el-table-column>
                <el-table-column prop="running_state" label="运行状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.running_state == 2">
                            <el-tag effect="dark" type="success">running</el-tag>
                        </span>
                        <span v-else><el-tag effect="dark" type="warning">stop</el-tag></span>
                    </template>
                </el-table-column>
                <el-table-column prop="operate" label="操作">
                    <template slot-scope="scope">
                        <span>
                            <el-button icon="el-icon-close" type="danger" circle @click="stop(scope.row)" v-if="scope.row.running_state == 2"></el-button>
                            <el-button type="success" icon="el-icon-check" circle @click="recover(scope.row)" v-else></el-button>
                            
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <pagination :toPage="toPage" @from-page="fromPage"></pagination>
        </div>
        <el-dialog title="添加任务" :visible.sync="dialogVisible" @close="initPostFrom">
            <el-form :model="postData" label-width="100px" :rules="rules">
                <el-form-item label="名称" prop="name" required >
                    <el-input v-model="postData.name"></el-input>
                </el-form-item>
                <el-form-item label="Spec" prop="spec" required>
                    <el-input v-model="postData.spec"></el-input>
                </el-form-item>
                <el-form-item label="Command" prop="command" required>
                    <el-input v-model="postData.command"></el-input>
                </el-form-item>
                <el-form-item label="超时时间" prop="timeout" required>
                    <el-input-number v-model="postData.timeout" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="重试次数" prop="retry_times" required>
                    <el-input-number v-model="postData.retry_times" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="重试间隔" prop="retry_interval" required>
                    <el-input-number v-model="postData.retry_interval" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="备注" prop="remark" required>
                    <el-input v-model="postData.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>
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
            },
            isAdd: true,
            dialogVisible: false,
            postData: {
                name: '',
                level: 1,
                spec: '',
                command: '',
                timeout: 0,
                retry_times: 0,
                retry_interval: 0,
                remark: '',
                status: 1,
            },
            rules: {

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
        },
        initPostFrom(){
            this.postData = { name: '', spec: '', command: '', timeout: 0, retry_times: 0, retry_interval: 0,remark: '', level: 1,};
        },
        confirm(){
            _api.post('/task/add-task' , this.postData).then((res) => {
                if(res.code != 0){
                    _g.toastMsg("error" , res.msg);
                    return false;
                }
                this.dialogVisible = false;
                _g.toastMsg("success" , "添加成功" , 1500 , () => {
                    this.getTask();
                })
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>