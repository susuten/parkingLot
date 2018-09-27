/* 
* @Author: Marte
* @Date:   2018-04-11 11:52:29
* @Last Modified by:   Marte
* @Last Modified time: 2018-07-21 14:25:10
*/

exports.install = function (Vue, options) {
    Vue.prototype.$Tips1=function(value){
        // 成功提示
        this.$message({
          showClose: true,
          message: value,
          type: 'success',
          duration:1500
        }); 
    }

    Vue.prototype.$Tips2=function(value){
        // 错误提示
        this.$message({
          showClose: true,
          message: value,
          type: 'error',
          duration:1500
        }); 
    }
};