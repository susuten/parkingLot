var express = require('express');
var router = express.Router();

var User = require('./../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登录
router.post("/login", function (req, res, next) {
   var param = {
       userName: req.body.userName,
       userPwd: req.body.userPwd
   }
   User.findOne(param, function (err, doc) {
       if (err) {
           res.json({
               status: "1",
               msg: err.message
           })
       } else {
           if (doc) {
               // cookie 存储
               res.cookie("userId", doc.userId, {
                   path: '/',
                   maxAge: 1000 * 60 * 60
               });
               // session 存储
               // req.session.user = doc;
               res.json ({
                   status: '0',
                   msg: '',
                   result: {
                       userName: doc.userName,
                       userId: doc.userId
                   }
               })
           }
       }
   });
});

// 注销
router.post("/logout", function (req, res, next) {
   res.cookie("userId", "", {
       path: "/",
       maxAge: -1
   })
    res.json({
        status: "0",
        msg: '',
        result: ''
    })
});

// 获取订单列表
router.post('/orders/list', function (req, res, next) {
    let userId = req.cookies.userId;
    User.findOne({userId:userId}, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            if (doc) {
                res.json ({
                    status: '0',
                    msg: '',
                    result: doc.orderList
                })
            }
        }
    });
});

// 添加订单
router.post('/orders/add', function (req, res, next) {

});

// 结算订单
router.post('/orders/update', function (req, res, next) {

});

// 删除订单
router.post('/orders/delete', function (req, res, next) {

});

// 获取用户留言
router.post('/message/list', function (req, res, next) {

});

// 增加留言
router.post('/message/add', function (req, res, next) {

});

// 删除留言
router.post('/message/delete', function (req, res, next) {

});

// 获取用户信息
router.post('/get', function (req, res, next) {

});

// 用户信息更新
router.post('/update', function (req, res, next) {

});

module.exports = router;
