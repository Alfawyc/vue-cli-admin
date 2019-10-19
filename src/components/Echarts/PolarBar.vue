<template>
    <div>
        <div id="ploar-bar" :style="{width: '500px', height: '500px'}"></div>
    </div>
</template>

<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
export default {
    name: 'PolarBar',
    data(){
        return{
            width: 500,
            height: 500
        }
    },
    props:{
        radiusData: {
            type: Array,
            default: []
        },
        seriesData: {
            type: Array,
            default: []
        },
        legend: {
            type: Object,
            default() {
                return{
                    
                }
            }
        }
    },
    mounted(){
        this.createCharts();
    },
    methods: {
        createCharts(){
            var myChart = echarts.init(document.getElementById('ploar-bar'));
            var option = {
                angleAxis: {
                },
                radiusAxis: {
                    type: 'category',
                    data: this.radiusData,
                    z: 10
                },
                polar: {
                },
                series: this.seriesData,
                legend: this.legend
            };
            myChart.setOption(option);
        }
    }
}
</script>

<style lang="less" scoped>

</style>