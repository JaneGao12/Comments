<template>
    <div class="chart_con">
        <div class="chart_03">
			<div class="title"><b></b>来源分布</div>
			<div id="charts" style="width: 100%;height:230px; margin-top: -30px;"></div>
		</div>
    </div>
    
</template>
<script> 
 
export default {
    name:'PostSource', 
    props:{
        sourceList:Array
    },
    watch:{
        sourceList(){
            // console.log(this.sourceList);
            this.initChart()
        }
    },
    methods:{
        initChart(){
            var myChart = this.$echarts.init(document.getElementById('charts'));
            var option = { 
                color: ['#ffd051', '#44b1ef', '#f03d52', '#19bf82'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                }, 
                legend: {
                    orient: 'horizontal',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    },
                    bottom:0, 
                },
                grid:{
                    left:'5%',
                    right:'5%',
                    bottom:'15%',
                    top:'0',
                    containLabel:true
                }, 
                series: [
                    {
                        name: '发帖来源分布：',
                        type: 'pie',
                        radius: '55%',
                        avoidLabelOverlap: false,
                        // label: {
                        //     show: true,
                        //     position: 'inside',
                        //     formatter: (params) => {
                        //         return `${params.percent}%`
                        //     }
                        // },
                        emphasis: {
                            itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                            label: {
                                show: true,
                                fontSize: '16',
                                fontWeight: 'bold'
                            }
                        },
                        // labelLine: {
                        //     show: false
                        // },
                        data: this.sourceList
                    }
                ]
            };
            myChart.setOption(option);
        }
    },
    mounted(){  
        window.onresize = () => {  
            this.initChart() //重新调用 实现自适应宽度
            this.$echarts.init(document.getElementById('charts')).resize();
        }
    }   
}
</script>
<style lang="scss" scoped>

</style>