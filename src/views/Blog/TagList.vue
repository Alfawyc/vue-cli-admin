<template>
    <div class="fillcontain">
        <div class="contain">
            <div class="marb10">
                <el-button type="primary" @click="visible = true">添加标签</el-button>
            </div>
            <el-table border style="100%" v-loading="loading" :data="tagData" @sort-change="sortChange">
                <el-table-column label="分类名称" prop="name"></el-table-column>
                <el-table-column label="分类介绍" prop="intro"></el-table-column>
                <el-table-column label="文章数量" prop="count" sortable ></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" icon="el-icon-edit" circle @click="editTag(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteTag(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <paginate :to-page="toPaga" @from-page="fromPage"></paginate>
            <!-- 新增,修改弹窗 -->
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
    </div>
</template>

<script>
import paginate from 'components/Paginate.vue';
export default {
    name: 'TagList',
    components:{
        paginate: paginate
    },
    data(){
        return{
            tagData: [],
            loading: true,
            toPaga: {
                currentPage: 1,
                totalCount: 0,
                perpage: 1
            },
            searchParams:{
                page:1,
                orderBy: 'count',
                order: ''
            },
            visible:false,
            form: {
                id:'',
                name:'',
                intro:''
            },
            isAdd: true,
            rules:{
                name: [
                    {required: true, message: '标签名不能为空', trigger: 'blur'},
                    {max: 10 , message: '标签名过长' , trigger: 'blur'}
                ],
                intro: [
                    { required: true, message: '标签介绍不能为空', trigger: 'blur' },
                    { max: 20 , message: '标签介绍过长' , trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        this.getTagList();
    },
    methods: {
        //获取标签
        getTagList(){
            _api.get('/admin/tag-list' , this.searchParams).then((res) => {
                this.loading = false;
                if(res.code != 0){
                    _g.toastrMsg("error" , res.message);
                    return false;
                }
                this.tagData = res.data.data;
                this.toPaga.currentPage = res.data.current_page;
                this.toPaga.totalCount = res.data.total;
                this.toPaga.perpage = res.perpage
            });
        },
        //翻页
        fromPage(val){
            this.searchParams.page = val;
            this.getTagList()
        },
        //排序
        sortChange(val){
            this.searchParams.order = val.order == "descending" ? 'desc' : 'asc';
            this.getTagList()
        },
        confirm(){
            let submit;
            this.$refs.dialogForm.validate((valid) => {
                submit = valid
            });
            if(!submit){
                return false;
            }
            let url = this.isAdd ? '/admin/tag-add' : '/admin/tag-update'
            let postData = this.isAdd ? {name: this.form.name , intro: this.form.intro} : this.form
            _api.post(url , postData).then((res) => {
                if(res.code != 0){
                    _g.toastMsg("error" , res.message);
                    return false;
                }
                this.visible = false;
                _g.toastMsg("success" , "操作成功" , 1500 , () => {
                    this.getTagList();
                })
            });
        },
        closeDialog(){
            //this.visible = false;
            this.$refs.dialogForm.resetFields()
            this.isAdd = true;
            this.form = { id: '', name: '' , intro: '' }
        },
        deleteTag(id){
            _g.confirmMsg("warning" , '提示' , '确定要删除该标签吗？？？删除前请确定该标签下没有文章' , () => {
                _api.post('/admin/tag-delete' , { id: id }).then((res) => {
                    if(res.code != 0){
                        _g.toastMsg('error' , res.message);
                        return false;
                    }
                    _g.toastMsg('success' , '删除成功' , 1500 , () => {
                        this.getTagList();
                    })
                });
            });
        },
        editTag(row){
            this.form.id = row.id;
            this.form.name = row.name;
            this.form.intro = row.intro;
            this.visible = true;
            this.isAdd = false;
        }
    }
}
</script>

<style lang="less" scope>
// .marb10 {
//     margin-bottom: 10px;
// }
</style>