<template>
    <div class="fillcontain">
        <div class="contain">
            <el-page-header class="marb20" @back="goBack" content="添加SPU" title="返回">
            </el-page-header>
            <el-row class="info_row row" :gutter="10">
                <el-form ref="form" :rules="rules" :model="spuData" label-width="80px" class="demo-ruleForm"> 
                    <el-col :span="16">
                        <el-form-item label="产品名称" prop="spu" required>
                            <el-input v-model="spuData.spu" placeholder="请输入产品名称"></el-input>
                        </el-form-item>                    
                    </el-col>
                    <el-col>
                        <el-form-item label="属性" prop="attr" required>
                            <el-select v-model="spuData.attr" multiple collapse-tags placeholder="请选择" size="medium" filterable>
                                <el-option v-for="item in attrOption" :key="item.id" :label="item.name"  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="产品来源" prop="source">
                            <el-select v-model="spuData.source" placeholder="请选择" clearable size="medium">
                                <el-option v-for="(item , key) in source" :key="key" :value="item.value" :label="item.name"></el-option>
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
import { attr } from '@/data/attr.js';
export default {
    name: 'AddSpu',
    data(){
        return {
            spuData: {
                spu: '',
                attr: [],
                source: ''
            },
            source: [
                    { name: '现货款' , value: 1 },
                    { name: '虚拟款' , value: 2 }
            ],
            attrOption: attr,
            rules: {
                spu: [
                    { required: true , message: '请输入spu产品名称' , trigger: 'blur' },
                    { max: 255 , message: 'spu名称长度超出限制' , trigger: 'blur' }
                ],
                attr: [
                    { required: true , message: '请选择属性' , trigger: 'change' }
                ]
            }
        }
    },
    created(){

    },
    methods: {
        comfirmAdd(){
            this.$refs.form.validate((valid) => {
                if(!valid){
                    return false
                }
                _g.toastMsg('success' , '添加SPU产品成功' , 1500 , () => {
                    this.goBack();
                });
            });
        },
        goBack(){
            router.go(-1)
        }   
    }
}
</script>

<style lang="less" scoped>

</style>