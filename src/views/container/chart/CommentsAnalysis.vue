<template>
    <div class="chart_con">
        <div class="chart_01">
				<div class="title"><b></b>态势分析</div>
				<div class="box demo1">
					<ul class="tab_menu">
						 <li class="current">天</li>
						 <!-- <li class="">月</li> -->
					</ul>
					<div class="tab_box">
						<div class="con">
							<div id="charts03" style="width: 100%;height:200px;"></div>
						</div>
						<div class="con hide">
							<div id="charts04" style="width: 100%;height:200px;"></div>
						</div>
					</div>
				</div>
			</div>
    </div>
    
</template>
<script> 
import { showTabs } from '../../../common/showTabs';
export default {
    name:'CommentsAnalysis', 
    props:{
        commentAnalysis:Object
    },
    watch:{
        commentAnalysis(){ 
            this.initChart() 
        }
    },
    methods:{
        initChart(){
            $("#charts03").css('width',$(".tab_box").width());
            $("#charts04").css('width',$(".tab_box").width());
            var myChartB = this.$echarts.init(document.getElementById('charts03'));
            var myChartC = this.$echarts.init(document.getElementById('charts04'));
            var option = {
                //backgroundColor: '#01004C',
                title: {

                },
                tooltip: {
                    //trigger: 'axis'
                },
                legend: {
                    data: ['总量', '正向', '反向'],
                    lineStyle:{
                            color: ['#ffd051','#06ee00','#e44747'],
                    },
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
            /*toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },*/
                calculable: true,
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data:this.commentAnalysis.dataX,
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
                series: [{
                        name: '总量',
                        type: 'line',
                        data: this.commentAnalysis.dataY,
                        lineStyle: {
                            normal: {
                                width: 1,
                                color: {
                                    type: 'linear',
                                    colorStops: [{
                                        offset: 0,
                                        color: '#ffd051' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#ffd051' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                                
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#ffd051',
                                borderWidth: 1,
                                borderColor: "#00a8f1"
                            }
                        },
                        markPoint: {
                            data: [{
                                    type: 'max',
                                    name: '最大值'
                                },
                            /* {
                                    type: 'min',
                                    name: '最小值'
                                }*/ 
                            ]
                        },        
                    },
                    {
                        name: '正向',
                        type: 'line',
                        data: this.commentAnalysis.po_list,
                        lineStyle: {
                            normal: {
                                width: 1,
                                color: {
                                    type: 'linear',

                                    colorStops: [{
                                        offset: 0,
                                        color: '#06ee00' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#06ee00' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#06ee00',
                                borderWidth: 1,
                                borderColor: "#06ee00"
                            }
                        }, 
                    },
                    {
                        name: '反向',
                        type: 'line',
                        data: this.commentAnalysis.ne_list,
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
                                color: '#e44747',
                                borderWidth: 1,
                                borderColor: "#e44747"
                            }
                        },
                    }
                ]
            };
            
            myChartB.setOption(option);
            myChartC.setOption(option);   
        },
    },
    mounted(){ 
        showTabs()
        window.onresize = () => {  
            this.initChart() //重新调用 实现自适应宽度
            this.$echarts.init(document.getElementById('charts03')).resize();
            this.$echarts.init(document.getElementById('charts04')).resize();
        }
    }   
}
</script>
<style lang="scss" scoped>

</style>