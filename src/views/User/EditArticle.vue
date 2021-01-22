<template>
    <div class="fillcontain">
        <div class="info_container">
            <el-row class="info_row row" :gutter="10">
                <el-form ref="form" :rules="rules" :model="articleData" label-width="80px" class="demo-ruleForm">
                    <el-col>
                        <el-form-item label="简介" prop="desc">
                            <mark-down></mark-down>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="comfirmAdd">确定</el-button>
                            <el-button type="danger">重置</el-button>  
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
        </div>
        
    </div>
</template>

<script>
// import SimpleMde from 'components/SimpleMde/SimpleMde.vue';
import Markdown from 'components/TuiEditor/Markdown.vue';

export default {
    name: 'EditArticle',
    components: {
        // 'simple-mde': SimpleMde,
        'mark-down' : Markdown
    },
    data(){
        return {
            rules: {

            },
            articleData: {

            }
        }
    },
    created(){
        
    },
    methods: {
        comfirmAdd(){
            console.log('=====');
        }
    }
}
</script>

<style lang="less" scoped>
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