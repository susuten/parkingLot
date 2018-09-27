/* 
* @Author: Marte
* @Date:   2018-04-11 11:52:29
* @Last Modified by:   susuten
* @Last Modified time: 2018-09-13 10:01:05
*/
exports.install = function (Vue, options) {
    //图片前加域名
    Vue.prototype.$toImg=function(url){
        return this.global.BASE_URL+url
    } 
    //路由跳转(并储存数据)
    Vue.prototype.$goRoute=function(path,itemKey,itemValue,itemKey2,itemValue2,itemKey3,itemValue3){
      this.$router.push(path)
      if(itemKey!=undefined){
        sessionStorage.setItem(itemKey,itemValue)
      }
      if(itemKey2!=undefined){
        sessionStorage.setItem(itemKey2,itemValue2)
      }
      if(itemKey3!=undefined){
        sessionStorage.setItem(itemKey3,itemValue3)
      }
    }     
};