<template>

	<div class="login">
	<div><img src="../../assets/img/logo2.png"></div>
	<div class="panel_body">
		<div> 
		</div>
		<div class="form-group"> 
			<div class="field field-icon-right">
				<input type="text" v-model="userName" class="input input-big" name="name" id="username" placeholder="请输入用户名" autocomplete="off">
				<span class="icon icon-user margin-small"></span>
			</div>
		</div>
		<div class="form-group">
			<div class="field field-icon-right">
				<input type="password" v-model="userPsd" class="input input-big" name="name" id="userpsd" placeholder="请输入密码">
				<span class="icon icon-user margin-small"></span>
			</div>
		</div>
		<div style="padding-top:10px;">
			<input type="button" id="button" class="button button-block text-big input-big bg-main " value="登录" @click="login()">
		</div>
	</div>
</div>

    
</template>
<script>
import {IS_EMPTY} from '../../common/utils'
import {apiLogin} from '../../http/api'
export default {
	name:'Login',
	data (){ 
		return{
			userName: '',
			userPsd: '', 
		}
	},
    methods:{ 
		login(){  
			if(!IS_EMPTY(this.userName) || !IS_EMPTY(this.userPsd)){
				this.$message({
					type:'warning',
					message:'请输入用户名或密码~'
				})
			} else {
				apiLogin({
				username: this.userName,
				password: this.userPsd,
				flag: false //存储登录状态
			})
			.then(res => {  
				res = res.data;
				if(res.code == 20000 && this.userName =='new'){
					this.flag = true
					this.$store.commit("changeLoginState",this.flag)  
						this.$router.push({
						path:'/home',
						name: 'Home'
					}) 
				} else {
					this.$message({
						type: 'error',
						message: '用户名或密码错误，请重试~'
					})
				}
			}) 
			.catch ((error) => {
				console.log(error)
				this.$message({
				type: 'info',
				message: '服务器错误，请重试~'
			}); 
			})
			}  
		}
    }, 
}
</script>
<style lang="scss"> 

</style>