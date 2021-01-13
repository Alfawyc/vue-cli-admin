<template>
    <div class="fillcontain">
        <div class="table_container">
            <div class="marb10">
                <el-button type="primary" @click="editDialog = true">新增Api</el-button>
            </div>
            <el-table :data="apiList" border style="100%" v-loading="loading">
                <el-table-column prop="path" label="路径"></el-table-column>
                <el-table-column prop="group" label="分组"></el-table-column>
                <el-table-column prop="method" label="请求方式"></el-table-column>
                <el-table-column prop="description" label="简介" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle @click="editApi(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteApi(scope.row.ID)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination :toPage="toPage" @from-page="fromPage"></pagination>
        </div>
        <el-dialog :title="isAdd ? '添加api': '编辑api' " :visible.sync="editDialog" @close="closeDialog">
            <el-form :model="formData" inline ref="apiForm" :rules="rules">
                <el-form-item label="路径" prop="path" required label-width="80px">
                    <el-input v-model="formData.path"></el-input>
                </el-form-item>
                <el-form-item label="请求方式" prop="method" required label-width="80px">
                    <el-select v-model="formData.method">
                        <el-option v-for="(item , key) in methodOption" :key="key" :value="item" :label="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分组" prop="group" required label-width="80px">
                    <el-input v-model="formData.group"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="description" required label-width="80px">
                    <el-input v-model="formData.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="confirmEdit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import paginate from 'components/Paginate.vue';
export default {
    name: "ApiList",
    components: {
        pagination: paginate
    },
    data(){
        return {
            apiList:[],
            loading: false,
            searchParams: {
                page: 1
            },
            toPage: {
                currentPage: 1,
                totalCount: 0,
                perpage: 1
            },
            editDialog: false,
            isAdd : true,
            formData: {
                path: '',
                method: '',
                group: '',
                description: '',
            },
            methodOption: ["GET", "POST" ,"PUT" ,"DELETE"],
            rules: {
                path: [
                    { required: true, message: "路径不能为空", trigger: "blur" }
                ],
                method: [
                    { required: true , message: "请求方式不能为空", trigger: "change" }
                ],
                group: [
                    { required: true, message: "分组不能为空" , trigger: "blur" }
                ],
                description: [
                    { required: true , message: "简介不能为空" , trigger: "blur" }
                ]
            }
        }
    },
    created(){
        this.getApiList();
    },
    methods: {
        getApiList(){
            _api.get('/api/api-list' , this.searchParams).then((res) => {
                if(res.code != 0){
                    _g.toastMsg("error" , res.msg);
                    return false;
                }
                this.apiList = res.data.list;
                this.toPage.currentPage = res.data.page;
                this.toPage.totalCount = res.data.total;
                this.toPage.perpage = res.data.page_size;
            })
        },
        fromPage(val){
            this.searchParams.page = val;
            this.getApiList()
        },
        closeDialog(){
            console.log("close dailog init");
            this.$refs['apiForm'].resetFields();
            this.formData = {
                path: '',
                method: '',
                group: '',
                description: '',
            },
            console.log(this.formData);
        },
        confirmEdit(){
            this.$refs.apiForm.validate((valid) => {
                if(!valid){
                    return false;
                }
                let url = this.isAdd ? '/api/create-api' : '/api/update-api';
                _api.post(url , this.formData).then((res) => {
                    if(res.code != 0){
                        _g.toastMsg("error" , res.msg);
                        return false;
                    }
                    _g.toastMsg("success" , "操作成功" , 1500 , () => {
                        this.getApiList()
                    });
                    this.editDialog = false;
                });
            });
        },
        deleteApi(id){
            _g.confirmMsg("warning", "提示" , "确定要删除该api吗？？？" , () => {
                _api.post("/api/delete-api" , { id: id }).then((res) => {
                    if(res.code != 0){
                        _g.toastMsg("error" , res.msg);
                        return false;
                    }
                    _g.toastMsg("success", "删除成功" , 1500 , () => {
                        this.getApiList();
                    })
                })
            })
        },
        editApi(row){
            let tmp = row
            this.editDialog = true;
            this.formData = {
                id: row.ID,
                path: row.path,
                method: row.method,
                group: row.group,
                description: row.description,
            }
            //this.formData.ID = row.ID;
            this.isAdd = false;
        }
    }
}
</script>

<style lang="less" scoped>
.table_container{
        padding: 10px;
        background: #fff;
        border-radius: 2px;
    }
    .el-dialog--small{
       width: 600px !important;
    }
</style>