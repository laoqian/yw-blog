/**
 * Created by gg on 2015/9/22.
 */


var multiparty = require('multiparty');
var fs=require("fs-extra");
var path =require('path');

exports = module.exports = function (req, res) {

    if(req.method==="POST"){

        var form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {
            var data ={};

            data.title=fields.title[0];
            data.content=fields.content[0];

            var picture = files.picture[0];
            var pic_type= picture.headers['content-type'];

            if(pic_type!="image/jpeg"){
                console.log("图片格式错误：",+pic_type);
            }


            var dst_path ='../data/img/'+picture.originalFilename;

            fs.removeSync(dst_path);
            fs.move(picture.path,dst_path, function (err) {
                if(err){
                    res.render('./components/result',{result:"发表失败"});
                    return;
                }
                res.render('./components/result',{result:"发表成功"});
            })

            data.picture={};
            data.picture.name= picture.originalFilename;
            data.picture.path=dst_path;

            console.log(data);
            return;
        });

        return;
    }

    res.render('post', res.app.locals);
}


