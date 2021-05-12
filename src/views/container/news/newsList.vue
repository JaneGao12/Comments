<template> 
<div >
    <div class="news_block">
        <div class="title"><b></b>舆情态势内容
            <div class="legendWord"> 
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="相关度" name="first">相关度</el-tab-pane>
                    <el-tab-pane label="时间" name="second">时间</el-tab-pane>
                    <el-tab-pane label="热度" name="third">热度</el-tab-pane>
                    <el-tab-pane label="态势" name="fourth">态势</el-tab-pane>
                </el-tabs> 
                <!-- <span class="legendSimilarity current" @click="getRank()">相关度↓</span>
                <span class="legendTime" @click="getRank()">时间↓</span>
                <span class="legendHot" @click="getRank()">热度↓</span>
                <span class="legendTrend" @click="getRank()">态势↓</span> -->
            </div>
            <div class="rankButton">
                <el-button id="ascending" @click="rankUpData" type="primary" icon="el-icon-top">升序</el-button>
                <el-button id="descending" @click="rankDownData" type="primary" icon="el-icon-bottom">降序</el-button>
            </div>
        </div>
        
        <div class="collapseBox"> 
            <ul class="newsTitle">
                <li class="titleItem" v-for="(item, index) in reNewsTitle" :key="index"> 
                    <span class="title" @click="showToggle(item, index)"> 
                        <i class="el-icon-arrow-right"></i>  
                            
                            <!-- <span>相关度：{{item.creat_time}}</span> -->
                            <span style="display:inline-block;margin-right:20px; width:170px">时间：{{item.creattime}} </span>
                            热度：<span class="commentCount" style="display:inline-block;margin-right:10px;width:100px">{{item.commentscount}}</span>
                            态势：<span class="commentTrend">{{ item.standpoint }}</span> 
                        <span class="item-title"> 
                            {{ item.title }}
                        </span>
                        
                    </span>

                    <div v-if="item.isSubShow" class="newsDetail" style="height:370px">
                        <div class="news_block02_text"> 
                            <div class="title"><b></b>详情</div>
                                <div class="content"> 
                                        <!-- <div v-if="this.textDetail.length == 0">暂无内容~</div> -->
                                        <div class="contentDetail" v-for="(item,index) of textDetail" :key="index">
                                            {{item.content}}<br>
                                            <span style="font-size:12px;color:#a8a8a8">
                                                用户：{{item.user}}<br>
                                                发帖时间：{{item.published_time}}</span> 
                                        </div> 
                                </div>  
                        </div> 

                        <div class="news_block02_list"> 
                            <div class="title"><b></b>相关评论</div>
                            <div class="scrollBox">
                                <ul class="commentContent">
                                    <li class="emptyComments">暂无评论内容~</li>
                                    <li v-for="(item,index) of replyDetail" :key="index">
                                        <div class="pic"><img src="../../../assets/img/tx.png"></div>
                                        <div class="comments">
                                            <h1>用户姓名</h1>
                                            <p>{{item}}</p>
                                        </div>
                                        
                                    </li> 
                                </ul>
                                </div> 
                            <div class="center-page">
                                <a class="prev-page" @click="prevPage">上一页</a>
                                <a class="next-page" @click="nextPage">下一页</a>
                            </div>
                        </div>
                        
                        <div class="piclist">
                            <div class="banner" style="border:1px solid #0046ff">
                                <div class="title"><b></b>图片</div>
                                <el-carousel height="310px">
                                    <el-carousel-item v-for="(item,index) of picList" :key="index">
                                        <img class="pic" style="width:100%;height:100%" :src="item" alt=""> 
                                    </el-carousel-item> 
                                </el-carousel>
                            </div>
                        </div> 
                    </div>
                </li>
            </ul>
        </div>
        <div class="center-page center-page-title">
            <a class="prev-page prev-page-title" @click="prevPageTitle">上一页</a>
            <a class="next-page next-page-title" @click="nextPageTitle">下一页</a>
        </div>
	</div>  
</div> 
</template>
<script> 
import {apiTextNext,apiReplyNext,apiapiTitleDetail,apiTitleDetail,apiTextSort} from '../../../http/api'
import newsText from './newsText'
import newsSlider from './newsSlider'
import newsComments from './newsComments'
export default {
    name:'NewsList', 
    props: {
        newsTitle: Array, 
        dataSet: Array, 
        commentTotalPage:Number,
        totalTitlePage:Number,
        keyWord:Object,
        startTime: String,
        stopTime: String
    }, 
    components:{
        newsText,
        newsSlider,
        newsComments,
    },
    watch:{
        newsTitle(){
            this.reNewsTitle = []
            console.log(this.newsTitle);
            for(let i = 0;i<this.newsTitle.length;i++){
                let object = {
                    title:this.newsTitle[i].title,
                    standpoint:this.newsTitle[i].standpoint,
                    creattime:this.newsTitle[i].creat_time,
                    commentscount:this.newsTitle[i].comments_count,
                    isSubShow: false
                }
                this.reNewsTitle.push(object)
            }  
            console.log(this.reNewsTitle);
            
        },
        reNewsTitle(){
            this.$nextTick(function(){
                this.commentTrendColor();
                this.commentCountColor()
            })
        },
        commentTotalPage(){
            this.totalReplyPage = this.commentTotalPage
        },
        totalTitlePage(){
            this.totalTitlePageNum = this.totalTitlePage
        }
    },
    data (){
        return{ 
            activeName: 'first',
            currentPage: 1, //默认当前页 
            currentPageTitle: 1, //默认xinwenye
            textDetail: [],
            replyDetail: [],
            replyFirstPage: [],
            textImg: [] ,
            reNewsTitle: [], 
            picList:[],
            eachNewsTitle:'',  
            totalReplyPage:0,
            totalTitlePageNum:0,
            sortIndex:'相关度',
            rankRule:'ascending'
        }
    },
    methods:{  
        commentTrendColor(){ //改变态势值得颜色
            var commentTrend = document.getElementsByClassName('commentTrend'); 
            for(let i = 0;i<commentTrend.length;i++){ 
                // console.log(commentTrend[i].innerText); 
                if(commentTrend[i].innerText <= 0.2){
                    commentTrend[i].innerText = "★★★★★"
                    commentTrend[i].style.color="red"
                }else if(commentTrend[i].innerText > 0.2 && commentTrend[i].innerText <= 0.4){
                    commentTrend[i].innerText = "★★★★"
                    commentTrend[i].style.color="orange"
                }else if(commentTrend[i].innerText > 0.4 && commentTrend[i].innerText <= 0.6){
                    commentTrend[i].innerText = "★★★"
                    commentTrend[i].style.color="yellow"
                }else if(commentTrend[i].innerText > 0.6 && commentTrend[i].innerText <= 0.8){
                    commentTrend[i].innerText = "★★"
                    commentTrend[i].style.color="lightgreen"
                }else{
                    commentTrend[i].innerText = "★"
                    commentTrend[i].style.color="#1aa034"
                }
            }
        },
        commentCountColor(){//改变热度值得颜色
            var commentCount = document.getElementsByClassName('commentCount');
            for(let i = 0;i<commentCount.length;i++){ 
                // console.log(commentTrend[i].innerText); 
                if(commentCount[i].innerText <= 100){
                    commentCount[i].innerText = "★"
                    commentCount[i].style.color="#1aa034"
                }else if(commentCount[i].innerText > 100 && commentCount[i].innerText <= 500){
                    commentCount[i].innerText = "★★"
                    commentCount[i].style.color="lightgreen"
                }else if(commentCount[i].innerText > 500 && commentCount[i].innerText <= 1200){
                    commentCount[i].innerText = "★★★"
                    commentCount[i].style.color="yellow"
                }else if(commentCount[i].innerText > 1200 && commentCount[i].innerText <= 5000){
                    commentCount[i].innerText = "★★★★"
                    commentCount[i].style.color="orange"
                }else{
                    commentCount[i].innerText = "★★★★★"
                    commentCount[i].style.color="red"
                }
            }
        },
        handleClick(tab, event) { //切换卡片展示不同新闻
            this.rankRule = 'ascending'
            this.currentPageTitle = 1
            this.reNewsTitle = []
            console.log(tab.label);
            this.sortIndex = tab.label
            apiTextSort({
                dataset: this.dataSet,
                keyword: this.keyWord,
                starttime: this.startTime+' 12:12:12',
                stoptime: this.stopTime+' 11:11:11',
                page_num: this.currentPageTitle,
                sort_index: this.sortIndex, 
                rankrule: this.rankRule
            })
            .then((res) => {
                
                res = res.data.data;
                console.log(res);
                for(let i = 0;i<res.relate_file.length;i++){
                    let object = {
                        title:res.relate_file[i].title,
                        standpoint:res.relate_file[i].standpoint,
                        creattime:res.relate_file[i].creat_time,
                        commentscount:res.relate_file[i].comments_count,
                        isSubShow: false
                    }
                    this.reNewsTitle.push(object)
                } 
                console.log(this.reNewsTitle);  
                this.totalTitlePageNum = res.total_page
            })
            .catch((error)=>{
                console.log(error);
                this.$message({
                    type:'error',
                    message:'服务器错误，请重试~'
                })
            }) 
        },
        rankUpData(){//升序排
            this.currentPageTitle = 1
            this.reNewsTitle = []
            this.rankRule = 'ascending';
            apiTextSort({
                dataset: this.dataSet,
                keyword: this.keyWord,
                starttime: this.startTime+' 12:12:12',
                stoptime: this.stopTime+' 11:11:11',
                page_num: this.currentPageTitle,
                sort_index: this.sortIndex, 
                rankrule: this.rankRule
            })
            .then((res) => { 
                console.log(res);
                res = res.data.data;
                console.log(res);
                for(let i = 0;i<res.relate_file.length;i++){
                    let object = {
                        title:res.relate_file[i].title,
                        standpoint:res.relate_file[i].standpoint,
                        creattime:res.relate_file[i].creat_time,
                        commentscount:res.relate_file[i].comments_count,
                        isSubShow: false
                    }
                    this.reNewsTitle.push(object)
                }   
                this.totalTitlePageNum = res.total_page
            })
            .catch((error)=>{
                console.log(error);
                this.$message({
                    type:'error',
                    message:'服务器错误，请重试~'
                })
            }) 
        },
        rankDownData(){//降序排
            this.currentPageTitle = 1
            this.reNewsTitle = []
            this.rankRule = 'descending'; 
            apiTextSort({
                dataset: this.dataSet,
                keyword: this.keyWord,
                starttime: this.startTime+' 12:12:12',
                stoptime: this.stopTime+' 11:11:11',
                page_num: this.currentPageTitle,
                sort_index: this.sortIndex, 
                rankrule: this.rankRule
            })
            .then((res) => { 
                console.log(res);
                res = res.data.data;
                console.log(res);
                for(let i = 0;i<res.relate_file.length;i++){
                    let object = {
                        title:res.relate_file[i].title,
                        standpoint:res.relate_file[i].standpoint,
                        creattime:res.relate_file[i].creat_time,
                        commentscount:res.relate_file[i].comments_count,
                        isSubShow: false
                    }
                    this.reNewsTitle.push(object)
                }   
                this.totalTitlePageNum = res.total_page
            })
            .catch((error)=>{
                console.log(error);
                this.$message({
                    type:'error',
                    message:'服务器错误，请重试~'
                })
            }) 
        },
        showToggle (item, ind) {  //折叠板
            this.currentPage = 1
            this.reNewsTitle.forEach(i => { 
                // 判断如果数据中的reNewsTitle[i]的show属性不等于当前数据的isSubShow属性那么menuList[i]等于false
                if (i.isSubShow !== this.reNewsTitle[ind].isSubShow) {
                    i.isSubShow = false; 
                }
            }); 
            item.isSubShow = !item.isSubShow;   
            this.eachNewsTitle = item.title 
            apiTitleDetail({
                dataset:this.dataSet,
                title: item.title
            })
            .then((res)=>{
                res = res.data
                console.log(res);
                this.replyDetail = res.commend_list; 
                this.replyFirstPage = res.commend_list;
                this.textDetail = res.content;  
                this.textImg = res.content
                this.picList = this.textImg[0].image_path_list  
                // console.log(this.textImg); 
                // console.log(this.picList);
                //评论为空时候 block 空评论的div
                var comments = $(".emptyComments"); 
                if(this.replyDetail.length == 0){
                    comments.css("display","block")
                }
            })
            .catch((error)=>{
                console.log(error);
                this.$message({
                    type:'error',
                    message:'服务器错误，请重试~'
                })
            }) 

            
            
        },
        
        prevPage(){  
            if(this.currentPage>1){
                if(this.currentPage == 2){
                    this.currentPage -= 1; 
                    this.replyDetail = this.replyFirstPage
                }else{
                    this.currentPage -= 1; 
                    this.getPageReplyData() 
                } 
            }else{
                this.$message({
                    type:'info',
                    message:'当前已是第一页~'
                })
            }
        },
        nextPage(){ 
            if(this.currentPage<this.totalReplyPage){
                this.currentPage += 1; 
                this.getPageReplyData()
            }else{
                this.$message({
                    type:'info',
                    message:'当前已是最后一页~'
                })
            }
        }, 
        prevPageTitle(){  
            if(this.currentPageTitle>1){
                this.currentPageTitle -= 1; 
                this.getPageTitleNextData() 
            }else{
                this.$message({
                    type:'info',
                    message:'当前已是第一页~'
                })
            }
        },
        nextPageTitle(){
            console.log("next");
            if(this.currentPageTitle<this.totalTitlePageNum){
                this.currentPageTitle += 1; 
                this.getPageTitleNextData()
            }else{
                this.$message({
                    type:'info',
                    message:'当前已是最后一页~'
                })
            }
        }, 
        getPageReplyData(){//评论翻页 
            console.log("hh");
            this.replyDetail=[];
            apiReplyNext( 
                {
                dataset:this.dataSet,
                title: this.eachNewsTitle,
                starttime: this.startTime+' 12:12:12',
                stoptime: this.stopTime+' 11:11:11',
                page_num:this.currentPage
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
        getPageTitleNextData(){//新闻标题下一页 
            this.reNewsTitle = []
            apiTextSort({
                dataset: this.dataSet,
                keyword: this.keyWord,
                starttime: this.startTime+' 12:12:12',
                stoptime: this.stopTime+' 11:11:11',
                page_num: this.currentPageTitle,
                sort_index: this.sortIndex, 
                rankrule: this.rankRule
            })
            .then((res) => {
                this.reNewsTitle = []
                res = res.data.data;
                console.log(res);
                for(let i = 0;i<res.relate_file.length;i++){
                    let object = {
                        title:res.relate_file[i].title,
                        standpoint:res.relate_file[i].standpoint,
                        creattime:res.relate_file[i].creat_time,
                        commentscount:res.relate_file[i].comments_count,
                        isSubShow: false
                    }
                    this.reNewsTitle.push(object)
                }   
                this.totalTitlePageNum = res.total_page
            })
        }, 
    }, 
    mounted(){ 
        
        
    }
}
</script>
<style lang="scss">
    .el-tabs__nav-scroll{
        width: 300px;
    }
    .el-tabs,.el-tabs--card, .el-tabs--top{
        width: 400px;
    }
    .el-tabs--card>.el-tabs__header {
        border-bottom: none;
    }
    .el-tabs__content{
        display: none;
    }
    .el-tabs__item{
        color: #fff;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__nav{
        border: none;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item{
        border-left:none ;
    }
    .el-button{
        padding: 5px 10px;
        
    }
    .el-button--primary {
        background-color: #0046ff;
        border-color: #0046ff;
        
    }
    .el-button--primary:hover{
        background-color: #409EFF;
        border-color: #409EFF;  
    }
</style>
<style lang="scss" scoped>
    .title{
        position: relative;
    }
    .legendWord{ 
        height: 40px;
        width: 400px; 
        font-size: 14px; 
        margin-top: -40px;
        margin-left: 115px;
        margin-right: 20px;
        span{
            cursor: pointer;
            display: inline-block;
            text-align: center;
            padding: 0 3px;
            padding-bottom: 5px; 
            width: 60px; 
            height: 25px;
            line-height: 25px;
            border: 1px solid #ccc;
            vertical-align:middle;
            color: #000;
            &:hover{
                border-color: #0046ff;
                color: #0046ff;
            }
        }
        .legendSimilarity{
            background-color: #fff;   
        }
        .legendTime{
            background-color: #fff;   
        }
        .legendHot{
            background-color:#fff;  
        }
        .legendTrend{
            background-color: #fff;   
        }
        
    }
    .rankButton{
        position: relative;
        margin-top: -40px;
        margin-left: 500px;
        
    }
    .legendWord .current{
        border-color: #0046ff;
        background-color: #0046ff;
        color: #fff;
        &:hover{
            color: #fff;
        }
    }
    .collapseBox {
        height: auto;
        margin-top: 20px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .titleItem{
        cursor: pointer;  
        &:first-child{
            border-top: 1px solid #fff;
        }
        &:last-child{
            border-bottom: 1px solid #fff;
        }
        border-top: 0.1px dashed #fff; 
        .item-title{
            display:inline-block;
            width: 450px;
            vertical-align: middle;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分文字以...显示*/
            &:hover{
                color: #0046ff;
            }
        }
        .commentTrend{
            display: inline-block;
            width: 100px;
        }
    }
    .emptyComments{
        display: none;
        padding-left: 10px;
    }
    .commentTrend{
        display:inline-block;
        // float: left;
        // margin-right: 30px;
    }
</style>
<style lang="scss" scoped>  
// 图片样式
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .banner{ 
        margin-right: -10px;
    } 
</style>
<style lang="scss" scoped>
// 评论样式
    .scrollBox{
        margin-top: 10px; 
        height: 275px;  
    } 
    .commentContent{ 
        padding-left: 20px;
        height: 260px;
        overflow-y: auto;
        overflow-x: auto; 

    li a {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
}
 /* 定义滚动条样式 */
    ::-webkit-scrollbar { 
        width: 6px;
        height: 6px;
        background-color: rgba(255, 255, 255,0.1);
        
    }
    
    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0);
    }
    
    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
        background-color: rgba(240, 240, 240, .3);
    }
.center-page{
    position: relative;
    bottom: 15px;
    left:60%;
    float: left;
    margin-right: -50px;  
        a{
            cursor: pointer;
            display: inline-block;
            background-color: #0046ff;
            border-radius: 3px;
            color: white;
            padding: 3px;
            margin-top: 5px;
            margin-right: 5px;
        }
}
    .news_block{
        height: auto;
        margin-bottom: 50px;
        .center-page-title{
            bottom: -10px; 
            left:90%;
        }

    }
</style>
<style lang="scss" scoped> 
// 详情样式
    .content{ 
        padding-right:30px;
        margin-left: -20px;
        height: 280px; 
        font-size: 16px;
        line-height: 32px;
    }  
    .contentDetail{
        width:105%;
        height: 280px;
        text-indent: 32px;
        overflow-y: auto;
        overflow-x: auto; 
    } 
</style>