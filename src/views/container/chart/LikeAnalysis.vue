<template>
    <div class="chart_con">
        <div class="chart_02">
				<div class="title"><b></b>点赞分析</div>
				<div class="box demo2">
					<ul class="tab_menu">
						 <li class="current">天</li>
						 <!-- <li class="">月</li> -->
					</ul>
					<div class="tab_box">
						<div class="con">
							<div id="charts05" style="width: 100%;height:200px;"></div>
						</div>
						<div class="con hide">
							<div id="charts06" style="width: 100%;height:200px;"></div>
						</div>
					</div>
				</div>
			</div>
    </div>
    
</template>
<script> 
import { showTabs } from '../../../common/showTabs';
export default {
    name:'LikeAnalysis',  
    props:{
        likeFileData:Object
    },
    watch:{
        likeFileData(){
            this.initChart()
        }, 
    },
    methods:{
        initChart(){
            $("#charts05").css('width',$(".tab_box").width());
            $("#charts06").css('width',$(".tab_box").width());
            var myChartB = this.$echarts.init(document.getElementById('charts05'));
            var myChartC = this.$echarts.init(document.getElementById('charts06'));
            var option = {
                //backgroundColor: '#01004C',
                title: {

                },
                tooltip: {
                    //trigger: 'axis'
                },
                legend: {
                    data: ['总量', '正向', '反向'],
                    textStyle: {
                        color: '#fff'
                    },
                    bottom:0,
                },
                grid:{
                    left:'5%',
                    right:'5%',
                    bottom:'15%',
                    top:'5%',
                    containLabel:true
                }, 
                calculable: true,
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data:this.likeFileData.dataX,
                    //网格样式
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: '#002482',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#ffffff", //X轴文字颜色
                            fontSize: 12,
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#0046ff"
                        },
                    },
                }],
                yAxis: [{
                    type: 'value',
                    //网格样式
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: '#002482',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLabel: {
                        formatter: '{value} ',
                        color: '#ffffff',
                        textStyle: {
                            fontSize: 12
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#0046ff"
                        },
                    },
                }],
                series: [ 
                    {
                        // name: '反向',
                        type: 'line',
                        data: this.likeFileData.dataY,
                        lineStyle: {
                            normal: {
                                width: 1,
                                color: {
                                    type: 'linear',
                    
                                    colorStops: [{
                                        offset: 0,
                                        color: '#e44747' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#e44747' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                                
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#7597EB',
                                borderWidth: 1,
                                borderColor: "#e44747"
                            }
                        },
                    }
                ]
            };
            
            myChartB.setOption(option);
            myChartC.setOption(option); 
        }
    },
    mounted(){ 
        showTabs() 
    }   
}
</script>
<style lang="scss" scoped>

</style>