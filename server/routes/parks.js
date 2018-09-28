let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Parks = require('../models/parks');

mongoose.connect('mongodb://123.0.0.1:27017/park', { useNewUrlParser: true });

mongoose.connection.on('connected', function () {
    console.log('MongoDB connected success.');
});
mongoose.connection.on('error', function () {
    console.log('MongoDB connected fail.');
});
mongoose.connection.on('disconnected', function () {
    console.log('MongoDB connected disconnected.');
});

router.get("/", function (req, res, next) {
    let pageNum = parseInt(req.param('pageNum'));
    let pageSize = parseInt(req.param('pageSize'));
    let parkStatus = req.param('parkStatus'); // 1为已约，0为未约，3为全部
    let skip = (pageNum - 1) * pageSize;
    let params = {};
    if (parkStatus == '1' || parkStatus == '0') {
        params = {'parkStatus':parkStatus};
    }
    let getParksTotalModel = Parks.find(params);
    let total = 0; // 总条数
    let parksModel = Parks.find(params).skip(skip).limit(pageSize); // 分页：跳过skip条数据再去拿pageSize条数据
    getParksTotalModel.exec({}, function (err, doc) {
        if (err) {
            console.log(err.message);
        } else {
            total = doc.length;
            if (total) {
                parksModel.exec({}, function (err, doc) {
                    if(err) {
                        res.json ({
                            status: '1',
                            msg: err.message
                        });
                    } else {

                        console.log(2,total);
                        res.json ({
                            status: '0',
                            msg: '',
                            result: {
                                count: doc.length,
                                total:total,
                                list: doc
                            }
                        });
                    }
                });
            }
        }
    });
    /*parksModel.exec({}, function (err, doc) {
        if(err) {
            res.json ({
                status: '1',
                msg: err.message
            });
        } else {

            console.log(2,total);
            res.json ({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    total:total,
                    list: doc
                }
            });
        }
    });*/
});
module.exports = router;
