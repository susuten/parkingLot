<template>
  <div>
    <script id="editor" type="text/plain" ></script>
  </div>
</template>

<script>
  import '../../static/ueditor/ueditor.config.js'
  import '../../static/ueditor/ueditor.all.min.js'
  import '../../static/ueditor/lang/zh-cn/zh-cn.js'
  import '../../static/ueditor/ueditor.all.js'

  export default {
    name: "UEditor",
    props: {
      id: {
          type: String
      },
      config: {
          type: Object
      },
      value: '',
    },
    data() {
      return {
        editor: null
      }
    },
    mounted() {
      // //初始化UE
       this.$nextTick(() => {

      })
    },
    destoryed() {
      this.editor.destory();
    },
    methods:{
      createE:function(){
        const _this = this;
        // this.editor = UE.delEditor("editor");
        this.editor = UE.getEditor('editor',this.config);
        this.editor.addListener('ready',  () => {
            this.editor.setContent(this.value)
            console.log(2,this.value)
            // 打开时调用create，关闭时调用destory
        })
      },
      destoryE(){
        UE.getEditor('editor').destroy();
        // this.editor.destory();
      },
      getUEContent: function(){
       return this.editor.getContent();
      },
      getContentTxt: function(){
        return this.editor.getContentTxt();
      },
      clearContent: function () {
        return this.editor.setContent('');
      },
    }
  }
</script>
<style type="text/css">
  #edui1_iframeholder,.edui-editor-iframeholder{
    height:200px !important;
  }
  </style>
