<template>
    <div class="chart_con">
        <div class="chart_02">
			<div class="title"><b></b>时间段分布</div>
            <!-- <div v-if="this.sentFileDistribution.length==0" class="emptyValue">暂无数据~</div> -->
			<div id="charts09" style="width: 100%;height:230px; margin-top: -30px;"></div>
		</div>
    </div>
    
</template>
<script> 
 
export default {
    name:'TextList',  
    props:{
        sentFileDistribution:Array
    },
    watch:{
        sentFileDistribution(){
            this.initChart()
        }
    },
    methods:{
        initChart(){
            var myChart9 = this.$echarts.init(document.getElementById('charts09'));
            var option = { 
                color: ['#44b1ef','#ffd051', '#f03d52', '#19bf82','#0046ff','#FFFFCC','#009966','#CC6633','#996600','#336633','#999999','#99FF66'],
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
                        name: '发帖时间分布：',
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
                        data: this.sentFileDistribution
                    }
                ]
            };
            myChart9.setOption(option);
        }
    },
    mounted(){ 
        window.onresize = () => {  
            this.initChart() //重新调用 实现自适应宽度
            this.$echarts.init(document.getElementById('charts09')).resize();
        }
    }   
}
</script>
<style lang="scss" scoped>

</style>