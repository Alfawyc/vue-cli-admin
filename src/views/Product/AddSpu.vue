<template>
    <div class="fillcontain">
        <div class="contain">
            <el-row class="info_row row" :gutter="10">
                <el-form ref="form" :rules="rules" :model="spuData" label-width="80px" class="demo-ruleForm"> 
                    <el-col :span="16">
                        <el-form-item label="产品名称" prop="spu" required>
                            <el-input v-model="spuData.spu" placeholder="请输入产品名称"></el-input>
                        </el-form-item>                    
                    </el-col>
                    <el-col>
                        <el-form-item label="属性" prop="attr" required>
                            <el-select v-model="spuData.attr" multiple collapse-tags placeholder="请选择">
                                <el-option v-for="item in attrOption" :key="item.value" :label="item.name"  :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item>
                            <el-button type="primary" @click="comfirmAdd">确定</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddSpu',
    data(){
        return {
            spuData: {
                spu: '',
                attr: []
            },
            rules: {
                spu: [
                    { required: true , message: '请输入spu产品名称' , trigger: 'blur' },
                    { max: 255 , message: 'spu名称长度超出限制' , trigger: 'blur' }
                ],
                attr: [
                    { required: true , message: '请选择属性' , trigger: 'change' }
                ]
            },
            attrOption: [
                { name: '内存' , value: 1 },
                { name: '颜色' , value: 2 },
                { name: '关盘类型', value: 3 }
            ]
        }
    },
    created(){

    },
    methods: {
        comfirmAdd(){
            console.log(this.spuData);
        }   
    }
}
</script>

<style lang="less" scoped>

</style>