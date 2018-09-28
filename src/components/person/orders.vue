<template>
    <div class="container2">
       <div class="perTitle">我的订单</div>
       <div class="content">
           <table class="ordersTable">
               <tr>
                   <th>订单编号</th>
                   <th>下单时间</th>
                   <th>车牌号</th>
                   <th>车位编号</th>
                   <th>车位价格</th>
                   <th>应付金额</th>
                   <th>状态</th>
                   <th>操作</th>
               </tr>
               <tr v-for="orderItem in ordersList">
                   <td>{{orderItem.code}}</td>
                   <td>{{orderItem.createDate != null ? toTime(orderItem.createDate) : ''}}</td>
                   <td>{{orderItem.user.plateNum}}</td>
                   <td>{{orderItem.park.name}}</td>
                   <td class="redColor">￥{{orderItem.total}}</td>
                   <td class="redColor">￥{{orderItem.total}}</td>
                   <td>
                        <span v-if="orderItem.status===0" class="redColor">待付款</span>
                        <span v-if="orderItem.status===1" class="orangeColor">订单完成</span>
                   </td>
                   <td>
                        <div v-if="orderItem.status===0" @click="showUpdateModal(orderItem.id)">结算</div>
                        <!-- <div v-if="orderItem.status===0" @click="updateOrders(orderItem.id)">结算</div> -->
                        <div v-if="orderItem.status===1" @click="showDeleteModal(orderItem.id)">删除</div>
                   </td>
               </tr>
           </table>
       </div>
        <!-- 删除模态框 -->
        <div class="modal" v-show="deleteModal">
            <div class="modalTips">
                <div class="modalTitle">删除订单</div>
                <div class="modalClose" @click="showDeleteModal"><img src="../../../static/X.png" height="15" width="13" alt="" /></div>
                <div class="modalContent">确认要删除订单吗？</div>
                <div class="modalBtn">
                    <el-button type="primary" @click="deleteOrders">删除</el-button>
                    <el-button @click="showDeleteModal">取消</el-button>
                </div>
            </div>
        </div>
        <!-- 结算模态框 -->
        <div class="modal" v-show="updateModal">
            <div class="modalTips">
                <div class="modalTitle">结算订单</div>
                <div class="modalClose" @click="showUpdateModal"><img src="../../../static/X.png" height="15" width="13" alt="" /></div>
                <div class="modalContent">确认要结算该订单吗？</div>
                <div class="modalBtn">
                    <el-button type="primary" @click="updateOrders">结算</el-button>
                    <el-button @click="showUpdateModal">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDate} from '../../assets/js/date.js'
    export default{
        data(){
            return{
                deleteModal: false,
                updateModal: false,
                ordersList: [],  // 订单列表
                userId: '',
                orderId: '',
            }
        },
        methods:{
            // 时间转换
            toTime(time){
                var date=new Date(time)
                return formatDate(date,'yyyy-MM-dd')
            },
            // 获取订单列表
            getOrders () {
                this.$http("/users/orders/list").then((res) => {
                    if (res.data.status == '0') {
                        this.ordersList = res.data.result.orderList
                    }
                })
            },
            /*getOrders () {
                console.log("获取订单");
                var self = this;
                var userData = new FormData();
                userData.append('userId',this.userId);
                $.ajax({
                    url: self.global.BASE_URL+'/us/salmon/orders/list.action',
                    type: 'post',
                    data: userData,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        console.log(77, res);
                        if(res.code === self.global.SUCCESS_CODE) {
                            self.ordersList = res.data.noticeList;
                            console.log(88,res.data.noticeList);
                        } else {
                            self.$Tips2(res.message);
                        }
                    },
                    error: function(error) {
                        console.log(error);
                    }
                })
            },*/
            justForTest() {
                console.log("justForTest");
            },
            // 结算订单
            updateOrders() {
                var self = this;
                var myData = new FormData();
                myData.append('id', this.orderId);
                $.ajax({
                    url: self.global.BASE_URL+'/us/salmon/orders/update.action',
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
                            self.$Tips1("支付成功");
                            self.showUpdateModal();
                            self.getOrders();
                        } else {
                            self.$Tips2(res.message);
                        }
                    },
                    error: function(error) {
                        console.log(error);
                    }
                })
            },

            // 删除订单
            deleteOrders () {
                var self = this;
                var myData = new FormData();
                myData.append('id', this.orderId);
                $.ajax({
                    url: self.global.BASE_URL+'/us/salmon/orders/delete.action',
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
                            self.$Tips1("删除订单成功");
                            self.showDeleteModal();
                            self.getOrders();
                        } else {
                            self.$Tips2(res.message);
                        }
                    },
                    error: function(error) {
                        console.log(error);
                    }
                })
            },
            // 控制显示结算订单模态框
            showDeleteModal(orderId) {
                this.deleteModal = !this.deleteModal;
                if (orderId != '') {
                    this.orderId = orderId;
                }
           },
           // 控制显示结算订单模态框
           showUpdateModal(orderId) {
              this.updateModal = !this.updateModal;
                if (orderId != '') {
                    this.orderId = orderId;
                }
           }
        },
        created(){
          this.userId = sessionStorage.getItem('userId');
          this.getOrders();
          console.log("你执行了吗？")
          this.justForTest();

        },
    }
</script>
<style scoped>
    @import '../../assets/css/modal.css';
    .perTitle {
        height: 60px;
        background-color: #f7f7f7;
        line-height: 60px;
        border: 1px solid #ddd;
        font-size: 18px;
        padding-left: 20px;
    }
    .content {
        padding: 20px;
    }
    .ordersTable th{
        text-align: center;
        background-color: #F4F7FC;
        width: 200px;
        height: 36px;
        line-height: 36px;
        border: 1px solid #EAEAEA;
        font-size: 14px;
    }
    .ordersTable th:last-child {
        width: 80px;
    }
    .ordersTable td {
        padding: 10px;
        border: 1px solid #EAEAEA;
        font-size: 14px;
    }
    .ordersTable td:last-child {
        text-align: center;
        cursor: pointer;
    }
    .ordersTable td:last-child:hover {
        color: #F4A019;
    }
    .ordersTable td div {
        width: 100%;
        height: 100%;
    }
    .ordersTable tr:hover {
        background-color: #f5f5f5;
    }
    .redColor {
        color: #f74342;
    }
    .orangeColor {
        color: #F4A019;
    }
    .weight {
        font-weight: bold;
    }
</style>
