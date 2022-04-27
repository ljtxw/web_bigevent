let form = layui.form;
$(function(){
    
    form.verify({
        nikname:function(value){
            if(value.length>6){
                return '昵称长度为1-6'
            }
        }
    })
    initUserInfo();
    function initUserInfo(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg(res.message)
                }
                //调用form.val快速赋值
                form.val('formUserInfo',res.data)
                
            }
        })
    }
    $('#btnreset').on('click',function(e){
        e.preventDefault();
        
        initUserInfo();
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            url:'/my/userinfo',
            type:'post',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                return layer.msg('更新成功')
               //调用父页面方法中心渲染
               window.parent.getUser();
            }
        })
    })
   

})
