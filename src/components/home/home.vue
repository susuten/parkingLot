<template>
    <div class="container">
        <!-- <div class="top clearfix">
            <div class="search fl" @click="$goRoute('/search')">查车位</div>
        </div> -->
        <div class="middle clearfix">
            <div class="preferential fl">
                <img src="../../../static/timg.jpg">
            </div>
            <div class="carousel fl" @mouseenter="mouseOnCarousel=true" @mouseleave="mouseOnCarousel=false">
                <swiper :options="swiperOption"  ref="mySwiper" id="myCarousel">
                    <!-- 这部分放要渲染的那些内容 -->
                    <swiper-slide v-for="(slide,key) in slides" :key="key">
                        <img :src="slide" style="width:750px;height:300px;">
                    </swiper-slide>
                    <!-- 这是轮播的小圆点 -->
                    <div class="swiper-pagination" slot="pagination"></div>
                    <!-- 上下 -->
                    <div class="swiper-button-prev swiper-button-white" slot="button-prev" v-show="mouseOnCarousel"></div>
                    <div class="swiper-button-next swiper-button-white" slot="button-next" v-show="mouseOnCarousel"></div>
                </swiper>
            </div>
            <div class="announcement fl">
                <div class="title">最新公告</div>
                <ul class="aList">
                    <li class="aItem clearfix" @click="$goRoute('/postDetails','postTitle', item.noticeTitle, 'postContent', item.noticeContent, 'postTime', item._id)" v-for="item in list">
                        <span class="aContent fl">{{item.noticeTitle}}</span>
                        <span class="aTime fr">{{toTime(item._id)}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bottom">
            <img src="../../../static/footer.jpg">
        </div>
    </div>
</template>

<script>
    import {formatDate} from '../../assets/js/date.js'
    export default{
        data(){
            return{
                // 轮播图数据
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable:true
                    },
                    autoplay: {
                        disableOnInteraction: false,
                        delay:4000
                    },
                    //开启无限循环
                    loop:true,
                    // slidesPerView: 'auto',
                    centeredSlides: true,
                    //设置点击箭头
                    paginationClickable: true,
                    prevButton:'.swiper-button-prev',
                    nextButton:'.swiper-button-next',
                    // 图片之间的间隙
                    // spaceBetween: 30,
                    onSlideChangeEnd: swiper => {
                        //这个位置放swiper的回调方法
                        this.page = swiper.realIndex+1;
                        this.index = swiper.realIndex;
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
                slides:['./static/carousel1.jpg', './static/carousel2.jpg', './static/carousel3.jpg'],
                mouseOnCarousel: false,
                list: [],   // 公告列表
                pageSize: 10,
                pageNum: 1,

            }
        },
        methods:{
            // 获取公告
            getAnnouncement () {
                this.$http.get('/notices').then((res) => {
                    if (res.data.status == '0') {
                        this.list = res.data.result.list;
                        console.log(this.list);
                    } else {
                        this.$Tips2(res.data.msg);
                     }
                })
            },
            // 时间转换
            toTime(time){
                let str = time.toString().substr(0, 8)  // 获取时间戳
                let date=new Date(Number(parseInt(str, 16).toString() + '000'))
                return formatDate(date,'yyyy-MM-dd')
            },
        },
        created(){
            this.getAnnouncement();
        },
    }
</script>
<style scoped>
    .container {
        width: 1230px;
        height: 100%;
        margin: 0 auto;
    }
    .top {
        padding: 20px 0;
    }
    .search {
        width: 120px;
        height: 40px;
        background-color: #fff;
        line-height: 40px;
        text-align: center;
        border-radius: 5px;
        background-color: #2A87D8;
        color: #fff;
        cursor: pointer;
    }
    .search:hover {
        background-color: #66b1ff;
    }
    .middle {
        height: 298px;
    }
    .preferential {
        width: 230px;
        height: 300px;
        background-color: #999;
        margin-right: 20px;
    }
    .preferential img {
        width: 230px;
        height: 300px;
    }
    .carousel {
        width: 750px;
        height: 300px;
        margin-right: 20px;
    }
    .announcement {
        width: 200px;
        height: 300px;
        border: 1px solid #dee8ef;
        background-color: #fff;
        overflow: hidden;
    }
    .title {
        background-color: #f0f4f7;
        line-height: 30px;
        color: #7f9aab;
        font-size: 14px;
        padding-left: 20px;
    }
    .aItem {
        padding: 10px;
        border-bottom: 1px solid #f0f4f7;
        cursor: pointer;
    }
    .aItem:hover {
        background-color: #F4F7FC;
        -webkit-transition: all .3s ease-in-out;
        -moz-transition: all .3s ease-in-out;
        -ms-transition: all .3s ease-in-out;
        -o-transition: all .3s ease-in-out;
        transition: all .3s ease-in-out ;
    }
    .aContent {
        font-size: 12px;
        color: #666;
    }
    .aTime {
        font-size: 12px;
        color: #666;
    }
    .bottom {
        width: 100%;
        margin-top: 30px;
        padding: 10px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 -4px 8px 0 rgba(7,17,27,.1);
    }
    .bottom img {
        width: 100%;
        border-radius: 5px;
    }

</style>
