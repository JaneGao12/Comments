<template>
    <div class="chart_con01">
			<div class="chart_01">
				<div class="title"><b></b>主题词云</div>
				<div class="theme">
					<div class="themecon" id="patent-hot-word1" style="width: 150%;height:280px;"></div>
				</div>
			</div>
		</div>
    
</template>
<script> 
 
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
export default {
    name:'ThemeCloud',  
    props:{
        topicWordCloud:Array
    },
    watch:{
        topicWordCloud(){
            this.initChart()
        },
        
    },
    methods:{
        initChart(){
            var chart = this.$echarts.init(document.getElementById('patent-hot-word1'));
            var option = {
                title: {
                    // text: ' '
                },
                tooltip: {},
                series: [{
                    type: 'wordCloud',
                    gridSize: 10,
                    sizeRange: [12, 50],
                    // rotationRange: [-90, 90],
                    rotationRange: [-50, 50],
                    shape: 'circle',
                    width: 800,
                    height: 200,
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
                    data: this.topicWordCloud
                }]
            };
            chart.setOption(option);
        }
    },
    mounted(){
        // this.initChart()  
    }   
}
</script>
<style lang="scss" scoped>
.chart_01{
    height: 310px;
    .theme{
        height: 300px;
    }
}
</style>