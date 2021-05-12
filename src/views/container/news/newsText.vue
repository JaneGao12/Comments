<template>
    <div> 
    <div class="news_block02_text"> 
        <div class="title"><b></b>详情</div>
            <div class="content"> 
                    <!-- <div v-if="this.textDetail.length == 0">暂无内容~</div> -->
                    <div class="contentDetail" v-for="(item,index) of textDetail" :key="index">
                        <strong>{{index+1}}.</strong>{{item.content}}
                    </div> 
            </div>  
    </div> 
    </div>
</template>
<script>
export default {
    name:'NewsText',
    props:{
        textDetail:Array
    },
   
    watch:{ 
        // textDetail(){
        //     var temp = [];
        //     for(let i = 0;i<this.textDetail.length;i++){
        //         temp[i] = this.textDetail[i].image_path_list;
        //     }
        //     this.picList = temp.filter((s)=>{
        //         return s != '' 
        //     }) 
        // }
        
    }
}
</script>
<style lang="scss" scoped> 
    .content{ 
        margin-left: -13px;
        margin-right: 5px; 
        height: 310px;
        overflow-y: auto; 
        overflow-x: auto; 
    }  
    .contentDetail{
        width:105%;
        padding-right: 10px;
    }
     /* 定义滚动条样式 */
    ::-webkit-scrollbar { 
        width: 6px;
        height: 6px;
        right: 0;
        background-color: rgba(255, 255, 255,0.1);
        
    }
    
    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
        border-radius: 20px; 
        background-color: rgba(255, 255, 255, 0);
    }
    
    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
        background-color: rgba(240, 240, 240, .3);
    } 
</style>