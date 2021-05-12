<template>
    <div>
		<!-- <search-setup></search-setup> -->
		<div class="times">
			<ul>
				<li>
					<label for="">起始时间</label>
					<input type="date" class="input input-big" name="startName" id="startName" @onchange="getSatrtTime">
				</li>
				<li>
					<label for="">终止时间 </label>
					<input type="date" name="endName" id="endName" class="input input-big" @onchange="getEndTime">
				</li>
			</ul> 
		</div> 
    </div>
</template>
<script>
// import SearchSetup from './SearchSetup' 
export default {
	name:'SearchTime', 
	data(){
		return{
			startTime: '',
			endTime: '',
		}
	},
	methods: {
		getSatrtTime(){
			this.startTime = document.getElementById("startTime").value
			console.log(this.startTime);
			
		},
		getEndTime(){
			this.endTime = $('#endTime').val()
			console.log(this.startTime);
			console.log(this.endTime);
		}
	},
	mounted(){ 
	}
}
</script>
<style scoped>
	.times{
		height: 70px;
	}
	.times ul{
		margin-top: 8px;
	} 
</style> 