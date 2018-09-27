<template>
    <div class="container">
        <myHeader></myHeader>
        <router-view></router-view> 
        <myFooter></myFooter>
    </div>
</template>

<script>
    import myHeader from '@/components/header.vue'
    import myFooter from '@/components/footer.vue'
    export default{
        data(){
            return{
                
            }
        },
        methods:{
           
        },
        created(){
            
        },
        components: {
            myHeader,
            myFooter,
        }
    }
</script>
<style scoped>
    
</style>