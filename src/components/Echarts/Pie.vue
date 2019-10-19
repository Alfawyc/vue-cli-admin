<template>
    <div>
        <div id="pie-chart"></div>
    </div>
</template>

<script>
// 引入 ECharts 主模块
// var echarts = require('echarts/lib/echarts');
import echarts from 'echarts';//完整
/* require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend'); */
export default {
    data() {
        return {
            width: 450,
            height: 450
        };
    },
    props: {
        pieId: {
            type: String,
            default: 'echartsPie'
        },
        option: {
            type: Object,
            default() {
                return {
                    
                };
            }
        },
        color : {
            type : Array,
            default() {
                return ['#5AB6E5', '#FF9800', '#8BC34A', '#259B24'];
            }
        }
    },
    mounted() {
        this.createCharts();
    },
    methods: {
        createCharts() {
            var element = document.getElementById('pie-chart');
            element.style.width = this.width + 'px';
            element.style.height = this.width + 'px';
            var myChart = echarts.init(document.getElementById('pie-chart'));
            var option = {
                title : {
                    text: '资金来源分析',
                    subtext: '纯属虚构',
                    x:'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series: [
                    {
                        type: 'pie',
                        data: this.option.data,
                        radius : '55%',
                        center : ['50%' , '60%'],
                    }
                ]
            };
            myChart.setOption(option);
        }
    }
};
</script>
