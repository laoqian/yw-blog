
//路由初始化文件


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
  app.use('/login', routes.views.login);

};
