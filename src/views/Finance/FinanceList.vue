<template>
    <div class="fillcontain">
        <div class="contain">
            <div class="marb10">
                <el-button type="primary" @click="dialogVisible = true"><i class="el-icon-plus"></i>添加记录</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%" border>
                <el-table-column prop="type" label="类型"></el-table-column>
                <el-table-column prop="amount" label="金额"></el-table-column>
                <el-table-column prop="date" label="添加时间"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column prop="operation" label="操作"></el-table-column>
            </el-table>
        </div>
        <el-dialog title="新增明细" :visible.sync="dialogVisible">
            <el-form :model="addForm" label-width="80px" ref="ruleForm" :rules="rules">
                <el-form-item label="类型"  required>
                    <el-radio-group v-model="addForm.type" prop="type">
                        <el-radio :label="item.value" v-for="item in typeRadio" :key="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="金额" required prop="amount">
                    <el-input-number v-model="addForm.amount" :precision="2" :step="0.01"></el-input-number>
                </el-form-item>
                <el-form-item label="备注" required prop="remark">
                    <el-input v-model="addForm.remark" maxlength="200" placeholder="请添加备注"></el-input>
                </el-form-item>
                <el-form-item label="时间" prop="date">
                    <el-date-picker v-model="addForm.date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="comfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'FinanceList',
    data(){
        return {
            tableData: [],
            dialogVisible: false,
            addForm: {
                type: 1,
                amount: '',
                remark: '',
                date: ''
            },
            typeRadio: [
                { value: 1, name: '支出' },
                { value: 2, name: '收入'}
            ],
            rules: {
                type: [
                    { required: true, message: '请选择类型' , trigger: 'change' }
                ],
                amount: [
                    { required: true, message: '请输入金额' , trigger: 'blur' },
                ],
                remark: [
                    { required: true, message: '请添加备注' , trigger: 'blur' }
                ],
            }
        }
    },
    created(){

    },
    methods: {
        comfirm(){
            let submit = true;
            this.$refs.ruleForm.validate((valid) => {
                console.log(valid);
                if(!valid){
                    submit = valid;
                    return false;
                }
            });
            if(submit){
                //请求接口
                this.dialogVisible = false;
                _g.toastMsg('success' , '添加成功' , 1500 , () => {
                    this.tableData.push(this.addForm);
                });
                
                
            }
            
            
        }
    }
}
</script>

<style lang="less" scoped>

</style>