const appId = "";
const appSecret = ""

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