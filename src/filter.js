import Vue from 'vue';

export default(function(){
    Vue.filter("sexFilter" , function(val){
        return val == 'M' ? '男' : '女';
    })
})();