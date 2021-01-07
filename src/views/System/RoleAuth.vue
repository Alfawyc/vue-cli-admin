<template>
    <div class="fillcontain">
        <div class="contain">
            <div class="table_container">
                <div class="marb10">
                    <el-button type="primary"  @click="dialogVisible = true">新增角色</el-button>
                </div>
                <el-table :data="authList" border style="100%" v-loading="loading" stripe row-key="authority_id" :tree-props="{children: 'Children' , hasChildren: 'hasChildren'}">
                    <el-table-column prop="authority_id" label="角色id"></el-table-column>
                    <el-table-column prop="authority_name" label="角色名称"></el-table-column>
                    <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作">
                        <span slot-scope="scope">
                            <el-button type="warning" @click="drawer = true">设置权限</el-button>
                            <el-button type="success" @click="addChildAuht(scope.row)">添加子角色</el-button>
                            <el-button type="primary" icon="el-icon-edit" circle @click="EditAuth(scope.row)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle @click="DeleteAuth(scope.row)"></el-button>
                        </span>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-drawer title="权限配置" :visible.sync="drawer" direction="rtl" size="40%">
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="角色菜单" name="menu">角色菜单</el-tab-pane>
                <el-tab-pane label="api权限" name="api">api权限</el-tab-pane>
            </el-tabs>
        </el-drawer>
        <el-dialog :title="isAdd ? '添加角色': '编辑角色'" :visible.sync="dialogVisible" @close="closeDialog">
            <el-form :model="authForm" :rules="rules" ref="authForm">
                <el-form-item label="父级角色：" prop="parent_id" label-width="120px" required>
                    <el-select v-model="authForm.parent_id" disabled>
                        <el-option v-for="(item , key) in authorityOption" :key="key" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色名：" prop="authority_name" label-width="120px" required>
                    <el-input v-model="authForm.authority_name"></el-input>
                </el-form-item>
                <el-form-item label="角色ID：" prop="authority_id" label-width="120px" required>
                    <el-input v-model="authForm.authority_id" :disabled="!isAdd"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remark" label-width="120px">
                    <el-input v-model="authForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAuth">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {checkRegex} from '@/data/common.js'
export default {
    name: 'RoleAuth',
    data(){
        let numberValidate = (rule , value , callback) => {
            if(!checkRegex(value , "number")){
                callback(new Error("请输入数字"))
            } else {
                callback()
            }
        }
        return {
            authList: [],
            loading: false,
            drawer: false,
            activeName: "menu",
            dialogVisible: false,
            authForm: {
                authority_id: '',
                authority_name: '',
                parent_id: 0,
                remark: '',
            },
            isAdd: true,
            authorityOption: [
                {
                    id: 0,
                    name: "根角色"
                }
            ],
            rules: {
                parent_id: [
                    { required: true , message: "父级权限不能为空" , trigger:"change" }
                ],
                authority_id: [
                    { required: true , message: "角色id不能为空"  , trigger: "blur"},
                    { validator: numberValidate , trigger: "blur"}
                ],
                authority_name: [
                    { required: true , message: "角色名不能为空" , trigger: "blur" },
                    { min:4, max: 12, message: "角色必须是4-12个字符" , trigger: "blur" }
                ],
                remark: [
                    { max: 30, message: "备注小于30个字符" , trigger: "blur"  }
                ]
            }
        }
    },
    created(){
        this.getAuth();
    },
    methods: {
        getAuth(){
            _api.get('/auth/auth-list').then((res) => {
                //this.loading = false;
                if(res.code != 0){
                    return false;
                }
                console.log(res);
                this.authList = res.data.list
            })
        },
        handleCheckChange(data, checked, indeterminate){
            //console.log(data, checked, indeterminate);
        },
        closeDialog(){
            console.log("close dialog");
            this.isAdd = true;
            this.authorityOption = [{ id: 0, name: "根角色"}];
            this.$refs['authForm'].resetFields();
            this.authForm = {authority_id: '', authority_name: '', parent_id: 0,remark: ''};
        },
        confirmAuth(){
            let apiUrl = this.isAdd ? '/auth/create-auth' : '/auth/update-auth'
            this.$refs['authForm'].validate((valid) => {
                if(!valid){
                    return false;
                }
                let id = parseInt(this.authForm.authority_id);
                this.authForm.authority_id = id;
                console.log(this.authForm)
                _api.post(apiUrl , this.authForm).then((res) => {
                    if(res.code != 0){
                        _g.toastMsg("error" , res.msg)
                        return false
                    }
                    _g.toastMsg("success" , "添加成功" , 1500 , () => {
                        this.getAuth()
                    })
                    this.dialogVisible = false;
                })
            })
        },
        addChildAuht(row){
            let option = { id:row.authority_id , name: row.authority_name}
            this.authorityOption.push(option)
            this.authForm.parent_id = row.authority_id;
            this.dialogVisible = true;
        },
        EditAuth(row){
            this.isAdd = false;
            console.log(row)
            this.authForm.parent_id = row.parent_id;
            this.authForm.authority_id = row.authority_id;
            this.authForm.authority_name = row.authority_name;
            this.authForm.remark = row.remark;
            if(row.parent_id != 0){
                console.log("不是顶级角色")
            }
            this.dialogVisible = true
        },
        DeleteAuth(row){
            _g.confirmMsg("warning" , "提示" , "确定要删除吗？？？" , () => {
                _api.post('/auth/delete-auth' , row).then((res) => {
                    if(res.code != 0){
                        _g.toastMsg("error" , res.msg);
                        return false;
                    }
                    _g.toastMsg("success" , "删除成功" , 1500 , () => {
                        this.getAuth();
                    })
                });
            })
        }
    }
}
</script>

<style lang="less" scoped>
.mart10{
    margin-top: 10px;
}
.info_container{
       padding: 20px;
       background: #fff;
       box-sizing: border-box;
       overflow: auto;
    }
     .title{
        text-align:center;
        width:100%;
        height:30px;
        line-height:30px;
        cursor: pointer;
        background-color: #3bc5ff;
        border:1px solid #3bc5ff;
        color: white;
        display: block;
    }
   .info_row{
        .area{
           border:1px solid #dfdfdf;
           height:100%;
           font-size:14px;
           padding:10px;
           .form{
               width:90%;
               margin-top:20px;
           }
        }
   }
</style>