<template>
    <div class="fillcontain">
        <div class="contain">
            <el-table border :data="post" style="100%">
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="状态" prop="status"></el-table-column>
                <el-table-column label="摘要" prop="summary" show-overflow-tooltip></el-table-column>
                <el-table-column label="url" prop="path"></el-table-column>
                <el-table-column label="允许评论" prop="allow_comment"></el-table-column>
                <el-table-column label="评论数" prop="comment_num"></el-table-column>
                <el-table-column label="是否公开" prop="is_public"></el-table-column>
                <el-table-column label="创建人" prop="user"></el-table-column>
                <el-table-column label="创建时间" prop="create_time">
                    <template slot-scope="scope">
                        {{ scope.row.create_time|timeFilter }}
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" prop="update_time"></el-table-column>
            </el-table>
            <paginate :to-page="toPaga" @from-page="fromPage"></paginate>
        </div>
    </div>
</template>

<script>
import paginate from 'components/Paginate.vue';
export default {
    name: 'Post',
    components:{
        paginate: paginate
    },
    data(){
        return{
            post: [],
            toPaga:{
                currentPage: 1,
                totalCount: 0,
                perpage: 1
            },
            searchParams: {
                page: 1
            }
        }
    },
    created(){
        this.getPost();
    },
    methods:{
        getPost(){
            _api.get('/admin/post-list' , this.searchParams).then((res) => {
                if(res.code != 0){
                    _g.toastMsg(res.message)
                    return false;
                }
                this.post = res.data;
            });
        },
        fromPage(val){
            console.log(val)
        },
        timeFormat(row , column){
            let d = new Date(row.create_time);
            return d.getFullYear()
        }
    }
}
</script>

<style lang="less" scoped>

</style>