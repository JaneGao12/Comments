<template> 
    <div>
       <div class="piclist">
            <div class="banner">
                <div class="title"><b></b>文本图片</div>
                <el-carousel height="310px">
                    <el-carousel-item v-for="(item,index) of this.picUrl" :key="index">
                        <img class="pic" style="width:100%;height:100%" :src="item" alt=""> 
                    </el-carousel-item> 
                </el-carousel>
            </div>
        </div> 
    </div>
	
</template>
<script>
 
export default {
    name: 'NewsSlider', 
    props:{
        textImg:Array
    },
    data(){
        return{
            picUrl:[]
        }
    },
    watch:{
        textImg(){ 
            this.picUrl.length = 0;
            // console.log(this.textImg);
            for(let i = 0;i<this.textImg.length;i++){ 
                this.picUrl.push(this.textImg[i].image_path_list[0])
            }
             //console.log(typeof(this.picUrl));
        } 
    }, 

    mounted(){
        
    }
}
</script>
<style lang="scss" scoped>  
     .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .banner{
        margin-right: -10px;
    }
    .pic{
        height: 200px;
    } 
</style>