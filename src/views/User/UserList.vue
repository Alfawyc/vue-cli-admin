<template>
    <div class="fillcontain">
        <div class="contain">
            <div class="table_container">
                <el-table :data="userList"  border style="width: 100%">
                    <el-table-column prop="date" label="日期"></el-table-column>
                    <el-table-column prop="email" label="邮箱地址"></el-table-column>
                    <el-table-column prop="address" label="注册地址"></el-table-column>
                    <el-table-column prop="ip" label="IP地址"></el-table-column>
                    <el-table-column prop="create_time" label="注册时间"></el-table-column>
                    <el-table-column prop="login_time" label="登录时间"></el-table-column>
                </el-table>
                <paginate :toPage="toPaga"></paginate>
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
            userList: [
                {
                    date: '2019-10-17',
                    email: 'alfa.wang@foxmail.com',
                    address: '广州',
                    ip: '192.168.0.4',
                    create_time: '2019-10-17 22:00:00',
                    login_time: '2019-10-17 22:05:00'
                }
            ],
            toPaga: {
                currentPage: 1,
                totalCount: 0,
                perpage: 1
            }
        }
    },
    created(){

    },
    methods: {

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
</style>