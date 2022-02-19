'use strict';
exports.main = async (event, context) => {
	// 连接数据请求数据
	const db = uniCloud.database();
	const collection = db.collection('dc-foods');
	const res = await collection.get()
	let data = [...res.data]
	// let data = [...JSON.parse(JSON.stringify(res.data))]
	
	if(!data.length) {data = ['服务端数据错误']} // 数据不存在时
	// 根据客户端过滤出首页的每日特惠商品
	if(event.type === '今日特惠') { 
		data = data.filter(res=> res.category === '今日特惠')
	} else if(event.type){
		// tyre不为特惠且存在代表是进入详情页请求 根据菜品名查询数据
		data = data.find((res) =>{
			return res.name === event.type
		})
		
		if(event.openid) { // 同步收藏状态
			const res = await db.collection('comment-favorites').where({
				openid: event.openid
			}).get()
			console.log(res);
			// 返回收藏列表
			if(event.type === '收藏列表') {
				data = res.data[0].favorites
			} else { // 同步详情页收藏状态
				res.data[0].favorites.forEach(res => {
					if(res._id === data._id) {
						data.collect = true
					}
				})
			}
		}
	}
	
	//返回餐品数据给客户端
	return data
};
