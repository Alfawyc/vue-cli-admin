<template>
    <div>
        <div id="bar-negative"></div>
    </div>
</template>

<script>
var echarts = require('echarts/lib/echarts');
/* require('echarts/lib/chart/pictorialBar');
require('echarts/lib/chart/pie'); */
require('echarts/lib/chart/bar');
/* require('echarts/lib/chart/boxplot');
require('echarts/lib/chart/line');
require('echarts/lib/chart/lines');
require('echarts/lib/chart/parallel');
require('echarts/lib/chart/sankey');
require('echarts/lib/chart/scatter');
require('echarts/lib/chart/sunburst');
require('echarts/lib/chart/candlestick');
require('echarts/lib/chart/candlestick');
require('echarts/lib/chart/themeRiver');
require('echarts/lib/chart/tree');
require('echarts/lib/chart/treemap');
require('echarts/lib/chart/chord');
require('echarts/lib/chart/custom'); */

//引入提示框
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/grid');
require('echarts/lib/component/axisPointer');
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
            type: Object,
            default(){
                return {
                    
                }
            }
        }
    },
    mounted() {
        this.createCharts();
    },
    methods: {
        createCharts(){
            this.$nextTick(() => {
                let myChart = echarts.init(document.getElementById('bar-negative'));
                console.log(myChart);
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        legend: {
                            data:this.legend
                        },
                        //TODO:左右间距,修改为pops传值
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
                        series: [
                            this.analysisData
                        ]
                    }
                };
                myChart.setOption(option);
                console.log(this.axisData);
            });
            
        }
    }
}
</script>

<style lang="less" scoped>

</style>