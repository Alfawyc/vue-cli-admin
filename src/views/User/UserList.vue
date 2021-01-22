<template>
    <div class="fillcontain">
        <div class="contain">
            <div class="table_container">
                <el-button type="primary" class="marb10" @click="dialogVisible = true">新增用户</el-button>
                <el-table :data="userList" border style="100%" v-loading="loading">
                    <!-- <el-table-column prop="ID" label="ID"></el-table-column> -->
                    <el-table-column prop="nickname" label="昵称"></el-table-column>
                    <el-table-column prop="avatar" label="头像">
                        <template slot-scope="scope">
                            <el-avatar shape="square" size="large" :src="scope.row.avatar" v-if="scope.row.avatar"></el-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column prop="username" label="真实姓名"></el-table-column>
                    <el-table-column prop="email" label="邮箱地址"></el-table-column>
                    <el-table-column prop="phone" label="电话"></el-table-column>
                    <el-table-column prop="sex" label="性别">
                        <template slot-scope="scope">
                            <span>{{ scope.row.sex|sexFilter }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="authority_id" label="角色id"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="success" icon="el-icon-user-solid" circle @click="setAuth(scope.row)"></el-button>
                            <el-button type="primary" icon="el-icon-edit" circle @click="editUser(scope.row)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle @click="deleteUser(scope.row.ID)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <paginate :toPage="toPaga" @from-page="fromPage"></paginate>
            </div>
        </div>
        <el-dialog title="添加用户" :visible.sync="dialogVisible" @close="closeDialog">
            <el-form :model="userForm" :rules="userRules" ref="userForm">
                <el-form-item label="用户名：" prop="username" label-width="120px" required>
                    <el-input v-model="userForm.username"></el-input>
                </el-form-item>
                <el-form-item label="头像：" prop="avatar" label-width="120px" required>
                    <el-upload class="avatar-uploader" action="/file/upload" :show-file-list="false" :on-success="handleAvatarSuccess">
                        <img v-if="userForm.imageUrl" :src="userForm.imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="昵称：" prop="nickname" label-width="120px" required>
                    <el-input v-model="userForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password" label-width="120px" required v-if="isAddUser">
                    <el-input v-model="userForm.password"></el-input>
                </el-form-item>
                <el-form-item label="Email：" prop="email" label-width="120px" required>
                    <el-input v-model="userForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话：" prop="phone" label-width="120px" required>
                    <el-input v-model="userForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="性别：" prop="sex" label-width="120px" required>
                    <el-select v-model="userForm.sex">
                        <el-option label="男" value="M"></el-option>
                        <el-option label="女" value="F"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmUser">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 设置角色 -->
        <el-dialog :visible.sync="authVisible" title="设置权限" @close="closeAuth">
            <el-form :model="userAuth">
                <el-form-item label="角色：" label-width="100px">
                    <el-cascader :options="authOption" :props="{ checkStrictly: true, label: 'authority_name', value:'authority_id', children: 'Children',emitPath: false }" clearable v-model="userAuth.authority_id" placeholder="请选择角色" :show-all-levels="false" @change="authChange"></el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="authVisible = false">取 消</el-button>
                <el-button type="primary" @click="setUserAuth">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import paginate from 'components/Paginate.vue';
import {checkRegex} from '@/data/common.js'
export default {
    name : 'UserList',
    components:{
        paginate: paginate
    },
    data(){
        let checkMobile = (rule, value , callback) => {
            if(!checkRegex(value , "mobile")){
                callback(new Error("手机号格式错误"))
            } else {
                callback()
            }
        }
        let checkEmail = (rule , value , callback) => {
            if(!checkRegex(value , "email")){
                callback(new Error("email格式错误"))
            } else {
                callback()
            }
        }
        return {
            searchParams: {
                page: 1,
            },
            userList: [],
            toPaga: {
                currentPage: 1,
                totalCount: 0,
                perpage: 1
            },
            loading : true,
            dialogVisible: false,
            authVisible: false,
            userForm: {
                username:"",
                password:"",
                nickname:"",
                phone:"",
                email:"",
                sex:"",
                avatar: "",
                imageUrl: ""
            },
            authOption: [],
            userAuth: {
                user_id: '',
                authority_id: ''
            },
            isAddUser: true,
            userRules: {
                username: [
                    {required: true , message:"请输入用户名", trigger: "blur" },
                    { min:3, max: 6 , message: "请输入3到5位用户名" , trigger:"blur" }
                ],
                nickname: [
                    {required: true , message:"请输入昵称", trigger: "blur" },
                ],
                password: [
                    {required: true, message:"请输入密码" , trigger: "blur"}
                ],
                phone: [
                    {required:true , message:"请输入手机号", trigger: "blur"},
                    {validator: checkMobile , triggger: "blur"}
                ],
                email: [
                    {required: true , message: "请输入邮箱" , trigger: "blur"},
                    {validator: checkEmail , trigger: "blur"}
                ],
                sex: [
                    {required: true , message: "请选择性别", trigger: "change"}
                ]
            }
        }
    },
    created(){
        this.getUserList();
    },
    methods: {
        fromPage(val){
            this.searchParams.page = val
            this.getUserList();
        },
        jumpTo(path , query = {}){
            this.$router.push({ path: path , query: query });
        },
        getUserList(){
            _api.get('/user/user-list' , this.searchParams).then((res) => {
                this.loading = false;
                if (res.code != 0){
                    _g.toastMsg("error" , res.msg);
                    return false;
                }
                this.userList = res.data.list;
                this.toPaga.totalCount = res.data.total;
                this.toPaga.perpage = res.data.page_size;
                this.toPaga.currentPage = res.data.page
            });
        },
        confirmUser(){
            this.$refs['userForm'].validate((valid) => {
                if(!valid){
                    return false;
                }
                let url = this.isAddUser ? '/user/register' : '/user/set-info';
                _api.post(url , this.userForm).then((res) => {
                    console.log(res)
                    if(res.code != 0){
                        _g.toastMsg("error" , res.msg);
                        return false;
                    }
                    _g.toastMsg("success", "操作成功" , 1500 , () => {
                        this.dialogVisible = false;
                        this.getUserList();
                    })
                });
            })
        },
        closeDialog(){
            this.$refs['userForm'].resetFields();
        },
        deleteUser(userId){
            _g.confirmMsg("warning" , "提示" , "确定要删除该用户吗？？？" , () => {
                _api.post("/user/delete-user" , { id: userId }).then((res) => {
                    if (res.code != 0){
                        _g.toastMsg("error" , res.msg);
                        return false;
                    }
                    _g.toastMsg("success" , "删除成功" , 1500 , () => {
                        this.getUserList()
                    })
                })
            })
        },
        setAuth(row){
            this.authVisible = true;
            this.userAuth.user_id = row.ID;
            this.userAuth.authority_id = row.authority_id;
            this.getAllAuth()
            
        },
        getAllAuth(){
            _api.get("/auth/all-auth").then((res) => {
                if (res.code != 0){
                    _g.toastMsg("error" , res.msg);
                    return;
                }
                this.authOption = res.data.list;
            })
        },
        closeAuth(){
            this.userAuth = { user_id: '', authority_id: '' }
        },
        setUserAuth(){
            if(!this.userAuth.authority_id || !this.userAuth.user_id){
                _g.toastMsg("error" , "用户和角色不能为空");
                return false;
            }
            _api.post("/user/user-auth" , this.userAuth).then((res) => {
                if(res.code != 0){
                    _g.toastMsg("error" , res.msg);
                    return false;
                }
                _g.toastMsg("success" , "设置成功" , 1500 , () => {
                    this.getUserList();
                });
                this.authVisible = false;
            })
        },
        authChange(){
            console.log(this.userAuth);
        },
        handleAvatarSuccess(res, file) {
            let val = URL.createObjectURL(file.raw);
            if(res.code != 0){
                _g.toastMsg("error" , res.msg);
                return false;
            }
            this.userForm.avatar = res.data.path;
            this.userForm.imageUrl = val;
            console.log(res);
            console.log(val)
        },
        editUser(row){
            this.userForm.ID = row.ID;
            this.userForm.username = row.username;
            this.userForm.nickname = row.nickname;
            this.userForm.email = row.email;
            this.userForm.phone = row.phone;
            this.userForm.sex = row.sex;
            this.userForm.avatar = row.avatar;
            this.userForm.imageUrl = row.avatar;
            this.isAddUser = false;
            this.dialogVisible = true;
        }
    }
}
</script>

<style lang="less" scoped>
.contain{
    background: #fff;
    padding: 10px;
    margin-bottom: 20px;
}
.pagination{
    padding: 10px 20px;
    text-align: right;
}
.marb10{
    margin-bottom: 10px;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
</style>