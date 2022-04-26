$(function(){
    //获取用户信息
   getUser();
   //退出
   $('#btn_logout').on('click',function(e){
    layui.layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
        //do something
        //清空本地存储的token
        //跳转至登录页
        localStorage.removeItem('token')
        location.href= '/login.html'
        //关闭询问框
        layui.layer.close(index);
      });
   })
})
//获取用户信息
function getUser(){
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        // //无论成功失败都会调用,设置访问权限
        // complete:function(res){
        //     //在这中可以使用responseJSON拿到响应回的数据
        //     if(res.responseJSON.status==1||res.responseJSON.msg=='身份认证失败！'){
        //         //清空
        //         localStorage.removeItem('token');
        //         location.href= '/login.html';
        //     }
           
        // },
        success: function (res) {
            if(res.status !==0){
                return layui.layer.msg('获取用户信息失败')
            }
            //调用方法渲染用户头像等信息
            renderAvatar(res.data);
             console.log(res)
        }
    });
}
function renderAvatar(user){
    let name = user.nikname || user.username;
    $('#wel').html('欢迎&nbsp&nbsp'+name);
    //渲染头像
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase()).show();
    }
}
