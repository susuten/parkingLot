// status: 0 请求成功   1 请求失败    2 其他类型错误
require('./../util/util')
let express = require('express');
let router = express.Router();

let User = require('./../models/user');
let Park = require('./../models/parks');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登录
router.post("/login", function (req, res, next) {
   let param = {
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
           } else {
               res.json ({
                   status: '2',
                   msg: '账号或密码错误',
                   result: ''
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
    console.log("获取订单列表");
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
    let userId = req.cookies.userId,
        total = req.body.total,
        parkId = req.body.parkId;
    User.findOne({userId: userId}, function (err1, doc1) {
        if (err1) {
            res.json({
                status: "1",
                msg: err1.message,
                result: ''
            })
        } else {
            Park.findOne({parkId: parkId}, function (err2, doc2) {
                if (err2) {
                    res.json({
                        status: "1",
                        msg: err2.message,
                        result: ''
                    })
                } else {
                    if (doc2) {
                        // 生成订单号
                        let platform = '622';

                        let r1 = Math.floor(Math.random() * 10);
                        let r2 = Math.floor(Math.random() * 10);

                        let sysDate = new Date().Format('yyyyMMddhhmmss')
                        let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
                        let code = platform + r1 + sysDate + r2;
                        console.log("code:" + code);
                        let order = {
                            code: code,
                            parkName: doc2.parkName,
                            total: total,
                            status: 0,
                            createDate: createDate
                        };
                        doc1.orderList.push(order);
                        doc2.parkStatus = 1;    // 改变状态
                        console.log(33, doc2);
                        // 保存订单
                        doc1.save(function (err3, doc3) {
                            if (err3) {
                                res.json({
                                    status: "1",
                                    msg: err3.message,
                                    result: ''
                                })
                            } else {
                                // 保存车位预定状态
                                doc2.save(function (err4, doc4){
                                    if (err4) {
                                        res.json({
                                            status: "1",
                                            msg: err4.message,
                                            result: ''
                                        })
                                    } else {
                                        console.log("save");
                                        res.json({
                                            status: "0",
                                            msg: '',
                                            result: {
                                                code: order.code,
                                                total: order.total
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    })
});

// 结算订单
router.post('/orders/update', function (req, res, next) {
    let userId = req.cookies.userId,
        code = req.body.code;
    User.findOne({"userId": userId},function(err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ''
            });
        } else {
            try {
                doc.orderList.forEach( (item) => {
                    console.log(item.code, code);
                    // 执行操作 并退出循环 用break无效 试着用try catch
                    if (item.code == code) {
                        item.status = 1;
                        console.log("item.status:" + item.status);
                        throw "jump out"
                    }
                });
            } catch (e) {
                console.log(e);
            }
            console.log("执行保存操作");
            doc.save(function(err2, doc2) {
               if (err2) {
                   res.json({
                       status: "1",
                       msg: err2.message,
                       result: ''
                   });
               } else {
                   console.log(99, doc2);
                   res.json({
                       status: "0",
                       msg: '',
                       result: 'success'
                   });
               }
            });
        }
    });
});

// 删除订单
router.post('/orders/delete', function (req, res, next) {
    let userId = req.cookies.userId;
    let code = req.body.code;
    User.update({userId:userId},{
        $pull:{
            'orderList':{
                'code': code
            }
        }
    }, function (err, doc) {
        if (err) {
            res.json ({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            res.json ({
                status: '0',
                msg: '',
                result: ''
            });
        }
    });
});

// 获取用户留言
router.post('/message/list', function (req, res, next) {
    let userId = req.cookies.userId;
    User.findOne({userId: userId}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: doc.messageList
            })
        }
    })
});

// 增加留言
router.post('/message/add', function (req, res, next) {
    let userId = req.cookies.userId,
        content = req.body.content;
    User.findOne({userId: userId}, function (err, doc) {
        if (err) {
            res.json ({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            let platform = '822';

            let r1 = Math.floor(Math.random() * 10);
            let r2 = Math.floor(Math.random() * 10);

            let sysDate = new Date().Format('yyyyMMddhhmmss')
            let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
            let msgId = platform + r1 + sysDate + r2;

            let message = {
                msgId: msgId,
                content: content,
                createDate: createDate,
                answer: '',
                adminName: '',
                answerDate: ''
            };
            console.log(444,doc);
            console.log(555,doc.orderList);
            console.log(666,doc.messageList);
            doc.messageList.push(message);

            doc.save(function(err2, doc2) {
                if (err2) {
                    res.json ({
                        status: '1',
                        msg: err2.message,
                        result: ''
                    })
                } else {
                    res.json ({
                        status: '0',
                        msg: '',
                        result: 'success'
                    })
                }
            })
        }
    })
});

// 删除留言
router.post('/message/delete', function (req, res, next) {
    let userId = req.cookies.userId,
        msgId = req.body.msgId;
    User.findOne({userId: userId}, {
        $pull:{
            'messageList':{
                'msgId': msgId
            }
        }
    }, function(err, doc) {
        if (err) {
            res.json ({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {

        }
    })
});

// 获取用户信息
router.post('/get', function (req, res, next) {
    let userId = req.cookies.userId;
    User.findOne({userId:userId}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: doc
            });
        }
    })
});

// 用户信息更新
router.post('/update', function (req, res, next) {
    let userId = req.cookies.userId,
        userName = req.body.userName,
        phone= req.body.phone,
        plateNum = req.body.plateNum;
    User.update({"userId":userId}, {
        "userName": userName,
        "phone": phone,
        "plateNum": plateNum
    }, function (err, doc) {
        if (err) {
            res.json ({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: 'success'
            })
        }
    })
});

// 修改密码
router.post('/updatePwd', function (req, res, next) {
    let userId = req.cookies.userId,
        oldPw = req.body.oldPw,
        newPw = req.body.newPw;
        console.log(oldPw, newPw);
    User.findOne({userId:userId}, function (err, doc) {
        if (err) {
            res.json ({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            if (doc.userPwd == oldPw) { // 原密码输入正确
                // 更新密码
                User.update({userId:userId},{
                    $set:{
                        userPwd: newPw
                    }
                }, function (err, doc) {
                    if (err) {
                        res.json({
                            status: '1',
                            msg: err.message,
                            result: ''
                        });
                    } else {
                        res.json({
                           status: '0',
                           msg: '',
                           result: 'success'
                        });
                    }
                });
            } else {    // 原密码输入错误
                res.json({
                    status: '2',
                    msg: '原密码输入错误',
                    result: ''
                })
            }

        }
    })

});

module.exports = router;
