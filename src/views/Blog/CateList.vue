<template>
    <div class="fillcontain">
        <div class="contain">
            <el-button class="marb10" type="primary" @click="visible = true">添加分类</el-button>
            <el-table border style="100%" v-loading="loading" :data="tableData">
                <el-table-column label="分类名称" prop="name"></el-table-column>
                <el-table-column label="分类介绍" prop="intro"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" icon="el-icon-edit" circle @click="editCata(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteCate(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 修改添加弹窗 -->
        <el-dialog :title="isAdd ? '添加' : '修改'" :visible.sync="visible" @close="closeDialog()">
            <el-form ref="dialogForm" :rules="rules" :model="form" label-width="100px">
                <el-form-item label="分类名称：" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="分类介绍：" prop="intro">
                    <el-input v-model="form.intro"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'CateList',
    data(){
        return{
            tableData: [],
            loading: true,
            visible: false,
            isAdd: true,
            form: {
                id: '',
                name:'',
                intro: ''
            },
            rules: {
                name: [
                    { required: true, message: '分类名称不能为空', trigger: 'blur' },
                    { max: 10, message: "分类名称过长", trigger: "blur" }
                ],
                intro: [
                    { required: true, message: "分类介绍不能为空",trigger: "blur" },
                    { max: 20, message: "分类名称过长", trigger: "blur" },
                ]
            }
               
            
        }
    },
    created(){
        this.getCateList()
    },  
    methods: {
        //获取分类
        getCateList(){
            _api.get('/admin/cate-list').then((res) => {
                this.loading = false
                if(res.code != 0){
                    _g.toastMsg("error" , res.message , 1500)
                    return false;
                }
                this.tableData = res.data
            })
        },
        //删除分类
        deleteCate(id){
            _g.confirmMsg("warning" , "提示" , "确定要删除吗？？？删除前请确保该分类下没有文章" , () => {
                _api.post('/admin/delete-cate' , {id: id}).then((res) => {
                    if(res.code != 0){
                        _g.toastMsg("error" , res.message)
                        return false
                    }
                    _g.toastMsg("success" , "删除成功" , 1500 , () => {
                        this.getCateList()
                    })
                })
            })
        },
        editCata(row){
            this.form.id = row.id;
            this.form.name = row.name;
            this.form.intro = row.intro;
            //this.form = row;
            this.visible = true;
            this.isAdd = false;
        },
        //确认修改,添加
        confirm(){
            let submit
            this.$refs['dialogForm'].validate((valid) => {
                submit = valid;
            })
            if(!submit){
                return false;
            }
            let url = this.isAdd ? '/admin/add-cate' : '/admin/cate-update';
            let postData = this.isAdd ? {name:this.form.name , intro: this.form.intro} : this.form;
            _api.post(url , postData).then((res) => {
                if (res.code != 0){
                    _g.toastMsg('error' , res.message)
                    return false
                }
                this.closeDialog();
                _g.toastMsg("success" , '编辑成功' , 1500 , () => {
                    this.getCateList()
                })
            })
        },
        //关闭弹回调
        closeDialog(){
            this.visible = false;
            this.form = {id: '', name:'', intro: '' };
            this.$refs['dialogForm'].resetFields();
            this.isAdd = true
        }
    }
}
</script>

<style lang="less" scope>
.marb10 {
    margin-bottom: 10px;
}
</style>