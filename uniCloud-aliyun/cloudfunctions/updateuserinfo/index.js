'use strict';

const {verifyToken} = require("wx-common")
exports.main = async (event, context) => {
	const {userInfo, token} = event
	 
	const db = uniCloud.database();
	 // 解密的信息
	const payload = verifyToken(token)
	// console.log(payload)
	
	const dbRes = await db.collection('users').where({
		openid: userInfo.openid
	}).update({
		nickName:userInfo.nickName,
		avatarUrl:userInfo.avatarUrl,
		gender:userInfo.gender,
		country:userInfo.country,
		province:userInfo.province,
		city:userInfo.city,
		token: userInfo.token
	})
	//返回数据给客户端
	return dbRes.data
};
