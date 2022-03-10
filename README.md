
克隆本项目使用流程
1、 克隆完毕后，npm i 下载依赖
2、 在uniCloud/cloudfunctions/common/wx-common/index.js
	填写对应的openid 密钥 (微信授权需要)
3、 绑定云服务空间，将数据库以及云函数部署后运行编译
4、 admin开头的云函数数据库 忽略即可 还没做
5、 本人小白，本项目就是各种缝合，编写不规范(能跑就行)


# 待完成清单

优化登录功能，完成退出功能 ✓ 

云开发打通加购至支付一条龙 ✓

全部订单页面，收藏列表组件 ✓

完成详情页，购物车底部加购 ✓

优化首页每日特惠专区， ✓

在线客服，投诉反馈 ✓

餐品评论 ✓

有机会再做：（计划）==完成后台管理系统（管理轮播，特惠，商品升降价，销量统计，历史分析，数据可视化，订单播报）==

# 模块划分

## 首页

* 菜品搜索功能 1
* 首页轮播 1
* 商品收藏 1
* 热门商品推荐  1
* 优惠活动顶部通知 1

## 菜单页

* 商品分类展示 4/ 5

* 菜品加入购物车  1

* 一键下单 1 

* 商品收藏 1

  

## 购物车

* 订单状态 1/2

* 订单总价计算 付款  1

* 订单评价 1/2

* 历史订单查询

## 我的

* 用户登录 退出  1

* 已有卡卷优惠展示 1

* 菜品收藏 1

* 意见反馈 1

* 商家联系方式

## 详情页面 

* 菜品详情介绍  1

* 菜品评价   1/2

## 卡卷页面

## 会员充值办理充值页面

## 收藏页面

# 组件拆分

1. 定位  

首页 订单页 新品页的 预购和一键购买

2. 搜索组件 内容区域 页面

   





# 后端云开发

## 云函数

### 登录功能实现

​		本程序是运行在微信的微信小程序，程序的场景是在餐厅内扫码进入程序进行点餐，所以在登录环节尽可能的简单，所以没有做注册绑定功能，而是采用微信授权的方式登录。

​		采用微信官方提供的[code2Session](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html) 方式  如下是官方原文

1. 调用 [wx.login()](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html) 获取 **临时登录凭证code** ，并回传到开发者服务器。
2. 调用 [auth.code2Session](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html) 接口，换取 **用户唯一标识 OpenID** 、 用户在微信开放平台帐号下的**唯一标识UnionID**（若当前小程序已绑定到微信开放平台帐号） 和 **会话密钥 session_key**。

之后开发者服务器可以根据用户标识来生成自定义登录态，用于后续业务逻辑中前后端交互时识别用户身份` 

1、 初次进入小程序时弹出授权

2、在我的页面手动点击头像进行登录

**页面使用云函数**   创建cloudApi.js文件统一处理云函数

`前端下的common/cloudApi.js`

```js
let token;
// 统一管理请求

function call(option){
	return new Promise((resolve,reject)=>{
		if(!option.data)option.data={};
		if(token)option.data.token = token;
		uni.showLoading();
		uniCloud.callFunction({
			name:option.name,
			data:option.data,
			success:(res)=>{
				if(res.result&&res.result.token)token = res.result.token;
				if(option.success)option.success(res);
				resolve(res);
			},
			fail:(err)=>{
				if(option.fail)option.fail(err);
				reject();
			},
			complete:()=>{
				uni.hideLoading();
				if(option.complete)option.complete();
			}
		});
	});
}

module.exports = {
	call:call
}
```

使用

```js
点击事件 获取授权
updateUserProfile(){
    uni.getUserProfile({
        // desc提示信息
        desc: '用于完善会员资料',
        success: (res) => {
            this.userInfo = Object.assign(this.userInfo,res.userInfo);
            cloudApi.call({
                name: 'updateuserinfo',
                data: {
                    userInfo: this.userInfo
                }
            })
        }
    })
}

// 页面加载时
async onLoad(options){
    uni.login({
        provider: "weixin",
        success: (res) => {
            let code = res.code;
            cloudApi.call({
                name: "login",
                data: {
                    code
                },
                success: (res) => {
                    this.userInfo = res.result
                }
            })
        },

    })
}
```



#### 创建login云函数。

```js
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
```

#### 创建公共模块

​	创建公共模块处理 token的加密解密 以及用户 appId 和appSecret的获取

```
在创建的 wx-common公共模块中导入jwt包
npm i jwtwebtoken
```

```js
const appId = "wx83e7c03d8363216d";
const appSecret = "a558af380b27439a9bf57e9259d20773"

const jwt = require('jsonwebtoken')
function getToken(openid) {
	return jwt.sign({openid:openid},'id',{expiresIn:60*60*24*7})
}
function verifyToken(token) {
	return jwt.verify(token,'id')
}
module.exports = {
	appId,
	appSecret,
	getToken,
	verifyToken
}
```

#### 编写用户信息存储更新解析云函数

创建updateuserinfo云函数

```js
'use strict';

const {verifyToken} = require("wx-common")
exports.main = async (event, context) => {
	const {userInfo, token} = event
	 
	const db = uniCloud.database();
	 // 解密的信息
	const payload = verifyToken(token)
	console.log(payload)
	// 根据id查询获取到的用户数据 dbRes
	const dbRes = await db.collection('user').where({
		openId: payload.openid
	}).update({
		nickName:userInfo.nickName,
		avatarUrl:userInfo.avatarUrl,
		gender:userInfo.gender,
		country:userInfo.country,
		province:userInfo.province,
		city:userInfo.city
	})
	//返回数据给客户端
	return dbRes.data
};
```

注册授权

支付功能

## 云数据库

用户表

商品表——收藏——上新

* 商品表 内容
* 图片 icon
* 价格 price
* 已售 sell
* 数量 num
* id

评论表



订单表——状态

会员表

# admin搭建



订单接受处理

商品上新

轮播图以及商品更改

销售额统计

订单接受打票处理