<template>
    <div class="bg">
        <div class="register">
            <!-- <img src="../../../static/logo1.png" alt="logo" class="logo"/> -->
            <div class="logo">salmon停车场注册</div>
            <div class="userBox">
                <input type="text" placeholder="请输入用户名" v-model="name" autocomplete="off"/>
            </div>
            <div class="userBox">
                <input type="text" placeholder="请输入联系电话" v-model="phone" autocomplete="off"/>
            </div>
            <div class="userBox">
                <input type="text" placeholder="请输入车牌号码" v-model="carNumber" autocomplete="off"/>
            </div>
            <div class="userBox">
                <input type="text" placeholder="输入您的密码" v-model="password" autocomplete="off" onfocus="this.type='password'" />
            </div>
            <div class="bigBtn" @click="register">注册</div>
            <div class="link" @click="$goRoute('/login')">已经是成员？去登录</div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                name: '',
                phone: '',
                carNumber: '',
                password: '',

            }
        },
        methods:{
            // 校验手机
            phone(){
                var patrn = /^((13[0-9])|(15[1-3,5-9])|(17[7])|(18[0-9]))\d{8}$/;
                if(this.phone==''){
                    this.$Tips2('请输入手机号码')
                    return
                }
                if(!patrn.test(this.phone)){
                    this.$Tips2('手机号码输入错误')
                    return
                }
            },
            // 注册
            register () {
                var patrn = /^((13[0-9])|(15[1-3,5-9])|(17[7])|(18[0-9]))\d{8}$/;
                if(this.name == '') {
                    this.$Tips2("请输入用户名");
                    return;
                } 
                if(this.phone == '') {
                    this.$Tips2("请输入联系电话");
                    return;
                } 
                if(!patrn.test(this.phone)){
                    this.$Tips2('手机号码输入错误')
                    return
                }
                if(this.carNumber == '') {
                    this.$Tips2("请输入车牌号码");
                    return;
                } 
                if(this.password == '') {
                    this.$Tips2("请输入密码");
                    return;
                }
                var self = this;
                var regData = new FormData();
                regData.append('name', this.name);
                regData.append('phone', this.phone);
                regData.append('plateNum', this.carNumber);
                regData.append('password', this.password);
                $.ajax({
                    url: self.global.BASE_URL+'/us/salmon/user/register.action',
                    type: 'post',
                    data: regData,
                    xhrFields: {
                        withCredentials: true
                    },
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        if(res.code === self.global.SUCCESS_CODE) {
                            self.$Tips1("注册成功，即将跳转到登录页面")
                            setTimeout( () => {
                                self.$router.push('/login');
                            }, 3000)

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
    .register {
        width: 370px;
        height: 450px;
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
    .userBox > input {
        width: 271px;
        height: 46px;
        background-color: #fff;
        border-radius: 10px;
        border: none;
        padding-left: 20px;
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