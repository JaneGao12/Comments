<template>
    <div> 
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

        <div class="chart_con">
            <div class="chart_03">
                <div class="title"><b></b>来源分布</div>
                <div id="charts10" style="width: 100%;height:230px; margin-top: -30px;"></div>
            </div>
        </div>

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

        <div class="chart_con">
            <div class="chart_03">
                <div class="title"><b></b>转发分析</div>
                    <div class="box demo3">
                        <ul class="tab_menu">
                            <li class="current">天</li>
                            <!-- <li class="">月</li> -->
                        </ul>
                        <div class="tab_box">
                            <div class="con">
                                <div id="charts07" style="width: 100%;height:200px;"></div>
                            </div>
                            <div class="con hide">
                                <div id="charts08" style="width: 100%;height:200px;"></div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>

        

        <div class="chart_con">
            <div class="chart_02">
                <div class="title"><b></b>时间段分布</div>
                <!-- <div v-if="this.sentFileDistribution.length==0" class="emptyValue">暂无数据~</div> -->
                <div id="charts09" style="width: 100%;height:230px; margin-top: -30px;"></div>
            </div>
        </div>

        
        <div class="chart_con01">
			<div class="chart_01 chart_01_theme">
				<div class="title"><b></b>主题</div> 
                <div id="topicCanvas" style="">
                    <canvas width="600%" style="margin-left:10%" height="290" id="myTopicCanvas" ref="canvas">
                        <p>换个现代浏览器吧！</p>
                    </canvas>
                </div>
				<div class="topicWord" id="topicWord" ref="topicWord" style="display:none" v-for="(item,index) of this.topicWordCloud" :key="index">
                    <a href="" onclick="return false">{{item.name}}</a> 
                </div> 
			</div>
		</div>

        <div class="chart_con01">
			<div class="chart_03 chart_01_theme">
				<div class="title"><b></b>评论</div>
				<div id="replyCanvas">
                    <canvas width="600%" style="margin-left:10%" height="290" id="myReplyCanvas" ref="canvas">
                        <p>换个现代浏览器吧！</p>
                    </canvas>
                </div>
				<div class="replyWord" id="replyWord" ref="replyWord" style="display:none" v-for="(item,index) of this.replyCloud" :key="index">
                    <a href="" onclick="return false">{{item.name}}</a> 
                </div>
			</div>
		</div>
    </div>
</template>
<script>
import '../../../common/tagcanvas.js'
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
export default {
    name:'ChartIndex',
    props:{
        fileNum: Object,
        likeFileData:Object,
        resentFileNum: Object,
        commentAnalysis:Object,
        sentFileDistribution:Array,
        sourceList:Array,
        topicWordCloud:Array,
        replyCloud:Array
    },
    watch: {
        fileNum (){
            if(this.fileNum.dataY.length !== 0){
                this.initChart_1()
            }else{
                document.getElementById("charts01").innerText = "暂无发帖数据~"
                document.getElementById("charts01").style.paddingLeft = "10px"
            } 
        }, 
        likeFileData(){
            this.initChart_2()
        },
        resentFileNum(){ 
            this.initChart_3()
        },
        commentAnalysis(){ 
            this.initChart_4() 
        },
        sentFileDistribution(){
            this.initChart_5()
        },
        sourceList(){
            // console.log(this.sourceList);
            this.initChart_6()
        },
        topicWordCloud(){
            // console.log(this.topicWordCloud);
            this.$nextTick(() => { 
                this.initChart_7()
            }); 
        },
        replyCloud(){
            if(this.replyCloud.length !== 0){
                this.$nextTick(() => { 
                    this.initChart_8()
                }); 
            }
            
        }
    }, 
    created(){

    },
    methods:{
        initChart_1(){
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
        initChart_2(){
            $("#charts05").css('width',$(".tab_box").width());
            $("#charts06").css('width',$(".tab_box").width());
            var myChart5 = this.$echarts.init(document.getElementById('charts05'));
            var myChart6 = this.$echarts.init(document.getElementById('charts06'));
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
            
            myChart5.setOption(option);
            myChart6.setOption(option); 
        },
        initChart_3(){ 
            $("#charts07").css('width',$(".tab_box").width());
            $("#charts08").css('width',$(".tab_box").width());
            var myChart7 = this.$echarts.init(document.getElementById('charts07'));
            var myChart8 = this.$echarts.init(document.getElementById('charts08'));
            var option = {
                //backgroundColor: '#01004C',
                title: { 
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
                    data: this.resentFileNum.dataX,
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
                        data: this.resentFileNum.dataY,
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
            
            myChart7.setOption(option);
            myChart8.setOption(option); 
        },
        initChart_4(){
            $("#charts03").css('width',$(".tab_box").width());
            $("#charts04").css('width',$(".tab_box").width());
            var myChart3 = this.$echarts.init(document.getElementById('charts03'));
            var myChart4 = this.$echarts.init(document.getElementById('charts04'));
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
            
            myChart3.setOption(option);
            myChart4.setOption(option);   
        },
        initChart_5(){//时间段分布 饼图
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
                        label: {
                            show: false,
                            position: 'inside',
                            formatter: (params) => {
                                return `${params.percent}%`
                            }
                        },
                        emphasis: {
                            itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        label: {
                            show: false,
                            fontSize: '16',
                            fontWeight: 'bold'
                        }
                        }, 
                        data: this.sentFileDistribution
                    }
                ]
            };
            myChart9.setOption(option);
        },
        initChart_6(){ //来源分布饼图
            var myChart10 = this.$echarts.init(document.getElementById('charts10'));
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
            myChart10.setOption(option);
        },
        initChart_7(){//主题词云 
            try { 
                TagCanvas.Start('myTopicCanvas', 'topicWord', {
                    textColour: '#15b6fc',
                    outlineColour: 'red',
                    reverse: true,
                    depth: 1,
                    dragControl: true,
                    decel: 0.95,
                    maxSpeed: 0.05,
                    minSpeed: 0.05,
                    initial: [-0.1, 0], 
                    clickToFront: "500",
                    stretchX: 2, 
                    textAligh:'centre', 
                    noTagsMessage:false
                });
            } catch (e) {  } 
        },
        initChart_8(){//评论此云
            try { 
                TagCanvas.Start('myReplyCanvas', 'replyWord', {
                    textColour: '#d94774',
                    outlineColour: '#d0b57b',
                    reverse: true,
                    depth: 1,
                    dragControl: true,
                    decel: 0.95,
                    maxSpeed: 0.05,
                    minSpeed: 0.05,
                    initial: [-0.1, 0], 
                    clickToFront: "500",
                    stretchX: 2, 
                    textAligh:'centre',
                });
            } catch (e) {  }
        }
    }, 
    mounted (){ 
        this.initChart_7() 
        this.initChart_8()
        window.onresize = () => {  
            this.initChart_1() //重新调用 实现自适应宽度
            this.$echarts.init(document.getElementById('charts01')).resize();
            this.initChart_2() //重新调用 实现自适应宽度
            this.$echarts.init(document.getElementById('charts05')).resize();
            this.initChart_3() //重新调用 实现自适应宽度
            this.$echarts.init(document.getElementById('charts07')).resize();
            this.initChart_4() //重新调用 实现自适应宽度
            this.$echarts.init(document.getElementById('charts03')).resize();
            this.initChart_5() //重新调用 实现自适应宽度
            this.$echarts.init(document.getElementById('charts09')).resize();
            this.initChart_6() //重新调用 实现自适应宽度
            this.$echarts.init(document.getElementById('charts10')).resize();
            this.initChart_7() //重新调用 实现自适应宽度
            // this.$echarts.init(document.getElementById('topicWord')).resize();
            this.initChart_8() //重新调用 实现自适应宽度
            // this.$echarts.init(document.getElementById('patent-hot-word2')).resize();
        }
    }   
}
</script>
<style lang="scss" scoped>
.chart_01_theme{
    height: 350px;
    margin-bottom: 10px;
    .theme{
        height: 300px;
    }
}
</style>