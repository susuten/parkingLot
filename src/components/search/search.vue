<template>
    <div class="container">
        <div class="top">
            <span>筛选条件</span>
            <select class="mySelect" v-model="type" @change="changeSelect()">
                <option value="3">全部</option>
                <option value="0">可预约</option>
                <option value="1">已预约</option>
            </select>
        </div>
        <div class="content">
            <ul class="carList clearfix">
                <li class="carItem fl" v-for="parkItem in parkList">
                    <div class="carBox">
                        <img class="empty" src="../../../static/cw.png" height="165" width="117" alt="" v-show="parkItem.parkStatus==0" @click="$goRoute('/details','parkId',parkItem.parkId, 'parkName', parkItem.parkName, 'parkPrice', parkItem.parkPrice)"/>
                        <img class="noEmpty" src="../../../static/cw2.png" height="165" width="117" alt="" v-show="parkItem.parkStatus==1"/>
                    </div>
                    <div class="carName">{{parkItem.parkName}}</div>
                    <div class="carCost">￥{{parkItem.parkPrice}}</div>
                </li>
            </ul>
            <fenYe :total='total' :pageSize="pageSize" :currentPage="pageNum" @pagechange="pagechange"></fenYe>
        </div>
    </div>
</template>

<script>
    import fenYe from '@/components/fenYe.vue'   // 引入分页组件
    export default{
        data(){
            return{
                isEmpty: true,
                isLogin: false, // 是否已经登录
                parkList: [],

                pageSize: 14,
                pageNum: 1,
                total: 10,

                type: 3,
            }
        },
        methods:{
            // 分页
            pagechange(pageNum) {
                this.pageNum = pageNum;
                this.getParkList()    // 调用获取列表的函数
            },
            // 获取车位列表
            getParkList() {
                let params = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    parkStatus: this.type
                };
                this.$http.get('/parks/list', {
                    params: params
                }).then((res) => {
                    if (res.data.status == '0') {
                        this.parkList = res.data.result.list;
                        this.total = res.data.result.total;
                    } else {
                        this.$Tips2(res.data.message);
                    }
                })
            },
            changeSelect () {
                this.pageSize = 14;
                this.pageNum = 1;
                this.total = 10;
                this.getParkList();
            }
        },
        created(){
            this.isLogin = sessionStorage.getItem('isLogin');
            this.getParkList(this.type);
        },
        components: {
            fenYe,
        }
    }
</script>
<style scoped>
    .container {
        width: 1230px;
        height: 100%;
        margin: 0 auto;
    }
    .top {
        margin-bottom: 30px;
    }
    .mySelect {
        width: 120px;
        height: 36px;
        border: 1px solid #ddd;
        padding-left: 10px;
        margin-left: 10px;
    }
    .carItem {
        margin: 0 30px 30px 0;
    }
    .carItem img {
        width: 117px;
        height: 150px;
    }
    .empty {
        cursor: pointer;
    }
    .carBox {
        padding: 10px;
        background-color: #fff;
    }
    .carBox:hover {
        box-shadow: 5px 0px 10px 0px rgba(170,170,170,0.8);
    }
    .carName {
        padding: 10px 0;
        text-align: center;
        font-size: 14px;
        color: #666;
    }
    .carCost {
        text-align: center;
        color: #FF4444;
        font-size: 14px;
    }
</style>
