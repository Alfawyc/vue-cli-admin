<template>
    <div>
      <el-button type="info" @click="apiRequest">api请求</el-button>
    </div>
</template>

<script>
export default {
  name : 'About',
  data(){
    return {
      
    }
  },
  created(){

  },
  methods : {
    apiRequest(){
      console.log('跨域请求');
      _api.get('/test' , { name : 'vue' }).then(res => {
        if(res.code != 0){
          _g.toastMsg('error' , res.message , 1500 , () => {
            console.log('请求失败');
          });
          return flase;
        }
        _g.toastMsg('success' , '请求成功' , 1500 , () => {
          console.log(res);
        });
      });
    }
  }
}
</script>

<style scoped>

</style>


