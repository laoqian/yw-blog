/**
 * Created by gg on 2015/9/24.
 */



$(document).ready(function () {

    $(".img-upload").change(function(evt) {

        // 如果浏览器不支持FileReader，则不处理
        if (!window.FileReader) {
            console.log('该浏览器不支持该上传方式');
            return;
        }

        var files = evt.target.files;
        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();
            reader.onload = (function(theFile) {
                return function(e) {
                    $('.img-info').text("图片预览:");
                    // img 元素
                    $('.img-wrap').attr('src', e.target.result);
                };
            })(f);


            reader.readAsDataURL(f);
        }
    });
    
    $('.btn-submit').click(function () {
        var data= new FormData();

        if($('.proj-title').val().length>0){
            data.append('title' ,$('.proj-title').val());
        }else{
            alert('请输入一个项目名称');
            return;
        }

        if($('.proj-content').val().length>0){
            data.append('content', $('.proj-title').val());
        }else{
            alert('请输入项目内容');
            return;
        }

        if($(".img-upload")[0].files.length>0){
            data.append('img', $(".img-upload")[0].files[0]);
        }else{
            alert('选择一张图片');
            return;
        }

        $('.form-submit').submit();
    });
});