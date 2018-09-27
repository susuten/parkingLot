let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Parks = require('../models/parks');

mongoose.connect('mongodb://123.0.0.1:27017/park');

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
    let parksModel = Parks.find(params).skip(skip).limit(pageSize); // 分页：跳过skip条数据再去拿pageSize条数据
    parksModel.exec({}, function (err, doc) {
        if(err) {
            res.json ({
                status: '1',
                msg: err.message
            });
        } else {
            res.json ({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    });
});
module.exports = router;
