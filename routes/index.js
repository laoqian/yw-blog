
var multer = require('multer')
var upload = multer({ dest:'../data/img/'})



// Setup Route Bindings
exports.init = function init (app) {

  var importer=app.get('importer')(__dirname);

  // Import Route Controllers
  var routes = {
    views: importer('./views')
  };


  // Views
  app.get('/', routes.views.index);
  app.use('/post', routes.views.post);

  console.log('设置路由成功');
};




