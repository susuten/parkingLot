<template>
    <div class="container2">
       <div class="perTitle">留言板</div>
       <div class="content">
            <table class="ordersTable">
                <tr>
                   <th>留言内容</th>
                   <th>留言时间</th>
                   <th>管理员回复</th>
                   <th>回复人</th>
                   <th>回复时间</th>
                   <th>操作</th>
                </tr>
                <tr v-for="messageItem in messageList">
                   <td><p v-html="messageItem.content"></p></td>
                   <td>{{messageItem.createDate}}</td>
                   <td>{{messageItem.answer}}</td>
                   <td>{{messageItem.adminName}}</td>
                   <td>{{messageItem.answerDate}}</td>
                   <td @click="showDeleteModal(messageItem.msgId)">删除</td>
               </tr>
            </table>
            <!-- 留言 -->
            <div class="message">
                <UEditor :config=config :value="config.initialContent" ref="ueditor" class='editor'>
                </UEditor>
                <div class="btnList clearfix">
                    <div class="smBtn orange fl mr20" @click="showMsgModal">留言</div>
                    <div class="smBtn gray fl" @click="cancel">取消</div>
                </div>
            </div>
       </div>
       <!-- 提交留言提示模态框 -->
        <div class="modal" v-show="msgModal">
            <div class="modalTips">
                <div class="modalTitle">提交留言</div>
                <div class="modalClose" @click="showMsgModal"><img src="../../../static/X.png" height="15" width="13" alt="" /></div>
                <div class="modalContent">确认要提交留言吗？</div>
                <div class="modalBtn">
                    <el-button type="primary" @click="message">确认</el-button>
                    <el-button @click="showMsgModal">取消</el-button>
                </div>
            </div>
        </div>
        <!-- 删除留言提示模态框 -->
        <div class="modal" v-show="deleteModal">
            <div class="modalTips">
                <div class="modalTitle">删除留言</div>
                <div class="modalClose" @click="showDeleteModal"><img src="../../../static/X.png" height="15" width="13" alt="" /></div>
                <div class="modalContent">确认要删除留言吗？</div>
                <div class="modalBtn">
                    <el-button type="primary" @click="deleteMsg">确认</el-button>
                    <el-button @click="showDeleteModal">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UEditor from '@/components/ueditor.vue'
    import {formatDate} from '../../assets/js/date.js'
    export default{
        data(){
            return{
                msgModal: false,
                deleteModal: false,
                userId: '',
                msgId: '',
                messageList: [], // 留言列表
                config: {
                    //可以在此处定义工具栏的内容
                    // toolbars: [
                    //  ['fullscreen', 'undo', 'redo','|','bold', 'italic', 'underline',
                    //  '|','superscript','subscript','|', 'insertorderedlist', 'insertunorderedlist',
                    //  '|','fontfamily','fontsize','justifyleft','justifyright','justifycenter','justifyjustify']
                    // ],
                    autoHeightEnabled: false,
                    autoFloatEnabled: true,
                    initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                    // focus: ture,
                    autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                    initialFrameWidth: null,
                    initialFrameHeight: 450,
                    BaseUrl: '',
                    UEDITOR_HOME_URL: 'static/ueditor/',
                    zIndex: 100,

                },
            }
        },
        methods:{
            // 时间转换
            toTime(time){
                var date=new Date(time)
                return formatDate(date,'yyyy-MM-dd')
            },
            // 获取用户留言
            getMessage () {
                this.$http.post('/users/message/list').then((res) => {
                    if (res.data.status === '0') {
                        this.messageList = res.data.result;
                    } else {
                        this.$Tips2(res.data.msg);
                    }
                });
            },
           // 留言
           message() {
                this.$http.post('/users/message/add',{
                    content: this.$refs.ueditor.editor.getContent()
                }).then((res) => {
                    if (res.data.status === '0') {
                        this.$Tips1("留言成功");
                        this.showMsgModal();
                        this.getMessage();
                        this.cancel();
                    } else {
                        this.$Tips2(res.data.msg);
                    }
                })
           },
           // 删除留言
           deleteMsg() {
                this.$http.post('/users/message/delete', {
                    msgId: this.msgId
                }).then((res) => {
                    if (res.data.status === '0') {
                        this.$Tips1("留言删除成功");
                        this.getMessage();
                        this.showDeleteModal();
                    } else {
                        this.$Tips2(res.data.msg);
                    }
                })
           },
           // 取消
           cancel() {
                this.$refs.ueditor.clearContent();
           },
           // 控制显示留言模态框
           showMsgModal() {
                this.msgModal = !this.msgModal;
           },
           showDeleteModal(msgId) {
                if (msgId != '') {
                    this.msgId = msgId;
                }
                this.deleteModal = !this.deleteModal;
           }
        },
        created(){
            this.userId = sessionStorage.getItem('userId');
            this.getMessage();
            console.log("留言");
        },
        mounted(){
            this.$refs.ueditor.createE();
            this.currentRouterPath = window.location.pathname;
        },
        components:{
            UEditor,
        },
        beforeRouteLeave (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            // console.log('beforeRouteLeave');
            this.$refs.ueditor.destoryE()
            next();
        }

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
     .ordersTable th:first-child {
        width: 360px;
     }
    .ordersTable th:last-child {
        width: 80px;
    }
    .ordersTable th:nth-child(2) {
        width: 120px;
    }
    .ordersTable th:nth-child(4) {
        width: 100px;
    }
    .ordersTable th:nth-child(5) {
        width: 120px;
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
    .ordersTable tr:hover {
        background-color: #f5f5f5;
    }
    .message {
        margin-top: 50px;
    }
    .btnList {
        width: 200px;
        margin: 30px auto;
    }
</style>
