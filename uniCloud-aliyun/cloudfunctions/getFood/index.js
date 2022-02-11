'use strict';
exports.main = async (event, context) => {
	// 连接数据请求数据
	const db = uniCloud.database();
	const collection = db.collection(event.name || 'dc-foods');
	const res = await collection.get()
	let data = [...JSON.parse(JSON.stringify(res.data))]
	
	if(!data.length) {data = ['服务端数据错误']} // 数据不存在时
	// 根据客户端过滤出首页的每日特惠商品
	if(event.type === '今日特惠') { 
		data = data.filter(res=> res.category === '家常菜')
	} else if(event.type){
		// tyre不为特惠且存在代表是进入详情页请求 根据菜品名查询数据
		data = data.find((res) =>{
			return res.name === event.type
		})
	}
	
	//返回餐品数据给客户端
	return data
};
