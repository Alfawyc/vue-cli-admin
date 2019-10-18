<template>
    <div>
        <div id="pie-chart"></div>
    </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
export default {
    data() {
        return {
            width: 300,
            height: 300
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
                color: this.color,
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                series: [
                    {
                        type: 'pie',
                        data: this.option.data,
                        center : ['80%' , '60%'],
                    }
                ]
            };
            myChart.setOption(option);
        }
    }
};
</script>
