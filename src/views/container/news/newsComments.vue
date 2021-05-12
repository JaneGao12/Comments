<template>
<div>
    <div class="news_block02_list"> 
        <div class="title"><b></b>相关评论</div>
        <div class="scrollBox">
            <ul class="content">
                <li v-if="this.replyDetail.length == 0">暂无评论内容~</li>
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
    
</div>
    
</template>
<script>
export default {
    name:'NewsComments',
    props:{
        replyDetail:Array,
        totalReplyPage:Number
    },
    data (){
        return{
            currentPage: 1, //默认当前页 
            }
    },
    methods:{
        prevPage(){
            console.log("he");
            if(this.currentPage>1){
                this.currentPage -= 1;
                this.$emit("currentPage", this.currentPage);
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
                this.$emit("currentPage", this.currentPage);
            }else{
                this.$message({
                    type:'info',
                    message:'当前已是最后一页~'
                })
            }
        }
    },
}
</script> 
<style lang="scss" scoped>
.scrollBox{
    margin-top: 10px;
    overflow-x:auto;
    overflow-y: auto; 
    height: 275px; 
    
}
// .scrollBox{
//     overflow-y: scroll; 
//     overflow-x: scroll;
//     height: 320px;
// }
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
    bottom: 3px;
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
</style>