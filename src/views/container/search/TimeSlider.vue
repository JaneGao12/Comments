<template>
<div>
    <div class="demo-output-time">
        <input class="single-slider-time" type="hidden" value="0.0"/>
    </div>
    <div class="demo-output-date">
        <input class="single-slider-date" type="hidden" value="0.0"/>
    </div>
    <div class="change-panel">
        <span class="time" @click="handleTime">时间</span><br>
        <span class="date" @click="handleDate">日期</span>
    </div>
</div>
     
</template>
<script>
import $ from 'jquery';
export default {
    name: 'TimeSlider',
    methods:{
        timeSliderReady(){ 
            $(".demo-output-time").attr("style","display:block;");
            $(".demo-output-date").attr("style","display:none;");
            $(".time").attr("style","color:#0046ff")
            $('.single-slider-time').jRange({
                from: 0,
                to: 1440,
                step: 10,
                scale: ['0:00',"01:00","02:00","03:00",'04:00',"05:00","06:00", "07:00",'08:00',"09:00","10:00","11:00",'12:00',"13:00","14:00","15:00",'16:00',
				"17:00",'18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
                format: '%s', 
                showLabels: false,
                snap: true,
                theme: "theme-blue",
                isRange:true,
            }); 
            var sliderWidth = $(".demo-output-time").width();

            $(".slider-container").attr("style","width:`${sliderWidth}`;");
        },//timeSliderReady
        dateSliderReady(){
            $('.single-slider-date').jRange({
                from: 0,
                to: 1440,
                step: 10,
                scale: ['0:00',"01:00","02:00","03:00",'04:00',"05:00","06:00", "07:00",'08:00',"09:00","10:00","11:00",'12:00',"13:00","14:00","15:00",'16:00',
				"17:00",'18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
                format: '%s', 
                showLabels: false,
                snap: true,
                theme: "theme-blue",
                isRange:true,
            }); 
            var sliderWidth = $(".demo-output-time").width(); 
            $(".slider-container").attr("style","width:`${sliderWidth}`;");
            
        },
        handleTime(){
            $(".time").attr("style","color:#0046ff");
            $(".date").attr("style","color:white"); 
            $(".demo-output-time").attr("style","display:block;");
            $(".demo-output-date").attr("style","display:none;");
        },
        handleDate(){ 
            $(".time").attr("style","color:white");
            $(".date").attr("style","color:#0046ff");
            $(".demo-output-time").attr("style","display:none;");
            $(".demo-output-date").attr("style","display:block;");
        }, 
         
    },
    mounted (){
        this.timeSliderReady()
        this.dateSliderReady() 
        
    },//mounted结束
}
</script>
<style lang="css"> 
    .demo-output-date,.demo-output-time{
        margin-top: 25px;
        margin-left: 20px;
    }
    /* .demo-output-date{
        display: none;
    } */
    .change-panel{
        width: 50px;
        margin-top: -20px;
        margin-right: -80px;
        float: right;
    }
    .change-panel span:hover{
        cursor: pointer;
        color:#0046ff;
    } 
    .active{
        color:#0046ff;
    }
    .slider-container,.theme-blue{
        width: 90%;
    }
</style>