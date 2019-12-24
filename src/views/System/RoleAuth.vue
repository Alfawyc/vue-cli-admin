<template>
    <div class="fillcontain">
        <div class="info_container">
            <el-row class="info_row row" :gutter="10">
                <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="demo-ruleForm"> 
                    <el-col :span="8">
                        <el-form-item label="角色名称" prop="username">
                        <el-input v-model="form.name" placeholder="角色名称"></el-input>
                        </el-form-item>                    
                    </el-col>
                    <el-col>
                        <el-form-item label="角色权限" prop="desc">
                            <el-tree :props="props" show-checkbox :data="treeData" @check-change="handleCheckChange" :default-checked-keys="defaultAuthKey" ref="tree" node-key="id"></el-tree>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="confirm">确定</el-button>
                            <el-button>取消</el-button>
                            <el-button type="danger" >重置</el-button>  
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RoleAuth',
    data(){
        return {
            rules: {},
            form: {},
            treeData: [],
            props: {
                label: 'name',
                children: 'children'
            },
            defaultAuthKey : []
        }
    },
    created(){
        this.getPrermission();
    },
    methods: {
        getPrermission(){
            _api.get('/system/permission-list').then((res) => {
                if(res.code != 0){
                    this.treeData = [];
                    return false;
                }
                this.treeData = res.data
            });
        },
        handleCheckChange(data, checked, indeterminate){
            //console.log(data, checked, indeterminate);
        },
        confirm(){
            let ckeckKey = this.$refs.tree.getCheckedKeys();
            let halfCheck = this.$refs.tree.getHalfCheckedKeys();
            let allCheck = ckeckKey.concat(halfCheck)
            console.log(allCheck);
        }
    }
}
</script>

<style lang="less" scoped>
.mart10{
    margin-top: 10px;
}
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