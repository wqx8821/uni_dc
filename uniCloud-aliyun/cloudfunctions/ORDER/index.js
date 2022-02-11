'use strict';
exports.main = async (event, context) => {
	// 购物车信息存储
	const db = uniCloud.database();
	const collection = db.collection('');
	
	// 查
	const res = await collection.get()
	
	// 增
	
	// 删除
	
	// 更新
	
	
	//返回数据给客户端
	return event
};
