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
