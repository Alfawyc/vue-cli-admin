<template>
    <div class="fillcontain">
        <div class="fillcontainer">
            123333
            <el-button @click="showBar">显示图片</el-button>
            <el-button @click="shownNeg">显示图片222</el-button>
            <pie :option="option" v-if="showPie"></pie>
            <bar-nagetive v-if="show" :legend="legend" :axis-data="yAxisData"></bar-nagetive>    
        </div>
    </div>
    
</template>

<script>
import BarNegative from 'components/Echarts/BarNegative.vue';
import pie from 'components/Echarts/Pie.vue';
export default {
    name: 'IncomePay',
    components: {
        'bar-nagetive': BarNegative,
        'pie': pie
    },
    data(){
        return{
            showPie: false,
            show : false,
            legend: [],
            yAxisData: [],
            analysisData: [],
            option: {
                data: []
            }
        }
    },
    created(){
        console.log(11111)
    },  
    methods: {
        showBar(){
            console.log('show');
            this.option.data = [
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ];
            setTimeout(() => {
                this.showPie = true;
                console.log('初始化');
            }, 500);
        },
        shownNeg(){
            this.legend = ['利润' , '收入' , '支出'];
            this.yAxisData = ['Mon','Wen','Tue','Thur','Fri','Sat','Sun'];
            this.analysisData = [
                {
                    name:'利润',
                    type:'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data:[200, 170, 240, 244, 200, 220, 210]
                },
                {
                    name:'收入',
                    type:'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    data:[320, 302, 341, 374, 390, 450, 420]
                },
                {
                    name:'支出',
                    type:'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'left'
                        }
                    },
                    data:[-120, -132, -101, -134, -190, -230, -210]
                }
            ];
            setTimeout(() => {
                this.show = true;
                console.log('初始化');
            }, 500);
        }
    }
}
</script>

<style lang="less" scoped>

</style>