<template>
    <div class="chart_con">
        <div class="chart_01">
				<div class="title"><b></b>发帖量趋势</div>
				<div class="box demo">
					<ul class="tab_menu">
						<li class="current">天</li>
						<!-- <li class="">月</li> -->
					</ul> 
					<div class="tab_box">
						<div class="con">  
                            <div id="charts01" style="width: 100%;height:200px;"></div>
						</div>
						<div class="con hide"> 
                            <div id="charts02" style="width: 100%;height:200px;"></div>
						</div>
					</div>
				</div>
				
	</div>
    </div>
    
</template>
<script> 
import { showTabs } from '../../../common/showTabs';
export default {
    name:'PostAnalysis',  
    props:{
        fileNum: Object
    },
    watch: {
        fileNum (){
            if(this.fileNum.dataY.length !== 0){
                this.initChart()
            }else{
                document.getElementById("charts01").innerText = "暂无发帖数据~"
                document.getElementById("charts01").style.paddingLeft = "10px"
            }
            
        }, 
    }, 
    methods:{
        initChart(){
            $("#charts01").css('width',$(".tab_box").width());
            $("#charts02").css('width',$(".tab_box").width());
            var myChart1 = this.$echarts.init(document.getElementById('charts01'));
            var myChart2 = this.$echarts.init(document.getElementById('charts02'));
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
                    data:this.fileNum.dataX,
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
                    // {
                    //     name: '总量',
                    //     type: 'line',
                    //     data: [1200, 1000, 600, 1600, 800, 700, 600, 1100, 1400],
                    //     lineStyle: {
                    //         normal: {
                    //             width: 1,
                    //             color: {
                    //                 type: 'linear',
                    //                 colorStops: [{
                    //                     offset: 0,
                    //                     color: '#00a8f1' // 0% 处的颜色
                    //                 }, {
                    //                     offset: 1,
                    //                     color: '#00a8f1' // 100% 处的颜色
                    //                 }],
                    //                 globalCoord: false // 缺省为 false
                    //             },
                                
                    //         }
                    //     },
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#57BD9F',
                    //             borderWidth: 1,
                    //             borderColor: "#00a8f1"
                    //         }
                    //     },
                    //     markPoint: {
                    //         data: [{
                    //                 type: 'max',
                    //                 name: '最大值'
                    //             },
                    //         /* {
                    //                 type: 'min',
                    //                 name: '最小值'
                    //             }*/ 
                    //         ]
                    //     },        
                    // },
                    // {
                    //     name: '正向',
                    //     type: 'line',
                    //     data: [500, 250, 350, 300, 320, 190, 100, 400, 100],
                    //     lineStyle: {
                    //         normal: {
                    //             width: 1,
                    //             color: {
                    //                 type: 'linear',

                    //                 colorStops: [{
                    //                     offset: 0,
                    //                     color: '#06ee00' // 0% 处的颜色
                    //                 }, {
                    //                     offset: 1,
                    //                     color: '#06ee00' // 100% 处的颜色
                    //                 }],
                    //                 globalCoord: false // 缺省为 false
                    //             },
                    //         }
                    //     },
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#06ee00',
                    //             borderWidth: 1,
                    //             borderColor: "#06ee00"
                    //         }
                    //     }, 
                    // },
                   
                    {
                        // name: '反向',
                        type: 'line',
                        data: this.fileNum.dataY,
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

            myChart1.setOption(option);
            myChart2.setOption(option);
        },
        
    },
    mounted(){ 
        showTabs() 
    }   
}
</script>
<style lang="scss" scoped>

</style>