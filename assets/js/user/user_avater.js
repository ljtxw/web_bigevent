$(function () {
    let layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //给上传按钮绑定时间 
    $('#btnFile').on('click', function (e) {
        $('#file').click();
    })
    //给文件选择框绑定change事件
    $('#file').on('change', function (e) {
        //获取用户选择的文件
        let fileList = e.target.files;
        if (fileList.length === 0) {
            return layer.msg('请选择照片')
        }
        //1. 拿到用户选择的文件
        var file = e.target.files[0]
        //2. 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file);
        //3重新初始化裁剪区
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })
    //给确定按钮绑定事件
    $('#btnUoload').on('click', function (e) {
        
        //1.获取裁剪后图像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
             // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            .toDataURL('image/png')
        $.ajax({
            type:'post',
            url:'/my/update/avatar',
            data:{
                avatar:dataURL,
            },
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更换失败')
                }
                return layer.msg('更换成功')
                window.parent.getUser();
            }
        })
    })
})