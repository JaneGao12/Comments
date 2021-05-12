<template>
    <div>
		<!-- 搜索框与搜索按钮开始 -->
        <div class="search">
			<div style=" width:340px; margin:0 auto;">
				<a class="searchSetup" data-toggle="modal" data-target="#search" @click="mask()">
					搜索设置 <i class="el-icon-arrow-right" style="margin-top:10px"></i>
				</a>
				<button class="searchButton" @click="goSearch()"><i class="fa fa-search"></i> 搜索</button>
			</div>
		</div>
		<!-- 搜索框与搜索按钮结束 -->

		<!-- 弹窗搜索设置关键字添加的位置 -->
		<div class="searchcon gjcwoo" id="searchcon">
			<div class="infoText" v-if="this.wordsArr.length ==0" style="padding:15px">请设置搜索关键词~</div>
			<div class="info" style="padding:15px;display:none"></div>
			<ul class="valueList"> 
			</ul>
		</div>
	<!-- 弹窗搜索设置关键字添加位置结束 -->

	<!-- 搜索设置 -->
	<div class="mask">
		<div class="modal" id="search"> 
				<div class="modal-content searchtc">
					<div class="modal-header">
						<button type="button" @click="close()" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="exampleModalLabel"><strong>搜索设置</strong> </h4>
					</div>
					<div class="pbzyxx">
						<div class="choosetit">数据库选择</div>
						<div class="sjkcon">
							<div class="pretty">
							<input class="inp-cbx" id="bx01" type="checkbox" name="chooseDataBase" style="display: none;"/>
							<label class="cbx" for="bx01"><span>
								<svg width="12px" height="10px">
								<use xlink:href="#check"></use>
								</svg>
								</span><span>微博</span></label> 
							</div>
							<div class="pretty">
							<input class="inp-cbx" id="bx02" type="checkbox" name="chooseDataBase" style="display: none;"/>
							<label class="cbx" for="bx02"><span>
								<svg width="12px" height="10px">
								<use xlink:href="#check"></use>
								</svg>
								</span><span>微信公众号</span></label> 
							</div>
							<div class="pretty">
							<input class="inp-cbx" id="bx03" type="checkbox" name="chooseDataBase" style="display: none;"/>
							<label class="cbx" for="bx03"><span>
								<svg width="12px" height="10px">
								<use xlink:href="#check"></use>
								</svg>
								</span><span>推特</span></label> 
							</div>
							<!-- <div class="pretty">
							<input class="inp-cbx" id="bx04" type="checkbox" name="chooseDataBase" style="display: none;"/>
							<label class="cbx" for="bx04"><span>
								<svg width="12px" height="10px">
								<use xlink:href="#check"></use>
								</svg>
								</span><span>数据库4</span></label> 
							</div> -->
							<!-- <div class="pretty">
							<input class="inp-cbx" id="bx05" type="checkbox" name="chooseDataBase" style="display: none;"/>
							<label class="cbx" for="bx05"><span>
								<svg width="12px" height="10px">
								<use xlink:href="#check"></use>
								</svg>
								</span><span>数据库5</span></label> 
							</div> -->
							<!-- <div class="pretty">
							<input class="inp-cbx" id="bx06" type="checkbox" name="chooseDataBase" style="display: none;"/>
							<label class="cbx" for="bx06"><span>
								<svg width="12px" height="10px">
								<use xlink:href="#check"></use>
								</svg>
								</span><span>数据库6</span></label> 
							</div> -->
							<!--SVG Sprites-->
							<svg class="inline-svg">
							<symbol id="check" viewbox="0 0 12 10">
								<polyline points="1.5 6 4.5 9 10.5 1"></polyline>
							</symbol>
							</svg>
							<div class="clearfix"></div>
						</div>
						<div class="chooseWords">关键词选择</div>
						<div class="chooseword">
							<span @click="tianjia()">兵团</span>
							<span @click="tianjia()">新疆</span> 
							<span @click="tianjia()">政府</span>
							<span @click="tianjia()">五家渠</span>
							<span @click="tianjia()">建设</span>
							<span @click="tianjia()">王君正</span>
							<span @click="tianjia()">彭家瑞</span>
							<div class="clearfix"></div>
						</div>
						<div class="ctcc" id="#ctcc">
								<ul> 
									<li class="buttonAdd" v-for="(item,i) in searchValueArr" :key="i"> 
										<span @click="removeWords">×</span><input type="text" ref="inputValue" class="buttonAddKeywords" :name="i" placeholder="关键词" autocomplete="off">&nbsp;&nbsp;<strong>权重</strong> 
										<input type="number" :name="'weight+'+i" class="weightValue" value="1" max="10" min="1" step="1">
									</li>  
								</ul>
							<div class="tianjia" @click="addKeyword()">+ 添加关键词</div>
							<div class="clearfix"></div>
						</div>  
						<div class="times">
								<ul>
									<li>
										<label for="">起始时间</label>
										<input type="date" class="input input-big" name="startTime" id="startTime">
									</li>
									<li>
										<label for="">终止时间 </label>
										<input type="date" name="stopTime" id="stopTime" class="input input-big">
									</li>
								</ul> 
						</div> 

						<div class="bods">
								<a @click="queding()">确定</a>
						</div>
					</div>
				</div> 
			</div>
	</div> 
	<!-- 搜索设置结束 -->

	
    </div>
</template>
<script>
export default {
	name:'SearchSetup', 
	data(){
		return{
			num:1,
			fixedwordsHtml:'',//点击固定的关键词增加li
			searchValueArr:[], //点击添加关键词按钮时动态添加li数组
			keyWords: '',
			keyWeight: 1,
			wordsArr: [],//存放所有的关键词
			weightsArr: [],//存放所有设置的权重
			searchValues: {},//关键词和权重键值对，发送给后台的数据
			finishSet:'',//添加完所有关键词和权重后，拼接起来添加到首页
			dataBaseChecked:[],//存放数据库索引下标
			startTime: '',
			stopTime: '',
		}
	},
	methods:{
		addKeyword(){
			this.searchValueArr.push('') 
			console.log("add");
		}, 
		mask(){
			let mask = document.getElementsByClassName("mask")[0]; 
			mask.style.display = "block";  

			$(".valueList").html("");
			$(".ctcc ul").html("");
			this.searchValueArr = [];
			this.finishSet = '';
			this.fixedwordsHtml=''; 
			this.searchValues = {};
			this.dataBaseChecked = [];
			this.wordsArr = [];
			this.weightsArr = [];
			this.startTime = '';
			this.stopTime = '';
		},
		close(){//关闭遮罩层
			let mask = document.getElementsByClassName("mask")[0]; 
				mask.style.display = "none";
				// $("#search").attr("style","display:none;"); 
		}, 
		tianjia(){  
			//选择关键词 
			var spanValues = document.getElementsByClassName("chooseword")[0].getElementsByTagName("span"); 
			for(let i=0;i<spanValues.length;i++){
				spanValues[i].onclick = ()=>{
					console.log(spanValues[i].innerText);
					let keyword = spanValues[i].innerText; 
					this.wordsArr.push(keyword) 
					this.fixedwordsHtml = '<li class="keywordLi">'+keyword +'<strong>'+'  权重'+'</strong>' +'<input type="number" name="weightNum" class="weightNum" value="1" max="10" min="1" step="1" style="width:40px">'+'<span @click="removeWords">'+'x'+'</span>'+'</li>';
					$('.ctcc ul').append(this.fixedwordsHtml); 
				} 
			} 
		},
		queding(){   
			this.tianjia; //执行点击关键词添加的函数
			var weightNum = document.getElementsByName("weightNum");
			for(let i = 0;i<weightNum.length;i++){
				this.weightsArr.push(weightNum[i].value)
			}

			//获取数据库索引下标
			var dataBase = document.getElementsByName("chooseDataBase");  
			for(let i = 0;i < dataBase.length;i++){
				if(dataBase[i].checked == true){
					this.dataBaseChecked.push(i+1)
				}
			}
			// console.log(this.dataBaseChecked);//发送给后端的数据库搜索索引
			//获取数据库索引下标结束 

			var liLength = $(".ctcc ul li").length;
			if( liLength == 0){
				this.close() 
			} 

			
			//获取添加的关键字和权重 
			for(let k = 0;k < this.searchValueArr.length;k++){ 
				this.keyWords = document.getElementsByName(k)[0].value 
				console.log(this.keyWords);
				this.keyWeight = document.getElementsByName("weight+"+k)[0].value 
				console.log(this.keyWords);
				console.log(this.keyWeight); 
				this.wordsArr.push(this.keyWords)
				this.weightsArr.push(this.keyWeight) 
			}
			
			// console.log(this.weightsArr)
			// console.log(this.wordsArr);
			this.startTime = document.getElementById("startTime").value;
			this.stopTime = document.getElementById("stopTime").value;
			for(let k = 0;k < this.wordsArr.length;k++){ //添加到主页的关键字与权重的 动态li标签
				this.finishSet += '<li>'+'<strong>'+this.wordsArr[k]+'</strong>' +'  权重：'+'<strong>'+this.weightsArr[k]+'</strong>'+'</li>'
			}
			
			for(let i = 0;i < this.wordsArr.length;i++){ //把关键词与对应权重处理成键值对的形式
				this.searchValues[this.wordsArr[i]] = this.weightsArr[i]
			}
			// console.log(this.searchValues) //发送到后端的关键字与权重

			for(let obj in this.searchValues){ 
				if(obj !== undefined && this.dataBaseChecked.length !== 0){ 
					$('.valueList').html(this.finishSet)//把添加的关键词和权重 添加到主页  
				}else{
					// document.getElementsByClassName("info")[0].style.display="block";
					// document.getElementsByClassName("info")[0].innerText = "请设置搜索关键词~"
					$('.valueList').html("请设置关键词~")
					this.$message({
						type:'warning',
						message:'请填写完整搜索信息~'
					})
					
				}
			}
			
			//获取关键词结束
			// $('#searchcon ul').html($(".ctcc ul").html());  
			this.close()
		}, 
		removeWords(){//删除按钮添加的关键词，，暂时先不设置点击删除li的功能，因为这样随机删除破坏dom结构，我不好取到最终关键词和权重发给后端=-=
			$(".buttonAdd span").parent().fadeOut(function(){
					$(this).remove();
			}); 
		}, 
		removeFixedWords(){ //删除固定推荐关键词，，时先不设置点击删除li的功能，因为这样随机删除破坏dom结构，我不好取到最终关键词和权重发给后端=-=
			$(document).on("click", ".keywordLi span", function(){ 
				$(this).parent().fadeOut(function(){
					$(this).remove();
				});
			})   
		},
		goSearch(){
			// this.startTime = document.getElementById("startTime").value;
			// this.stopTime = document.getElementById("stopTime").value;
			console.log(this.startTime);
			console.log(this.stopTime); 
			let obj={}
			obj.dataset = this.dataBaseChecked;
			obj.keyword = this.searchValues;
			obj.startTime = this.startTime;
			obj.stopTime = this.stopTime;
			console.log(obj);
			this.$emit("goSearch",obj)
		}
		},
	mounted(){
		this.tianjia()//在mounted调用解决第一次点击关键词不触发事件问题 
		this.removeFixedWords()
	},
}
</script>
<style lang="scss" scoped>
.searchSetup{
	cursor: pointer;
}
.searchButton{
	cursor: pointer;
}
.mask{
	width: 100%; 
	background-color:rgba(7, 7, 7, 0.3);
	display: none;
	top:0;
	bottom: 0;
	left: 0;
	position: fixed;
	z-index: 998; 
} 
.modal{   
	z-index: 999;
	margin-top: 5%;
	margin-left: 25%;
	width: 600px;
}
.modal-content{
	padding: 10px;
}
.chooseword span:hover{
	color: #235df0;
}
.ctcc {
    margin: 10px 15px;
}

.ctcc ul {
    list-style: none;
    margin: 0;
    margin-bottom: 5px;
    padding: 0;
    float: left;
}

.ctcc li {
    cursor: pointer;
    height: 30px;
    // line-height: 28px;
    border: solid 1px #0046ff;
    display: block;
    border-radius: 5px;
    color: #fff;
    background-color: #000e34;
    -webkit-appearance: none;
    float: left;
    margin-top: 8px;
    margin-left: 10px;
    padding: 0 2px 0 15px;
	position: relative; 
}

.ctcc li input[type='text'] {
    border: 0;
    background-color: transparent;
    border-bottom: 1px solid #333e5d;
    color: #ffcc00;
    font-size: 12px;
    font-weight: 100;
    line-height: 18px;
    padding: 0 5px;
    margin-top: 5px;
    margin-left: -5px;
    width: 70px;
	text-align: center; 
	&:focus{
		color:#fff;
	}
}

.weightValue {
    //按钮 添加关键词 的数字框样式
    margin-left: 5px;
    width: 40px;
    border: none;
    background-color: #000e34;
    border-bottom: 1px solid #333e5d;
    color: #ffcc00;
    font-size: 12px;
    font-weight: 100;
    line-height: 18px;
    padding: 0 5px;
    margin-top: 5px;
    text-align: center;
    &:focus {
        color: #000;
    }
}


.ctcc input:focus {
    background: white;
    outline: none;
    border: 2px solid #5bc0de;
}

.ctcc li span{
    background: #0046ff;
    color: white;
    height: 15px;
    width: 15px;
    line-height: 15px;
    border-radius: 50%;
    display: inline-block;
    transition: all .2s;
    text-align: center;
    opacity: 0;
    position: absolute;
    right: -5px;
    top: -5px;
}
// .ctcc li:hover span {
//     opacity: 1;
// } //删除搜索设置的X号，删除方法没有效果，暂时先不展示X号
.ctcc li strong {
    font-size: 12px;
    font-weight: 100;
} 

</style>