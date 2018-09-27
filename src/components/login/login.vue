<template>
    <div class="bg">
        <div class="login">
            <!-- <img src="../../../static/logo1.png" alt="logo" class="logo"/> -->
            <div class="logo">salmon停车场登录</div>
            <div class="userBox">
                <img src="../../../static/login_per.png" alt="" />
                <input type="text" placeholder="请输入用户名" v-model="name" autocomplete="off"/>
            </div>
            <div class="userBox">
                <img src="../../../static/login_pwd.png" alt="" />
                <input type="text" placeholder="输入您的密码" v-model="password" autocomplete="off" onfocus="this.type='password'" />
            </div>
            <div class="bigBtn" @click="login">登录</div>
            <div class="link" @click="$goRoute('/register')">不是成员？加入我们</div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                name: '',
                password: '',
            }
        },
        methods:{
            // 登录
            login () {
                if(this.name == '') {
                    this.$Tips2("请输入用户名");
                    return;
                } 
                if(this.password == '') {
                    this.$Tips2("请输入登录密码");
                    return;
                }
                var self = this;
                var loginData = new FormData();
                loginData.append('name', this.name);
                loginData.append('password', this.password);
                $.ajax({
                    url: self.global.BASE_URL+'/us/salmon/user/login.action',
                    type: 'post',
                    data: loginData,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        if(res.code === self.global.SUCCESS_CODE) {
                            sessionStorage.setItem('userName',res.data.user.name);
                            self.$store.commit('storeName',res.data.user.name)
                            sessionStorage.setItem('userId',res.data.user.id);
                            sessionStorage.setItem('isLogin', true);
                            self.$router.push('/home');
                        } else {
                            self.$Tips2(res.message);
                        }
                    },
                    error: function(error) {
                        console.log(error);
                    }
                })
            },
        },
        created(){
            
        }
    }
</script>

<style scoped>
    .bg {
        height: 100%;
        background: url(../../../static/login_bg.jpg) no-repeat;
         -webkit-background-size: 100% 100%;
        background-size: 100% 100%; 
        position: relative;
    }
    .login {
        width: 370px;
        height: 370px;
        background:rgba(255,255,255,.8);
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -185px;
        margin-top: -185px;
    }
    /*.logo {
        width: 187px;
        height: 40px;
        padding: 33px 95px 46px 88px;
    }*/
    .logo {
        height: 120px;
        line-height: 120px;
        text-align: center;
        font-size: 22px;
    }
    .userBox {
        position: relative;
        margin-left: 35px;
    }
    .userBox > img {
        width: 26px;
        height: 26px;
        position: absolute;
        top: 10px;
        left: 12px;

    }
    .userBox > input {
        width: 251px;
        height: 46px;
        background-color: #fff;
        border-radius: 10px;
        border: none;
        padding-left: 49px;
        font-size: 14px;
    }
    .userBox > input:last-child{
        border-top: 1px solid #DDD;
    }
    .bigBtn {
        width: 299px;
        height: 46px;
        /*background-color: #016ECD;*/
        background-color: #7c9599;
        color: #fff;
        text-align: center;
        line-height: 46px;
        border-radius: 10px;
        margin: 33px 35px 0px 36px;
        cursor: pointer;
    }
    .bigBtn:hover {
        background-color: #acc7cb;
    }
    .link {
        line-height: 54px;
        text-align: center;
        cursor: pointer;
    }
    .link:hover {
        color: #666;
    }
</style>