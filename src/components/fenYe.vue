<template>
  <nav>
        <ul class="pagination">
            <li :class="{'disabled': current == 1}"@click="setCurrent(1)">首页</li>
            <li :class="{'disabled':current == 1}" @click="setCurrent(current - 1)" title="上一页">&lt;</li>
            <li v-for="p in grouplist" :class="{'active': current == p.val}" @click="setCurrent(p.val)">{{p.text}}</li>
            <li :class="{'disabled':current == page}" @click="setCurrent(current + 1)" title="下一页">&gt;</li>
            <li :class="{'disabled': current == page}" @click="setCurrent(page)">尾页</li>
        </ul>
    </nav>
</template>

<script type="text/javascript">
  export default{
    data(){
      return {
        current: this.currentPage,
      }
    },
    
    methods: {
        setCurrent: function (idx) {
            if(this.current != idx && idx > 0 && idx < this.page + 1) {
                this.current = idx;
                this.nowCurrent = idx;
                this.$emit('pagechange', this.current);
            }
        },
    },
    // 通过props来接受从父组件传递过来的值
        props: {
            total: {    // 数据总条数
                type: Number,
                default: 0
            },
            pageSize: { // 每页显示条数
                type: Number,
                default: 5
            },
            currentPage: {  // 当前页
                type: Number,
                default: 1
            },
            pagegroup: {    // 分页条数
                type: Number,
                default: 7,
                coerce: function (v) {
                    v = v > 0 ? v : 7;
                    return v % 2 === 1 ? v : v + 1;
                }
            }
        },

    computed: {
        page: function() {
            return Math.ceil(this.total / this.pageSize);
        },
        pageGroup: function() {
            var len = this.page, pageGroup = [];
            while (len--) {
                pageGroup.push({text:this.page-len, val:this.page-len});
            }
            return pageGroup;
        },
        grouplist: function () { // 获取分页页码
            var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
            if (len <= this.pagegroup) {
                while (len--) {
                    temp.push({text: this.page - len, val: this.page - len});
                }
          
                return temp;
            }
            while (len--) {
                temp.push(this.page - len);
            }
            var idx = temp.indexOf(center); //当前页的位置
            (idx < count) && ( center = center + count - idx);
            (this.current > this.page - count) && ( center = this.page - count);
            temp = temp.splice(center - count - 1, this.pagegroup);
            do {
                var t = temp.shift();
                list.push({
                    text: t,
                    val: t
                });
            } while (temp.length);
            if (this.page > this.pagegroup) {
                (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
                (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
            }
        
            return list;
        }
    },
    watch:{
        currentPage(){
            this.current=this.currentPage
        }
    }
    
  }
</script>

<style scoped>
    .pagination {
        display: table;
        height: 60px;
        margin: 0 auto;
    }
    .pagination .disabled {
        width: 38px;
        height: 38px;
        border: none;
        background-color: #EAEAEA;
        border: 1px solid #ccc;
        color: #666;
        cursor: not-allowed;
    }
    .pagination li {
        float: left;
        width: 38px;
        height: 38px;
        border: 1px solid #ddd;
        color: #666;
        border-radius: 3px;
        margin-right: 20px;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
        background-color: #fff;
    }
    .pagination li:last-child {
        margin-right: 0;
    }
    .pagination li.active {
        width: 40px;
        height: 40px;
        border: none;
        color: #fff;
        background-color: #F78E00;
    }

</style>
