'use strict';
exports.main = async (event, context) => {
	
	const { comment, favorites, addOrder } = event
	
	const db = uniCloud.database();
	
	let res = null;
	if(comment) { // 评论
		res = await db.collection('comment-favorites').where({
		    'openid': openid
		}).updateAndReturn({
		    'comment': comment
		})
	} else if(favorites) { // 收藏
		res = await db.collection('comment-favorites').where({
		    // 'openid': openid
			'openid':'olwg75MhYydMfBKDJDBLvglbdXr4'
		}).update({
		    'favorites': favorites
		})
	} else if(addOrder) { // 购物车
		res = await db.collection('comment-favorites').where({
		    'openid': openid
		}).updateAndReturn({
		    'addOrder': addOrder
		})
	} else {
		res = 'err: 未传入(点赞收藏或购物车)数据'
	} 
	
	//返回数据给客户端
	return res
};
