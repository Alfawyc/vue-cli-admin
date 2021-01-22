<template>
    <div>
        <div ref="editor" class="text-left" v-loading="imageLoading">
        </div>
    </div>
</template>

<script>
import E from 'wangeditor';
export default {
    name: 'Editor',
    data(){
        return {
            content : '',
            imageLoading : false,
        }
    },
    props: {
        uploadUrl: {
            type: String,
            default: '/upload'
        },
        detailContent: {
            type: String,
            default: '',
        },
        onload: {
            type: Boolean,
            default: false,
        }
    },
    created(){
        
    },
    mounted(){
        this.createEditor();
    },
    methods: {
        createEditor(){
            let that = this;
            var editor = new E(this.$refs.editor);
            editor.customConfig.uploadImgServer = this.uploadUrl;  // 上传图片到服务器
            editor.customConfig.uploadImgMaxLength = 5; //限制一次上传图片数量限制,默认10000(即不限制)
            editor.customConfig.zIndex = 1; //设置z-index
            editor.customConfig.uploadFileName = 'file';
            editor.customConfig.uploadImgParams = {
                'X-XSRF-TOKEN': this.csrfToken, //添加csrf-token
            }
            //上传图片设置
            editor.customConfig.uploadImgHooks = {
                //图片上传前触发
                before(xhr , editor , files){
                    that.imageLoading = true;
                    console.log(that.imageLoading);
                    
                },
                //图片上传并返回结果,图片插入成功后触发
                success(xhr , editor , files){
            
                },
                //图片上传返回结果,但图片插入错误触发
                fail(xhr , editor , files){
                   
                },
                //图片上传出错时触发
                error(xhr , editor){
                    
                },
                //图片上传超时触发
                timeout(){
                    
                },
                //上传成功插入图片
                customInsert(insertImg, result, editor){
                    that.imageLoading = false;
                    var url = result.data.url;
                    insertImg(url);
                }
            }
            //自定义错误消息提示
            editor.customConfig.customAlert = function (info) {
                that.imageLoading = false;
                _g.toastMsg('error' , info , 1500);
                return false;
            }
            //onchange
            editor.customConfig.onchange = (html) => {
                this.changeContent(html);
            }
            editor.create();
            editor.txt.html(that.detailContent);//初始化设置内容
        },
        changeContent(html){
            this.$emit('change-content' , html);
        },
        uploadError(xhr, editor){
            _g.toastMsg('error' , '图片上传错误' , 1500);
            return false;
        }
    },
    computed: {
        csrfToken(){
            return _g.getXsrfToken();
        }
    }
}
</script>

<style lang="less" scoped>
.text-left{
    text-align: left;
}
</style>