import cloudApi from "./cloudApi.js"

var userInfo;

function login(){
	return new Promise((resolve,reject)=>{
		if(isLogin()){
			resolve(userInfo);
		}else{
			uni.login({
				provider:"weixin",
				success: (res) => {
					cloudApi.call({
						name:"login",
						data:{
							code:res.code
						},
						success: (res) => {
							userInfo = res.result;
							resolve(userInfo);
						},
						fail: (err) => {
							reject();
						}
					})
				}
			})
		}
	})
}

function logout(){
	userInfo = null;
}

function isLogin(){
	return userInfo;
}

function getUserInfo(){
	return userInfo;
}

function updateUser(userInfo){
	cloudApi.call({
		name:"updateuserinfo",
		data:{
			userInfo:userInfo
		}
	})
}

module.exports = {
	isLogin,
	logout,
	getUserInfo,
	updateUser,
	login
}