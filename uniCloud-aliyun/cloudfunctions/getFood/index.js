'use strict';
exports.main = async (event, context) => {
	// 连接数据请求数据
	const db = uniCloud.database();
	const collection = db.collection(event.name || 'dc-goods');
	const res = await collection.get()
	let data = [...JSON.parse(JSON.stringify(res.data))]
	
	if(!data.length) {data = ['服务端数据错误']} // 数据不存在时
	
	// 根据客户端过滤出首页的每日特惠商品
	if(event.type === '每日特惠') { 
		data.find((res) => {
			return res.category_name === '每日特惠'
		})
	} else if(event.type){
	// tyre不为特惠且存在代表是进入详情页请求 根据菜品名查询数据
		const result = await collection.where({
			'dc_foods.foods.name': event.type
		}).limit(1).get()
		// 处理查询的数据 获取指定内容
		data = [...JSON.parse(JSON.stringify(result.data[0].dc_foods.foods))]
	}
	
	//返回数据给客户端
	return data
};
