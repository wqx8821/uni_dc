const appId = "wx83e7c03d8363216d";
const appSecret = "4d2c4d7bb0f108804a4f61fa970220ab"

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