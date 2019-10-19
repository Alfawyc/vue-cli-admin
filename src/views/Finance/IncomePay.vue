<template>
    <div class="fillcontain">
        <div class="fillcontainer">
            <el-row :gutter="10">
                <el-col :span="12" style="height:100%">
                    <div class="chart">
                        <polar-bar v-if="show" :lengend="polarLegend" :radius-data="radiusData" :series-data="seriesData"></polar-bar>
                    </div>
                </el-col>
                <el-col :span="12" style="height:100%">
                    <div class="chart">
                        <pie :option="option" v-if="showPie"></pie>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
    
</template>

<script>
import pie from 'components/Echarts/Pie.vue';
import PolarBar from 'components/Echarts/PolarBar.vue';
export default {
    name: 'IncomePay',
    components: {
        'pie': pie,
        'polar-bar': PolarBar
    },
    data(){
        return{
            showPie: false,
            show : false,
            legend: [],
            yAxisData: [],
            analysisData: [],
            option: {
                data: [
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ]
            },
            //polar-bar
            polarLegend: {
                show: true,
                data: []
            },
            radiusData: [],
            seriesData: []
        }
    },
    created(){
        setTimeout(() => {
            this.showPolarBar();
            this.showPie = true;
            this.show = true;
        }, 500);
    },  
    methods: {
        showPolarBar(){
            this.polarLegend = {
                show: true,
                data: ['储蓄', '基金', '股票','债券','期货']
            }
            this.radiusData = ['2011年', '2012年', '2013年', '2014年', '2015年', '2016年', '2017年'];
            this.seriesData = [
                {
                    type: 'bar',
                    data: [80, 20, 30, 40, 70, 50, 10],
                    coordinateSystem: 'polar',
                    name: '储蓄',
                    stack: 'a'
                }, 
                {
                    type: 'bar',
                    data: [60, 40, 60, 10, 30, 20, 10],
                    coordinateSystem: 'polar',
                    name: '基金',
                    stack: 'a'
                },
                {
                    type: 'bar',
                    data: [10, 80, 30, 40, 50, 20, 50],
                    coordinateSystem: 'polar',
                    name: '股票',
                    stack: 'a'
                },
                {
                    type: 'bar',
                    data: [60, 20, 10, 80, 30, 20, 50],
                    coordinateSystem: 'polar',
                    name: '债券',
                    stack: 'a'
                }, 
                {
                    type: 'bar',
                    data: [90, 20, 10, 40, 10, 20, 50],
                    coordinateSystem: 'polar',
                    name: '期货',
                    stack: 'a'
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.chart {
    position: relative;
    width: 96%;
    height: 530px;
    padding: 10px;
    border-radius: 10px;
}
</style>