//注意每次调用jq请求时会先调用下面这个函数，
//这个函数中可以拿到我们提供的配置对象
$.ajaxPrefilter(function(options){
    options.url = 'http://www.liulongbin.top:3007' + options.url
  
})