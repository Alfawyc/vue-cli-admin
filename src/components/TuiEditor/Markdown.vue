<template>
    <div>
        <div id="editSection"></div>
        <el-input type="textarea" id="editSection"></el-input>
    </div>
</template>

<script>
var Editor = require('tui-editor');
// import Editor from 'tui-editor';
export default {
    name: 'Markdown',
    data(){
        return{

        }
    },
    mounted(){
        this.createEditor();
    },
    methods: {
        createEditor(){
            const editor = new Editor({
                el: document.querySelector('#editSection'),
                initialEditType: 'markdown',
                previewStyle: 'vertical',
                height: '300px'
            });
        
        }
    }
}
</script>

<style lang="less" scoped>

</style>