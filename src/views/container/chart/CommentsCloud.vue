<template>
    <div class="chart_con01">
			<div class="chart_03">
				<div class="title"><b></b>评论词云</div>
				<div class="theme theme01">
					<div class="themecon" id="patent-hot-word2" style="width: 150%;height:280px;"></div>
				</div>
			</div>
		</div>
</template>
<script> 
 
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
export default {
    name:'CommentsCloud', 
    props:{
        replyCloud:Array
    },
    watch:{
        replyCloud(){
            if(this.replyCloud.length !== 0){
                this.initChart()
            }else{
                document.getElementById("patent-hot-word2").innerText = "暂无评论内容~"
                document.getElementById("patent-hot-word2").style.padding = "120px"
            }
        }
    },
    methods:{
        initChart(){
            var chart = this.$echarts.init(document.getElementById('patent-hot-word2'));
             var option = {
                title: {
                    // text: ' '
                },
                tooltip: {},
                series: [{
                    type: 'wordCloud',
                    gridSize:10,
                    sizeRange: [15, 50],
                    // rotationRange: [-90, 90],
                    rotationRange: [-50, 50],
                    shape: 'circle',
                    // width: 100,
                    // height: 400,
                    textStyle: {
                    normal: {
                        color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                    },
                    data: this.replyCloud
                }]
            };
            chart.setOption(option);
        }
    },
    mounted(){
        // this.initChart()
        window.onresize = () => {  
            this.initChart() //重新调用 实现自适应宽度
            this.$echarts.init(document.getElementById('patent-hot-word2')).resize();
        }
    }   
}
</script>
<style lang="scss" scoped>
.chart_03{
    height: 310px;
    .theme{
        height: 300px;
    }
}
</style>