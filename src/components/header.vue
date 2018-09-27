<template>
    <div class="header">
        <div class="headerContainer clearfix">
            <div class="logo fl" title="salmon">
                salmon
            </div>
            <ul class="user fl">
                <li class="fl" @click="$goRoute('/home')">首页</li>
                <li class="fl" v-show="isLogin" @click="$goRoute('/person')">个人中心</li>
                <li class="fl" @click="$goRoute('/search')">车位查询</li>
            </ul>
            <ul class="user fr">
                <li class="logo fl noPointer" v-show="isLogin">{{userName}}</li>
                <li class="fl" v-show="!isLogin" @click="$goRoute('/login')">登录</li>
                <li class="fl" v-show="isLogin" @click="showLogoutModal">退出登录</li>
            </ul>
        </div>
        <!-- 模态框 -->
        <div class="modal" v-show="logoutModal">
            <div class="modalTips">
                <div class="modalTitle">退出登录</div>
                <div class="modalClose" @click="showLogoutModal"><img src="../../static/X.png" height="15" width="13" alt="" /></div>
                <div class="modalContent">确认要退出登录吗？</div>
                <div class="modalBtn">
                    <el-button type="primary" @click="logout">确认</el-button>
                    <el-button @click="showLogoutModal">取消</el-button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default{
        data(){
            return{
                isLogin: false,     // 是否登录
                logoutModal: false,
                // userName: '',
            }
        },
        methods:{
           // 退出登录
           logout () {
                var self = this;
                $.ajax({
                    url: self.global.BASE_URL+'/cancle.action',
                    type: 'post',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        if(res.code === self.global.SUCCESS_CODE) {
                            sessionStorage.removeItem('userName');
                            sessionStorage.removeItem('userId');
                            sessionStorage.removeItem('isLogin');
                            self.$store.commit('storeName','')
                            self.showLogoutModal();
                            self.$router.push('/login');
                            
                        } else {
                            self.$Tips2(res.message);
                        }
                    },
                    error: function(error) {
                        console.log(error);
                    }
                })
           },
           // 控制显示退出登录模态框
           showLogoutModal() {
                this.logoutModal = !this.logoutModal
           },
        },
        created(){
            // this.userName = sessionStorage.getItem('userName');
            this.$store.commit('storeName',sessionStorage.getItem('userName'))
            if(sessionStorage.getItem('isLogin')!='' && sessionStorage.getItem('isLogin')!= null) {
                this.isLogin = sessionStorage.getItem('isLogin');
            }
        },
        computed:{
            userName(){
                return this.$store.state.userName
            }
        },
    }
</script>
<style scoped>
    @import '../assets/css/modal.css';
    .header {
        height: 60px;
        min-width: 1230px;
        background-color: #fff;
        /*box-shadow:0px 1px 20px 0px rgba(170,170,170,0.3);*/
        box-shadow: 0 4px 8px 0 rgba(7,17,27,.1);
        margin-bottom: 50px;

    }
    .headerContainer {
        width: 1230px;
        height: 100%;
        margin: 0 auto;
        color: #999;
    }
    .logo {
        padding: 0 10px;
        font-size: 22px;
        line-height: 60px;
        /*color: #FF4444;*/
        color: #F78E00;
        cursor: pointer;
    }
    .user li {
        line-height: 60px;
        padding: 0 10px;
        cursor: pointer;
    }
    .user li:hover {
        color: #666;
        background-color: #f1eded;
    }
    .user .noPointer {
        cursor: default;
    }
</style>