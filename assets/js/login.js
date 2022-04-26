
$(function () {
    $('#link_reg').on('click', function (e) {
        
        $('.reg_box').show();
        $('.login_box').hide();
    })
    $('#link_login').on('click', function (e) {
        $('.login_box').show();
        $('.reg_box').hide();
    })
    //获取form
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
        //效验两次是否一样
        repwd:function (value) {
            //通过形参拿到的和上面对比不一样retun
            let psd = $('#ps').val()
            if(value !== psd){
                return '输入两次密码不一致'
            }
        }
    })
    //注册提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/api/reguser',
            data:{
                username:$('#form_reg [name=username]').val(),
                password:$('#form_reg [name=password]').val(),
            },
            success:function(res){
                if(res.status!==0){
                 
                    //layui 
                    return layer.msg(res.message)
                }
                else{
                    $('#form_reg')[0].reset();
                    $('#link_login').click();
                    return layer.msg(res.message) 
                }
                
            }
        })
    })
    //登录提交事件
    $('#form_login').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            type:'POST',
            data:$(this).serialize(),
            //     username:$('#form_login [name=username]').val(),
            //     password:$('#form_login [name=password]').val(),
            // },
            success:function(res){
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                //将获取的taken保存到localstorage中
                localStorage.setItem('token',res.token);
                $('#form_login')[0].reset();
                //跳转
                location.href='/index.html'
               
            }
        })
    })
   
})