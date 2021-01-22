<template>
    <div>
        <input type="textarea" id="simple" @toggleFullScreen="screenChage">
    </div>
</template>

<script>
import 'simplemde/dist/simplemde.min.css';
var VueSimplemde =  require('simplemde/dist/simplemde.min.js');
export default {
    name: 'SimpleMde',
    data(){
        return {
            content: '',
        }
    },
    // created 和mounted 的区别
    mounted(){
        this.createdMde();
    },
    methods: {
        createdMde(){
            var simplemde = new VueSimplemde({
                element: document.getElementById("simple"),
            });
        },
        screenChage(){
            console.log(1111);
        }
        
    }
}
</script>

<style lang="less" scoped>
@import '~simplemde/dist/simplemde.min.css';
</style>