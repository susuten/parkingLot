<template>
    <div class="container">
        <div class="modal" v-show="logoutModal">
            <div class="modalTips">
                <div class="modalTitle">
                    <slot name="title"></slot>
                </div>
                <div class="modalClose" @click="showLogoutModal"><img src="../../static/X.png" height="15" width="13" alt="" /></div>
                <div class="modalContent">
                    <slot name="content"></slot>
                </div>
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

            }
        },
        prop: {

        },
        methods:{

        },
        created(){

        },
    }
</script>
<style scoped>
    @import '../assets/css/modal.css';
</style>
