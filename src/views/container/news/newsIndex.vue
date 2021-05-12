<template>
    <div class="newslist">
        <news-list :newsTitle="this.newsTitle" @currentPage="getPageTitleNextData" :totalTitlePage="this.totalTitlePage"></news-list> 
        <div class="content">
            <div class="news_block02">
            <div class="piclist">
                <div class="banner">
                    <news-slider></news-slider> 
                </div>
            </div> 
            <!-- newText -->
            <news-text :textDetail="this.textDetail"></news-text> 
            <news-comments :replyDetail="this.replyDetail" @currentPage="getPageReplyData" :totalReplyPage="this.totalReplyPage"></news-comments>
        </div>
        </div> 
</div>
</template>
<script>
import {apiChart, apiLogin,apiTextNext,apiReplyNext} from '../../http/api'

import NewsList from './newsList'
import NewsSlider from './newsSlider'
import NewsText from './newsText'
import NewsComments from './newsComments'
export default {
	name:'NewsIndex', 
    components:{
		NewsList,
		NewsSlider,
		NewsText,
		NewsComments,
	},
	data(){
		return{
			dataSet:[],//选择数据库
            keyWord:{},//添加关键词
            startTime:'',//起始时间
            stopTime:'',//结束时间
            page_num:'',//下一页页码
            indexNews:{},
            indexChart:{}, 

            newsTitle:[],//新闻标题
            replyDetail:[],//
            sentFileDistribution:[],//
			textDetail:[],//
			pageTitleNum:0,
			pageReplyNum:0,
			totalTitlePage:0,
			totalReplyPage:10
		}
	},
	methods:{
        getChartData(){ 
            apiChart( 
                {
                dataset:[1,2],
                keyword:{
                    '县政府':'0.1',
                    '中国光大集团':'0.3'
                },
                starttime:'2020-11-01 12:12:12',
                stoptime: '2020-11-10 11:11:11'
            }
            )
            .then((res)=>{  
                res = res.data.data;
                console.log(res)
                this.newsTitle = res.relate_file;
                this.replyDetail = res.reply_detail;
                this.sentFileDistribution = res.sent_file_distribution;
				this.textDetail = res.text_detail; 
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
		getPageTitleNextData(value){//新闻标题下一页
			this.pageNum = value;
            // console.log(this.pageNum) 
			this.newsTitle = [];
            apiTextNext( 
                {
                dataset:[1,2],
                keyword:{
                    '铁门关市':'0.3',
                    '第三师':'0.1'
                },
                starttime:'2020-08-01 12:12:12',
                stoptime: '2020-09-10 11:11:11',
                page_num:this.pageNum
            }
            )
            .then((res)=>{ 
				res = res.data.data;
                console.log(res)
                this.totalTitlePage = res.total_page;
				this.newsTitle = res.relate_file;
            })
            .catch((err)=>{
                console.log(err)
                this.$message({
                    type:'error',
                    message:'服务器错误，请重试~'
                })
            })
        },
		getPageReplyData(value){//评论下一页
			this.pageReplyNum = value;
			console.log(this.pageReplyNum);
			this.replyDetail=[];
            apiReplyNext( 
                {
                dataset:[1,2],
                title:'#菲总统希望中国能优先提供新冠疫苗#【菲律宾总统：在南海问题上不会同中国对抗希望中国能优先提供新冠疫苗】27日，菲律宾总统杜特尔特发表国情咨文时表示，菲将继续奉行独立外交政策，不会在中美之间选边站队，不会同意美重返菲军事基地，在南海问题上不会同中国对抗。另外面对新冠疫情，杜特尔特总',
                starttime:'2020-07-01 12:12:12',
                stoptime: '2020-09-10 11:11:11',
                page_num:this.pageReplyNum
            }
            )
            .then((res)=>{
				res = res.data.data;
				console.log(res);
				this.replyDetail = res.reply_detail; 
				this.totalReplyPage = res.total_page
            })
            .catch((err)=>{
                console.log(err)
                this.$message({
                    type:'error',
                    message:'服务器错误，请重试~'
                })
            })
        },
	
	},
    mounted (){
        // this.getChartData()
       
    }    
}
</script>
<style lang="scss" scoped>
.content{
    display: flex;
    flex-direction: row;
}
</style>