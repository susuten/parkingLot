//公用js (可继续添加)

exports.timeChange= function(date,type) {
    //时间戳转换成时间(时间)
    if(date==''){
        var d = new Date();
    }else{
        var d = new Date(date);
    }
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
    var hour = d.getHours()<10 ? '0' + d.getHours() : '' + d.getHours();
    var minutes = d.getMinutes()<10 ? '0' + d.getMinutes() : '' + d.getMinutes();
    var seconds = d.getSeconds()<10 ? '0' + d.getSeconds() : '' + d.getSeconds();
    if(type=='YMDHMS'){
        return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds; 
    }else if(type=='YMD'){
        return year+'-'+month+'-'+day
    }

}