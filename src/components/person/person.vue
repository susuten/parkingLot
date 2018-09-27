<template>
    <div class="container clearfix">
        <div class="nav fl">
            <router-link  to="/person/information" class="navItem">个人信息</router-link>
            <router-link  to="/person/password" class="navItem">修改密码</router-link>
            <router-link  to="/person/orders" class="navItem">我的订单</router-link>
            <router-link  to="/person/comments" class="navItem">我的留言</router-link>
        </div>
        <router-view class="myContainer fl"></router-view>
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
        // watch: {
        //     $route(to,from){
        //         console.log(to.path);
        //     }
        // }
    }
</script>
<style scoped>
    .container {
        width: 1230px;
        height: 100%;
        margin: 0 auto;
    }
    .nav {
        margin-right: 30px;
    }
    .navItem {
        display: block;
        width: 120px;
        height: 60px;
        background-color: #fff;
        margin-bottom: 10px;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .router-link-hover {
        color: #F78E00;
        background-color: #f1eded;
        box-shadow: 0px 1px 20px 0px rgba(170,170,170,0.3);
    }
    .router-link-active{
        /*color: #eb737f;*/
        /*color: #FF4444;*/
        color: #F78E00;
        background-color: #f1eded;
        box-shadow: 0px 1px 20px 0px rgba(170,170,170,0.3);
    }

    .myContainer {
        width: 1080px;
        min-height: 680px;
        background-color: #fff;
        box-shadow:0px 1px 20px 0px rgba(170,170,170,0.3);
    }
</style>