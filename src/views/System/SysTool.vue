<template>
    <div class="fillcontain">
        <div class="contain">
            <el-alert title="在线反序列化生成json和代码工具" type="warning" description="反序列化生成json和代码" show-icon :closable="false">
            </el-alert>
            <el-tabs type="border-card" v-model="activeName" class="mart10">
                <el-tab-pane name="first" label="原始数据">
                    <span>原始数据</span>
                    <span class="mar10">
                        <el-button type="primary" @click="confirm">反序列化</el-button>
                        <el-button type="danger" @click="content = '' ">清空结果</el-button>
                    </span>
                    <el-input class="mart10" type="textarea" :rows="10" placeholder="请输入内容" v-model="content">
                    </el-input>
                </el-tab-pane>
                <el-tab-pane name="second" label="反序列化">    
                    <wang-editor @change-content="changeEdiorContent" :detailContent="contentDetail" :onload="onload" :uploadUrl="uploadUrl"></wang-editor>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Editor from 'components/WangEditor/Editor.vue';
export default {
    name: 'Tool',
    components: {
        'wang-editor': Editor
    },
    data(){
        return {
            activeName: 'first',
            content: '',
            result: '',
            uploadUrl: '',
            onload: false,
            contentDetail: '',
        }
    },
    created(){
        
    },
    methods: {
        confirm(){
            _api.get('/admin/analyze' , { content: this.content }).then(res => {
                if(res.code != 0){
                    return false;
                }
                this.onload = true;
                this.result = res.data;
                this.contentDetail = '1111'
                console.log(this.contentDetail);
            });
        },
        changeEdiorContent(val){
            this.contentDetail = val;
        }
    }
}
</script>

<style lang="less" scoped>
.mart10 {
    margin-top: 10px;
}
.mar10 {
    margin: 10px;
}
</style>