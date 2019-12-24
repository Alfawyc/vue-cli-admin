<template>
    <div class="fillcontain">
        <div class="info_container">
            <el-row class="info_row row" :gutter="10">
                <el-form ref="form" :rules="rules" :model="postData" label-width="80px" class="demo-ruleForm"> 
                    <el-col :span="8">
                        <el-form-item label="用户名" prop="username">
                        <el-input v-model="postData.username" placeholder="请输入用户名"></el-input>
                        </el-form-item>                    
                        <el-form-item label="真实姓名" prop="realname">
                            <el-input v-model="postData.realname" placeholder="请输入真实姓名"></el-input>
                        </el-form-item>                  
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="postData.email" placeholder="请输入邮箱"></el-input>
                        </el-form-item>                    
                        <el-form-item label="手机号" prop="mobile">
                            <el-input v-model="postData.mobile" placeholder="请输入手机号"></el-input>
                        </el-form-item>                   
                        <el-form-item label="性别" prop="sex">
                            <el-select v-model="postData.sex" placeholder="请选择">
                                <el-option label="男" value="M"></el-option>
                                <el-option label="女" value="F"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="简介" prop="desc">
                        <wang-editor @change-content="changeEdiorContent" :detailContent="contentDetail" :onload="onload" :uploadUrl="uploadUrl"></wang-editor>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="comfirmAdd">确定</el-button>
                            <el-button>取消</el-button>
                            <el-button type="danger" @click="resetField">重置</el-button>  
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            
        </div>
        
    </div>
</template>

<script>
import { checkRegex} from '@/data/common';
import Editor from 'components/WangEditor/Editor.vue';
export default {
    name: 'AddUser',
    components: {
        'wang-editor': Editor
    },
    data(){
        let checkMobile = (rule , value , callback) => {
            if(!checkRegex(value , 'mobile') && value != ''){
                callback(new Error('请输入正确的手机号'));
            }
            callback();
        };
        let checkEmail = (rule , value , callback) =>  {
            if(!checkRegex(value , 'email') && value != ''){
                callback(new Error('请输入正常的邮箱'))
            }
            callback();
        };
        return{
            uploadUrl: '/user/upload-avatar',
            contentDetail: '',
            onload: false,
            postData: {

            },
            rules: {
                username: [
                    { required: true , message: '用户名不能为空' , trigger: 'blur' },
                    { min: 4 , max: 8 , message: '长度在 4 到 8 个字符' , trigger: 'blur' }
                ],
                realname: [
                    { required: true , message: '真实姓名不能为空' , trigger: 'blur'}
                ],
                email: [
                    { required: true , message: '邮箱不能为空' , trigger: 'blur' },
                    { validator: checkEmail , trigger: 'blur' }
                ],
                mobile: [
                    { required: true , message: '手机号不能为空' , trigger: 'blur' },
                    { validator: checkMobile , trigger: 'blur' }
                ],
                sex: [
                    { required: true , message: '性别不能为空' , trigger: 'change' }
                ]
            }
        }
    },
    created(){
        setTimeout(() => {
            this.onload = true;
        }, 300);
    },
    methods: {
        comfirmAdd(){
            console.log(this.postData);
            let submit = true;
            this.$refs.form.validate(valid => {
                submit = valid;
            });
            if(submit){
                //TODO: 请求后端添加用户接口
                console.log(this.postData);
            }
        },
        resetField(){
            this.$refs.form.resetFields();
        },
        changeEdiorContent(val){
            this.postData.desc = val;
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