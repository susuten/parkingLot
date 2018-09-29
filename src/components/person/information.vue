<template>
    <div class="container2">
       <div class="perTitle">个人信息</div>
       <div class="content">
           <div class="userMsg">
               <span class="userMsgTitle">用户名：</span>
               <span class="userMsgContent">{{userMsg.userName}}</span>
           </div>
           <div class="userMsg">
               <span class="userMsgTitle">用户积分：</span>
               <span class="userMsgContent">{{userMsg.point}}</span>
           </div>
           <div class="userMsg">
               <span class="userMsgTitle">联系电话：</span>
               <span class="userMsgContent">{{userMsg.phone}}</span>
           </div>
           <div class="userMsg">
               <span class="userMsgTitle">享受折扣：</span>
               <span class="userMsgContent">无折扣</span>
           </div>
           <div class="userMsg">
               <span class="userMsgTitle">车牌号码：</span>
               <span class="userMsgContent">{{userMsg.plateNum}}</span>
           </div>
           <div class="smBtn orange" @click="showModifyModal">修改</div>
       </div>
        <!-- 修改模态框 -->
        <div class="modal" v-show="modifyModal">
            <div class="modalBox">
                <div class="modalTitle">修改个人信息</div>
                <div class="modalClose" @click="showModifyModal"><img src="../../../static/X.png" height="15" width="13" alt="" /></div>
                <div class="modalContent2">
                    <div class="modalContentItem">
                        <span>用户名</span>
                        <input type="text" placeholder="请输入用户名" v-model="modUserMsg.userName"/>
                    </div>
                    <div class="modalContentItem">
                        <span>联系电话</span>
                        <input type="text" placeholder="请输入联系电话" v-model="modUserMsg.phone"/>
                    </div>
                    <div class="modalContentItem">
                        <span>车牌号</span>
                        <input type="text" placeholder="请输入车牌号" v-model="modUserMsg.plateNum"/>
                    </div>
                </div>
                <div class="modalBtn">
                    <el-button type="primary" @click="modify">确认</el-button>
                    <el-button @click="showModifyModal">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                modifyModal: false,
                userId: '',
                userMsg: {},
                modUserMsg: {},
            }
        },
        methods:{
            // 获取用户信息
            getUserMsg () {
                this.$http.post('/users/get').then((res) => {
                    if (res.data.status === '0') {
                        this.userMsg = res.data.result;
                        console.log(res.data.result)
                        sessionStorage.setItem('user', res.data.result);
                        sessionStorage.setItem('userName',res.data.result.userName);
                    } else {
                        this.$Tips2(res.data.msg);
                    }
                });
            },

            // 控制显示隐藏修改模态框
            showModifyModal () {
                this.modUserMsg = this.deepCopy(this.userMsg);
                console.log(33, this.modUserMsg);
                this.modifyModal = !this.modifyModal;
            },
            // 修改
            modify () {
                console.log("进入修改");
                console.log(22, this.modUserMsg);
                this.$http.post('/users/update', {
                    userName: this.modUserMsg.userName,
                    phone: this.modUserMsg.phone,
                    plateNum: this.modUserMsg.plateNum
                }).then((res) => {
                    if (res.data.status === '0') {
                        console.log("修改成功");
                        this.$Tips1("修改成功");
                        sessionStorage.setItem('userName',this.modUserMsg.userName);
                        this.$store.commit('storeName',this.modUserMsg.userName)
                        this.getUserMsg();
                        this.showModifyModal();
                    } else {
                        this.$Tips2(res.data.msg);
                    }
                })
            },
            /*modify () {
                var self = this;
                var modData = new FormData();
                modData.append('id', this.modUserMsg.id);
                modData.append('name', this.modUserMsg.name);
                modData.append('phone', this.modUserMsg.phone);
                modData.append('plateNum', this.modUserMsg.plateNum);
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
                            self.$Tips1("修改成功");
                            sessionStorage.setItem('userName',self.modUserMsg.name);
                             self.$store.commit('storeName',self.modUserMsg.name)
                            self.getUserMsg();
                            self.showModifyModal();
                        } else {
                            self.$Tips2(res.message);
                        }
                    },
                    error: function(error) {
                        console.log(error);
                    }
                })
            },*/
            // 深度拷贝
            deepCopy(source) {
                var sourceCopy = {}
                for(var item in source) {
                    sourceCopy[item] = typeof source[item] === 'object' ? this.deepCopy(source[item]) : source[item];
                }
                return sourceCopy
            },
        },
        created(){
            this.userId = sessionStorage.getItem('userId');
            this.getUserMsg();
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
        padding: 20px 60px;
    }
    .userMsg {
        padding: 20px 10px;
        width: 250px;
        border-bottom: 1px solid #f1f1f1;
        /*margin-bottom: 25px;*/
    }
    .userMsg:hover {
        background-color: #F4F7FC;
        border-radius: 10px;
    }
    .userMsgTitle {
        display: inline-block;
        width: 100px;
    }
    .smBtn {
        margin-top: 25px;
    }
</style>
