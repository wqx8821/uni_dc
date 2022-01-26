'use strict';
// 公共云函数模块引入
const {appId,appSecret,getToken} = require('wx-common')

exports.main = async (event, context) => {
	// 初始化数据库
	const db = uniCloud.database();
	// event中获取用户code
	const { code } = event;
	const res = await uniCloud.httpclient.request(
		"https://api.weixin.qq.com/sns/jscode2session?appid="+appId+"&secret="+appSecret+"&js_code="+code+"&grant_type=authorization_code",
		{
			dataType:"json"
		}
	)
	// 获取用户openid
	const openid = res.data.openid;
	// 在users表中查询用户信息
	let dbRes = await db.collection("users").where({
		openid:openid
	}).get();
	// getToken 通过jwt对openid加盐 得到token
	let token = getToken(openid);
	
	// 创建按用户数据模型
	let userData;
	if(dbRes.affectedDocs<=0){
		userData = {
			nickName:"点击登录",
			avatarUrl:"",
			gender:0,
			country:"",
			province:"",
			city:""
		}
		//不要泄露用户的openid
		await db.collection("users").add({openid:openid,...userData});
	}else{
		userData = dbRes.data[0];
		//不要泄露用户的openid
		delete userData["openid"];
	}
	// 将token信息 拼接到用户表中
	userData["token"]=token;
	
	return userData;
};
