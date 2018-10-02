<template>
    <div class="container2">
       <div class="perTitle">我的订单</div>
       <div class="content">
           <table class="ordersTable">
               <tr>
                   <th>订单编号</th>
                   <th>下单时间</th>
                   <!--<th>车牌号</th>-->
                   <th>车位编号</th>
                   <th>车位价格</th>
                   <th>应付金额</th>
                   <th>状态</th>
                   <th>操作</th>
               </tr>
               <tr v-for="orderItem in ordersList">
                   <td>{{orderItem.code}}</td>
                   <td>{{orderItem.createDate}}</td>
                   <!--<td>{{orderItem.createDate != null ? toTime(orderItem.createDate) : ''}}</td>-->
                   <!--<td>{{orderItem.user.plateNum}}</td>-->
                   <td>{{orderItem.parkName}}</td>
                   <td class="redColor">{{orderItem.total | currency('￥')}}</td>
                   <td class="redColor">{{orderItem.total | currency('￥')}}</td>
                   <td>
                        <span v-if="orderItem.status=='0'" class="redColor">待付款</span>
                        <span v-if="orderItem.status=='1'" class="orangeColor">订单完成</span>
                   </td>
                   <td>
                        <div v-if="orderItem.status=='0'" @click="showUpdateModal(orderItem.code, orderItem.parkId)">结算</div>
                        <div v-if="orderItem.status=='1'" @click="showDeleteModal(orderItem.code)">删除</div>
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
    import {formatDate} from '../../assets/js/date'
    import {currency} from '../../assets/js/currency'
    export default{
        data(){
            return{
                deleteModal: false,
                updateModal: false,
                ordersList: [],  // 订单列表
                userId: '',
                code: '',
                parkId: '',
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
                this.$http.post("/users/orders/list").then((res) => {
                    console.log("status:" + res.data.status)
                    if (res.data.status == '0') {
                        this.ordersList = res.data.result
                        console.log(99, this.ordersList);
                    } else {
                        this.$Tips2(res.data.msg);
                    }
                })
            },

            // 订单结算
            updateOrders() {
                this.$http.post('/users/orders/update',{
                    code: this.code,
                    parkId: this.parkId
                }).then((res) => {
                    if (res.data.status === '0') {
                        this.$Tips1("支付成功");
                        this.showUpdateModal();
                        this.getOrders();
                    } else {
                        this.$Tips2(res.data.msg);
                    }
                })
            },

            // 删除订单
            deleteOrders () {
                this.$http.post('/users/orders/delete',{
                    code: this.code
                }).then((res) => {
                    if (res.data.status === '0') {
                        this.$Tips1("删除订单成功");
                        this.showDeleteModal();
                        this.getOrders();
                    } else {
                        this.$Tips2(res.data.msg);
                    }
                })
            },
            // 控制显示结算订单模态框
            showDeleteModal(code) {
                this.deleteModal = !this.deleteModal;
                if (code != '') {
                    this.code = code;
                }
           },
           // 控制显示结算订单模态框
           showUpdateModal(code, parkId) {
              this.updateModal = !this.updateModal;
                if (code != '') {
                    this.code = code;
                    this.parkId = parkId;
                }
           }
        },
        // 过滤器
        filters: {
            currency: currency
        },
        created(){
          this.userId = sessionStorage.getItem('userId');
          this.getOrders();
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
