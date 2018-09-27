<template>
    <div class="footer">
        <div class="footerContainer">
            <ul class="footerList">
                <li class="listItem">
                    <div class="itemTitle">关于我们</div>
                    <div class="itemContent">联系我们</div>
                    <div class="itemContent">网站公告</div>
                </li>
                <li class="listItem">
                    <div class="itemTitle">新手指南</div>
                    <div class="itemContent">如何买票</div>
                    <div class="itemContent">修改密码</div>
                </li>
                <li class="listItem">
                    <div class="itemTitle">配送方式</div>
                    <div class="itemContent">配送范围</div>
                    <div class="itemContent">配送时间</div>
                </li>
                <li class="listItem">
                    <div class="itemTitle">售后服务</div>
                    <div class="itemContent">退票申请</div>
                    <div class="itemContent">改签申请</div>
                </li>
            </ul>
            <div class="copyright">© 2018-2020 salmon.com</div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                
            }
        },
        methods:{
           
        },
        created(){
            
        },
    }
</script>
<style scoped>
    .footer {
        margin-top: 50px;
        min-width: 1230px;
        height: 240px;
        /*background-color: #fff;*/
        /*background-color: #373d44;*/
        /*color: #fff;*/
        color: #666;
        /*border-top: 1px solid #ccc;*/
        box-shadow: 0 -2px 10px 0 #ccc;
    }
    .footerContainer {
        width: 1230px;
        height: 100%;
        margin: 0 auto;
    }
    .footerList {
        display: flex;
        justify-content: space-around;
        padding-top: 20px;
    }
    .itemTitle {
        font-size: 18px;
        line-height: 54px;
        /*font-weight: bold;*/
    }
    .itemContent {
        font-size: 14px;
        line-height: 42px;
        cursor: pointer;
        /*color: #e5e5e5;*/
        color: #666;
    }
    .itemContent:hover {
        /*color: #c5c5c5;*/
        color: #999;
    }
    .copyright {
        /*font-size: 12px;*/
        font-size: 14px;
        text-align: center;
        padding-top: 20px;
        margin-top: 20px;
        border-top: 1px solid #e5e5e533;
        /*color: #b6b6b6;*/
        color: #999;
    }
</style>