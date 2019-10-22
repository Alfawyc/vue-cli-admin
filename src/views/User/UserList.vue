<template>
    <div class="fillcontain">
        <div class="contain">
            <div class="table_container">
                <el-button type="primary" class="marb10" @click="jumpTo('/user-manage/add-user')">新增用户</el-button>
                <el-table :data="userList" border style="100%" v-loading="loading">
                    <el-table-column prop="nickname" label="用户名"></el-table-column>
                    <el-table-column prop="name" label="真实姓名"></el-table-column>
                    <el-table-column prop="email" label="邮箱地址"></el-table-column>
                    <el-table-column prop="address" label="注册地址"></el-table-column>
                    <el-table-column prop="ip" label="IP地址"></el-table-column>
                    <el-table-column prop="create_time" label="注册时间"></el-table-column>
                    <el-table-column prop="login_time" label="登录时间"></el-table-column>
                </el-table>
                <paginate :toPage="toPaga" :from-page="fromPage"></paginate>
            </div>
        </div>
    </div>
</template>

<script>
import paginate from 'components/Paginate.vue';
export default {
    name : 'UserList',
    components:{
        paginate: paginate
    },
    data(){
        return {
            userList: [ ],
            toPaga: {
                currentPage: 1,
                totalCount: 0,
                perpage: 1
            },
            loading : true,
        }
    },
    created(){
        this.getUserList();
    },
    methods: {
        fromPage(){
            console.log('form-page');
        },
        jumpTo(path , query = {}){
            this.$router.push({ path: path , query: query });
        },
        getUserList(){
            setTimeout(() => {
                this.loading = false;
            }, 2000);
            let fakeData = Mock.mock({
                'array|10': [
                    {
                        'nickname' : '@first',
                        'name' : '@cname',
                        'email' : '@email',
                        "age|18-28": 0,
                        'date' : '@date("yyyy-MM-dd")',
                        'address' : '@city(true)',
                        'ip' : '@ip',
                        'create_time' : '@datetime("yyyy-MM-dd HH:mm:ss")',
                        'login_time' : '@datetime("yyyy-MM-dd HH:mm:ss")',
                    }
                ]
            });
            let data = fakeData.array;
            this.toPaga.totalCount = data.length * 15;
            this.toPaga.perpage = 10
            this.userList = fakeData.array;
    
            
        }
    }
}
</script>

<style lang="less" scoped>
.fillcontain{
    padding-bottom: 0;
}
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
</style>