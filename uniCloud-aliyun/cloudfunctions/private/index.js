'use strict';
exports.main = async (event, context) => {
	
	const { openid, comment, favorites, addOrder, sureOrder } = event
	
	const db = uniCloud.database();
	
	let res = null;
	if(comment) { // 评论
		res = await db.collection('comment-favorites').where({
		    'openid': openid
		}).update({
		    'comment': comment
		})
	} else if(favorites) { // 收藏
		res = await db.collection('comment-favorites').where({
		    'openid': openid
			// 'openid':'olwg75MhYydMfBKDJDBLvglbdXr4'
		}).update({
		    'favorites': favorites
		})
	} else if(addOrder) { // 购物车
		res = await db.collection('comment-favorites').where({
		    'openid': openid
		}).update({
		    'addOrder': addOrder
		})
	} else if(sureOrder) { // 订单
		res = await db.collection('comment-favorites').where({
		    'openid': openid
		}).add(sureOrder)
	}
	//返回数据给客户端
	return res
};
