<template>
    <div class="fillcontain">
        <div class="fillcontainer">
            <bar-negative :legend="legend" :axis-data="yAxisData" :analysis-data="analysisData" v-if="show"></bar-negative>
        </div>
    </div>
</template>

<script>
import BarNegative from 'components/Echarts/BarNegative.vue';
export default {
    name: 'FinanceAnalysis',
    components: {
        'bar-negative': BarNegative
    },
    data(){
        return{
            show : false,
            legend: [],
            yAxisData: [],
            analysisData: [],
        }
    },
    created(){
        setTimeout(() => {
            this.shownNeg();
            this.show = true;
        }, 500);
    },
    methods: {
        shownNeg(){
            this.legend = ['赚的' , '收的' , '花的'];
            this.yAxisData = ['Mon.','Tues.','Wed.','Thur.','Fri.','Sat.','Sun.'];
            this.analysisData = [
                {
                    name:'赚的',
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
                    name:'收的',
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
                    name:'花的',
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
        }
    }
}
</script>

<style lang="less" scoped>

</style>