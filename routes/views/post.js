/**
 * Created by gg on 2015/9/22.
 */


var multiparty = require('multiparty');
var fs=require("fs-extra");
var path =require('path');



exports = module.exports = function (req, res) {
  if (req.method.toUpperCase() === "POST") {

    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
      var data ={};

      data.data = {};
      data.data.title=fields.title[0];
      data.data.content=fields.content[0];

      var picture = files.picture[0];
      var pic_type= picture.headers['content-type'];

      if(pic_type!="image/jpeg"){
        console.log("图片格式错误：",+pic_type);
      }

      var dst_path ='../data/img/'+picture.originalFilename;

      fs.move(picture.path, dst_path, {clobber: true}, function (err) {
        if(err) {
          res.render('./components/result',{result:"发表失败"});
          return;
        } else {

        }

        res.render('./components/result',{result:"发表成功"});
      });


      data.data.picture = {};
      data.data.picture.name= picture.originalFilename;
      data.data.picture.path= dst_path;


      // save data into collection: 'blog'
      // data should be: {data: {title: 'xxx' content: 'xxx'}, picture: {name: 'xxx', path: 'xxx'}}
      // it is defined by the Schema_blog in './controller/db.js'
      // and only the matched sections can be insert into the database.
      var model_blog = req.app.locals.table('blog');
      model_blog.create(data, function(e) {
        if (e) {
          console.log("ERROR: [" + e + "]");
        } else {
          console.log('Doc insert  success.');
        }
      });

      return;
    });

    return;
  }

  res.render('post', res.app.locals);
};