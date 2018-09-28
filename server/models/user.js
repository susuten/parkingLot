let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "orderList": Array,
    "messageList": Array
});

// 第三个参数 关联数据库中集合的名字 如果没写的话，默认会找User + s 这样子去找集合
module.exports = mongoose.model('User', userSchema, 'users');
