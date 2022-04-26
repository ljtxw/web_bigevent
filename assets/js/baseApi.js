//注意每次调用jq请求时会先调用下面这个函数，
//这个函数中可以拿到我们提供的配置对象
$.ajaxPrefilter(function(options){
    options.url = 'http://www.liulongbin.top:3007' + options.url
    //统一为有权限的借口配置请求头
    //检查字符串有无、my字符串
    if(options.url.indexOf('/my/') !== -1){
        options.headers ={
            Authorization:localStorage.getItem('token')|| '',
           
       }
    }
    //全局统一挂载complete回调
    options.complete = function (res){
         //无论成功失败都会调用,设置访问权限
       
            //在这中可以使用responseJSON拿到响应回的数据
            if(res.responseJSON.status==1||res.responseJSON.msg=='身份认证失败！'){
                //清空
                localStorage.removeItem('token');
                location.href= '/login.html';
            }
           
      
    }
     
   
})