<template>
    <div>
        <div>
            <search-setup @goSearch="goSearch"></search-setup>
            <!-- <search-time></search-time>  -->
        </div> 

        <div class="chart"> 
            <chart-index :replyCloud="this.replyCloud" :topicWordCloud="this.topicWordCloud" :fileNum="this.fileNum" :likeFileData="this.likeFileData" :resentFileNum="this.resentFileNum" :commentAnalysis="this.commentAnalysis" :sentFileDistribution="this.sentFileDistribution" :sourceList="this.sourceList" ></chart-index>
        </div>

        <div class="newslist">
            <news-list :startTime="this.startTime" :stopTime="this.stopTime" :keyWord="this.keyWord" :newsTitle="this.newsTitle" :dataSet="this.dataSet" :commentTotalPage="this.commentTotalPage" :totalTitlePage="this.totalTitlePage"></news-list> 
        </div>
    </div>
</template>
<script>
import {apiIndexShow,apiTextNext,apiReplyNext,apiapiTitleDetail,apiTitleDetail} from '../../http/api'
import SearchTime from './search/SearchTime'
import SearchSetup from './search/SearchSetup'

import NewsList from './news/newsList'
import ChartIndex from './chart/chartIndex'
export default {
    name:'ContainerIndex',
    components:{
        SearchSetup,
		NewsList,
        ChartIndex
	},
    data(){
        return{  
            dataSet:[1],//选择数据库
            keyWord:{
                '兵团': 0.1,
                },//添加关键词
            startTime:'2020-06-15',//起始时间
            stopTime:'2020-09-15',//结束时间
            page_num:'',//下一页页码
            indexNews:{},
            indexChart:{}, 

            sourceList:[],//发帖来源
            sentFileDistribution:[],//发帖来源分布
            fileNum:{},//发帖分析
            commentAnalysis:{},//评论分析
            likeFileData:{},//点赞分析
            resentFileNum:{},//转发分析
            topicWordCloud:[],//主题词云
            replyCloud:[],//回复词云 

            newsTitle:[],//新闻标题
            // replyDetail:[],// 
            // textDetail:[],// 
            // textImg:[],//轮播图片
			pageTitleNum:0, //当前新闻标题页 页码
			pageReplyNum:0,//当前评论页 页码
			totalTitlePage:0, //标题也总页码数
            commentTotalPage:0,
            
            eachNewsTitle:'微博：#新疆新增本土病例30例#网友@村上富江_:今天是个好日子~',//点击新闻列表获取新闻文本
        }
    }, 
    methods: {
        getChart_NewsData(){ 
            this.textImg =  [];
            apiIndexShow( 
                {
                dataset:this.dataSet,
                keyword:this.keyWord,
                starttime: this.startTime+' 12:12:12',//'2020-08-16 12:12:12',
                stoptime: this.stopTime+' 11:11:11'//'2020-11-10 11:11:11'//
            }
            )
            .then((res)=>{   
                res = res.data.data; 
                console.log(res);
                this.fileNum = res.file_num;
                this.likeFileData = res.like_file_num;
                this.resentFileNum = res.resent_file_num;
                this.commentAnalysis = res.comment_num; 
                this.topicWordCloud = res.topic_wordcloud;
                this.replyCloud = res.reply_wordcloud
                this.sourceList = res.source_list
                this.sentFileDistribution = res.sent_file_distribution
                
                this.newsTitle = res.relate_file;
                // this.replyDetail = res.reply_detail; 
                // this.textDetail = res.text_detail;  
                // this.textImg = res.text_detail 
                this.commentTotalPage = res.comment_total_page;
				this.totalTitlePage = res.total_page
            })
            .catch((err)=>{
                console.log(err)
                this.$message({
                    type:'error',
                    message:'服务器错误，请重试~'
                })
            })
        }, 
        
        goSearch(value){
            // console.log(value);
            if(value.dataset.length !== 0 && value.keyWord !=={}){
                this.dataSet = value.dataset;
                this.keyWord = value.keyword;
                this.startTime = value.startTime;
                this.stopTime = value.stopTime 
                this. getChart_NewsData()
            }else{
                this.$message({
                    type:'warning',
                    message:'请设置完整搜索关键词~'
                })
            }
            
        }, 
    },
    created () {
        this.getChart_NewsData()
    },
    mounted(){
        // this.getChart_NewsData()
    }
}
</script>
<style lang="scss" scoped>
    .chart{
        height: 800px;
    }
</style>