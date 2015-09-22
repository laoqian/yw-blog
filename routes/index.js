var middleware=require('../controller/lib/middlewares');


// Setup Route Bindings
exports = module.exports = function init (app) {

  var importer=app.imporper;
  // Import Route Controllers
  var routes = {
    views: importer('./views')
  };

  // Views
  app.get('/', routes.views.index);
  app.get('/post', routes.views.post);
};


