<template>
    <div>
        <div id="bar-negative" :style="{width: '1200px', height: '500px'}"></div>
    </div>
</template>

<script>
//按需引入
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
//引入提示框
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/grid');
require('echarts/lib/component/axisPointer');
// echats div必须制定宽高
export default {
    data(){
        return {

        }
    },
    props: {
        width: {
            type: Number,
            default: 600,
        },
        height: {
            type: Number,
            default: 400
        },
        legend: {
            type: Array,
            default: ['利润' , '收入' , '支出']
        },
        axisData: {
            type: Array,
            default: ['周一','周二','周三','周四','周五','周六','周日']
        },
        analysisData: {
            type: Array,
            default: []
        }
    },
    mounted() {
        this.createCharts();
    },
    methods: {
        createCharts(){
            var myChart = echarts.init(document.getElementById('bar-negative'));
            var option = {
                title : {
                    text: '每周利润分析',
                    subtext: '纯属虚构',
                    x:'left'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:this.legend
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'value'
                    }
                ],
                yAxis : [
                    {
                        type : 'category',
                        axisTick : {show: false},
                        data : this.axisData
                    }
                ],
                series : this.analysisData
            };
            myChart.setOption(option);
        }
    }
}
</script>