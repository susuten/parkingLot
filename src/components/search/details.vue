<template>
    <div class="container">
        <div class="title">车位详情</div>
        <div class="content clearfix">
            <div class="mapBox fl">
                <!-- <Map></Map> -->
                <!-- <div id="allmap" ref="allmap"></div> -->
                <div id="allmap"></div>
            </div>
            <div class="mapMsg fl">
                <div class="msg1">车位编号：{{details.name}}</div>
                <div class="msg2">价格：<span class="money">￥{{details.price}}</span></div>
                <div class="msg2">推荐路线：无</div>
                <div class="bigBtn orange" @click="addOrders()">立即预约</div>
            </div>
        </div>
    </div>
</template>

<script>
    // import Map from '@/components/map.vue'
    export default{
        data(){
            return{
                parkId: '',
                details: '',
                isLogin: false, // 是否登录
            }
        },
        methods:{
            // 获取车位详情
            getDetails() {
                var self = this;
                var secUrl = '';
                var parkData = new FormData();
                parkData.append('id', this.parkId);
                if (this.isLogin == true) { // 登录用户
                    secUrl = '/us/salmon/park/get.action';
                } else {    // 普通用户
                    secUrl = '/salmon/vspark/get.action';
                }
                $.ajax({
                    url: self.global.BASE_URL + secUrl,
                    type: 'post',
                    data: parkData,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        if(res.code === self.global.SUCCESS_CODE) {
                            self.details = res.data.park;
                        } else {
                            self.$Tips2(res.message);
                        }
                    },
                    error: function(error) {
                        console.log(error);
                    }
                })
            },
            // 添加订单
            /*addOrders() {
                if (this.isLogin == false) {
                    console.log(88, this.isLogin);
                    this.$Tips2("请先登录");
                    return;
                }
                var self = this;
                var myData = new FormData();
                myData.append('userId', this.userId);
                myData.append('parkId', this.parkId);
                myData.append('total', this.details.price);
                $.ajax({
                    url: self.global.BASE_URL+'/us/salmon/orders/add.action',
                    type: 'post',
                    data: myData,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        if(res.code === self.global.SUCCESS_CODE) {
                            self.$goRoute('/person/orders');
                        } else {
                            self.$Tips2(res.message);
                        }
                    },
                    error: function(error) {
                        console.log(error);
                    }
                })
            },*/
            // 添加订单
            addOrders() {
                if (this.isLogin == false) {
                    console.log(88, this.isLogin);
                    this.$Tips2("请先登录");
                    return;
                }
                var self = this;
                var myData = new FormData();
                myData.append('userId', this.userId);
                myData.append('parkId', this.parkId);
                myData.append('total', this.details.price);
                $.ajax({
                    url: self.global.BASE_URL+'/us/salmon/orders/add.action',
                    type: 'post',
                    data: myData,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        if(res.code === self.global.SUCCESS_CODE) {
                            self.$goRoute('/person/orders');
                        } else {
                            self.$Tips2(res.message);
                        }
                    },
                    error: function(error) {
                        console.log(error);
                    }
                })
            },
            // 根据浏览器定位
            showMap3() {
                // 百度地图API功能
                let map = new BMap.Map("allmap");
                let self = this;
                let point = new BMap.Point(113.262232,23.154345);
                map.centerAndZoom(point,12);
                let geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        let mk = new BMap.Marker(r.point);
                        map.addOverlay(mk);
                        map.panTo(r.point);
                        // alert('您的位置：'+r.point.lng+','+r.point.lat);
                    }
                    else {
                        self.$Tips2('failed'+this.getStatus());
                    }
                },{enableHighAccuracy: true})
            },
        },
        created() {
            this.parkId = sessionStorage.getItem('parkId');
            this.userId = sessionStorage.getItem('userId');
            if (sessionStorage.getItem('isLogin') != '' && sessionStorage.getItem('isLogin') != null) {
                this.isLogin = sessionStorage.getItem('isLogin');
            }
            console.log("isLogin:" + this.isLogin);
            this.getDetails();
        },
        mounted(){
          this.showMap3()
        }
    }
</script>
<style scoped>
    .container {
        width: 1230px;
        margin: 0 auto;
    }
    .title {
        padding-bottom: 30px;
    }
    .mapBox {
        width: 750px;
        height: 600px;
        background-color: #fff;
        margin-right: 30px;
        box-sizing: border-box;
        padding: 20px;
        box-shadow:0px 1px 20px 0px rgba(170,170,170,0.3);
    }
    .mapMsg {
        width: 450px;
        padding: 20px;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow:0px 1px 20px 0px rgba(170,170,170,0.3);
    }
    #allmap {
        width: 710px;
        height: 560px;
    }
    .msg1 {
        font-size: 18px;
        line-height: 54px;
    }
    .msg2 {
        line-height: 48px;
    }
    p{margin-left:5px; font-size:14px;}

</style>
