<template>
    <div class="container">
        <div class="content">
            <div class="title">公告详情</div>
            <div class="post">
                <div class="postTitle">{{postTitle}}</div>
                <div class="postContent">{{postContent}}</div>
                <div class="postTime"><span class="bigBox"><span class="smBox">{{toTime(parseInt(postTime))}}</span>发表于 通知公告</span></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDate} from '../../assets/js/date.js'
    export default{
        data(){
            return{
                postTitle: '',
                postTime: '',
                postContent: '',
            }
        },
        methods:{
            // 时间转换
            toTime(time){
                var date=new Date(time)
                return formatDate(date,'yyyy-MM-dd')
            },
        },
        created(){
            this.postTitle = sessionStorage.getItem('postTitle');
            this.postTime = sessionStorage.getItem('postTime');
            this.postContent = sessionStorage.getItem('postContent');
        },
    }
</script>
<style scoped>
    .container {
        width: 1230px;
        height: 100%;
        margin: 0 auto;
    }
    .title {
        font-size: 18px;
        margin-bottom: 30px;
        padding-left: 10px;
        border-left: 5px solid #F78E00;
    }
    .content {
        width: 1200px;
        padding: 20px;
        border: 1px solid #f5f5f5;
        background-color: #fff;
        border-radius: 10px;
        -webkit-box-sizing: border-box;
           -moz-box-sizing: border-box;
                box-sizing: border-box;
    }
    .postTitle {
        padding-bottom: 30px;
        font-size: 18px;
    }
    .postContent {
        margin-bottom: 30px;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 8px 0 #ccc;
    }
    .postContent:hover {
        box-shadow: 0 2px 15px 0 #ccc;
    }
    .postTime {
        font-size: 14px;
    }
    .bigBox {
        display: inline-block;
        background-color: #999;
        border-radius: 24px;
        padding-right: 10px;
        color: #fff;
    }
    .smBox {
        background-color: #F78E00;
        display: inline-block;
        padding: 5px 10px;
        border-radius: 24px;
        color: #fff;
        margin-right: 20px;
    }
</style>