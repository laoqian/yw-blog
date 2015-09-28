var mongoose = require("mongoose");
var debug = require('debug')('db');


var myLog = console.log;

// database config information
// 有用户和密码时，验证通不过
var cfg = {
  //user  : 'root',
  //pass  : '123456',
  addr    : '192.168.0.105',
  port    : 27017,
  database: 'my_database'
};

function getUri(cfg) {
// mongodb://[username:password@]host1[:port1][,host2[:port2],...
// [,hostN[:portN]]][/[database][?options]]
  var uri = "mongodb://";
  if (typeof cfg.user != 'undefined') {
    if (typeof cfg.pass === 'undefined') {
      cfg.pass = '';
    }
    uri += cfg.user + ':' + cfg.pass + '@';
  }
  if (typeof cfg.addr === 'undefined') {
    cfg.addr = 'localhost';
  }
  if (typeof cfg.port === 'undefined') {
    cfg.port = '27017';
  }
  if (typeof cfg.database === 'undefined') {
    cfg.database = 'test';
  }
  uri += cfg.addr + ':' + cfg.port + '/' + cfg.database;

  return uri;
}

var uri = getUri(cfg);
debug("database url: [" + uri + "]" );

// connect database
var db = mongoose.createConnection(uri);

// ** models
var models = {};

// listen event: 'error' 'open'
db.on('error', function(err) {
  myLog('' + err);
  models['db err'] = err.stack;
});

db.once('open', function(err) {
  if (err) {
    myLog('' + err);
    models['db err'] = err.stack;
    return;
  }
  debug("open database success.");

  // * create models
  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

  // ** schemas
  var blogSchema = new mongoose.Schema({
    //_id   :  ObjectId,
    date:  { type: Date, default: Date.now },
    data:  {
      title   : String,
      content : String,
      picture : {// 可以考虑修改为 pictures，以数组存储
        name: String,
        path: String
      }
    }
  });

  // create you model, if there is no collection_name, the default collection name will be
  // < model_name + 's' >
  // db.model(model_name, pre_schema, collection_name);
  models['blog'] = db.model('blog', blogSchema, 'blog');

});

// get the related model
module.exports = function getRelModel(collection) {
  return models[collection];
};

//// test insert data
//// method one
//models['blog'].create({data: {title: 'test1', content: 'content1'}}, function(e) {
//  if (e) {
//    debug("ERROR: [" + e + "]");
//  } else {
//    debug('Doc insert  success.');
//  }
//});

//// method two
//var doc = new models['blog']({data: {title: 'test2', content: 'content2'}});
//doc.save(function(err) {
//  if (err) {
//    debug('ERROR: ' + err);
//  } else {
//    debug('Doc insert success.');
//  }
//});