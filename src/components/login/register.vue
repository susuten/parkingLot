<template>
    <div class="bg">
        <div class="register">
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
            // 注册
            register () {
                if(this.name == '') {
                    this.$Tips2("请输入用户名");
                    return;
                }
                if(this.phone == '') {
                    this.$Tips2("请输入联系电话");
                    return;
                }
                if(this.carNumber == '') {
                    this.$Tips2("请输入车牌号码");
                    return;
                }
                if(this.password == '') {
                    this.$Tips2("请输入密码");
                    return;
                }
                this.$http.post('/users/register', {
                    userName: this.name,
                    phone: this.phone,
                    plateNum: this.carNumber,
                    userPwd: this.password
                }).then ((res) => {
                    if(res.data.status === '0') {
                        this.$Tips1("注册成功，即将跳转到登录页面")
                        setTimeout( () => {
                            this.$router.push('/login');
                        }, 3000)

                    } else {
                        this.$Tips2(res.data.msg);
                    }
                });
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
