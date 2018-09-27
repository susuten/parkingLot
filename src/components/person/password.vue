<template>
    <div class="container2">
       <div class="perTitle">修改密码</div>
       <div class="content">
            <div class="account clearfix">
                <div class="fl pwMsg">
                    <span class="prompt">原密码</span>
                    <input type="password" placeholder="请输入原密码" v-model="oldPw"/>
                </div>
                <div class="fl pwMsg">
                    <span class="prompt">新密码</span>
                    <input type="password" placeholder="请输入新密码" v-model="newPw"/>
                </div>
            </div>
            <div class="btnList clearfix">
                <div class="smBtn orange fl mr20" @click="modify">确认</div>
                <div class="smBtn gray fl" @click="cancel">取消</div>
            </div>
       </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                oldPw: '',
                newPw: '',
                user: '',
                userId: '',
            }
        },
        methods:{
            // 获取用户信息
            getUserMsg () {
                var self = this;
                var userData = new FormData();
                userData.append('id', this.userId);
                $.ajax({
                    url: self.global.BASE_URL+'/us/salmon/user/get.action',
                    type: 'post',
                    xhrFields: {
                        withCredentials: true
                    },
                    data: userData,
                    crossDomain: true,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        if(res.code === self.global.SUCCESS_CODE) {
                            self.user = res.data.user;
                        } else {
                            self.$Tips2(res.message);
                        }
                    },
                    error: function(error) {
                        console.log(error);
                    }
                })
            },
            // 修改密码
            modify () {
                if(this.oldPw == '') {
                    this.$Tips2("请输入原密码");
                    return;
                }
                if(this.newPw == '') {
                    this.$Tips2("请输入新密码");
                    return;
                }
                var self = this;
                var modData = new FormData();
                modData.append('id', this.user.id);
                modData.append('name', this.user.name);
                modData.append('phone', this.user.phone);
                modData.append('plateNum', this.user.plateNum);
                modData.append('password', this.oldPw);
                modData.append('newPassword', this.newPw);
                $.ajax({
                    url: self.global.BASE_URL+'/us/salmon/user/update.action',
                    type: 'post',
                    xhrFields: {
                        withCredentials: true
                    },
                    data: modData,
                    crossDomain: true,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        if(res.code === self.global.SUCCESS_CODE) {
                            self.$Tips1("修改成功，即将跳转到登录界面");
                            sessionStorage.removeItem('userName');
                            sessionStorage.removeItem('userId');
                            sessionStorage.removeItem('isLogin');
                            setTimeout(()=>{
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
            // 取消
            cancel() {
                this.oldPw = '';
                this.newPw = '';

            }
        },
        created(){
            this.userId = sessionStorage.getItem('userId');
            this.getUserMsg();
        },
    }
</script>
<style scoped>
    .perTitle {
        height: 60px;
        background-color: #f7f7f7;
        line-height: 60px;
        border: 1px solid #ddd;
        font-size: 18px;
        padding-left: 20px;
    }
    .content {
        padding: 60px;
    }
    .pwMsg:first-child {
        margin-right: 20px;
    }
    .pwMsg input {
        width: 300px;
        height: 36px;
        border: 1px solid #EAEAEA;
        padding-left: 10px;
        border-radius: 2px;
        background-color: #f5f5f5;
    }
    .btnList {
        margin-top: 36px;
    }
</style>