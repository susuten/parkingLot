<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
      
    },
}
</script>

<style>
  #app {
    font-family: 'MicrosoftYaHei',Avenir, Helvetica, Arial, sans-serif;
    height: 100%;
    font-size: 16px;
    color:#333;
    word-wrap: break-word;  
  }

  html, body, div, span, applet, object, iframe,
  p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, sub, sup, tt, var,
  u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  html, body {
    width: 100%;
    height: 100%;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    text-decoration: none;
  }

  body {
    background:rgba(239,238,243,1);
  }

  *:focus {
    outline: none;
  }

  input::-webkit-input-placeholder {
    color: #A6A89F;
    opacity: 1;
  }

  *:focus {
    outline: none;
  }

  input::-webkit-input-placeholder {
    color: #A6A89F;
    opacity: 1;
  }

  @media print {
      .noprint {
          display: none;
      }
  }
  
  /* 去掉IE中input 文本输入框中的X号 和 密码输入框的眼睛 */
  input::-ms-clear,::-ms-reveal{
    display:none;
  }
  
  /* 左浮动 */
  .fl {
    float: left;
  }

  /* 右浮动 */
  .fr {
    float: right;
  }

  /*清除浮动*/
  .clearfix:after{
    clear:both;
    content:'';
    display: block;
  }

  /*轮播图小圆点*/
  #myCarousel .swiper-pagination-bullet {
    width: 40px;
    height: 3px;
    border-radius: 0;
    background-color: #fff;
  }
  .smBtn {
      width: 80px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      border-radius: 5px;
      cursor: pointer;

    }
    .bigBtn {
        width: 150px;
        height: 40px;
        border-radius: 40px;
        font-size: 20px;
        text-align: center;
        line-height: 40px;
        margin: 20px 0;
        cursor: pointer;
    }
    .orange {
        background-color: #F78E00;
        color: #fff;    
    }
    .gray {
        background-color: #ccc;
        color: #fff;
    }
    .money {
        color: #FF4444;
        font-weight: bold;
    }
    .mr10 {
        margin-right: 10px;
    }
    .mr20 {
        margin-right: 20px;
    }
    .mr30 {
        margin-right: 30px;
    }
    .noPointer {
        cursor: default;
    }
    pre {
        display: block;
        font-family: Monaco,Menlo,Consolas,"Courier New",monospace;
        padding: 9.5px;
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 20px;
        word-break: break-all;
        word-wrap: break-word;
        white-space: pre;
        white-space: pre-wrap;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 4px;
        color: #333;
    }

</style>
