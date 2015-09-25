var mongoose = require("mongoose");

// database config information
// 有用户和密码时，验证通不过
var cfg = {
    //user        : 'root',
    //pass        : '123456',
    addr        : '127.0.0.1',
    port        : 27017,
    database    : 'my_database'
};

function getUri(cfg) {
// mongodb://[username:password@]host1[:port1][,host2[:port2],...
// [,hostN[:portN]]][/[database][?options]]
    var uri = "mongodb://";
    if (typeof cfg.user != 'undefined') {
        if (typeof cfg.pass === 'undefined') {
            cfg.pass = '';
        }
        console.log();
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
console.log("database url: [" + uri + "]" );

// connect database
var db = mongoose.createConnection(uri);

// listen event: 'error' 'open'
db.on('error', function(err) {
    console.log('mongoose error: ' + err);
});
db.once('open', function(err) {
    if (err) {
        console.log("open database failed, ERR: " + err);
    } else {
        console.log("open database success.");
    }
});


// * create models
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// ** schemas
var Schema_blog = new mongoose.Schema({
    //_id   :  ObjectId,
    date  :  { type: Date, default: Date.now },
    data  :  {
        title: String,
        content: String,
        picture : {
                name: String,
                path: String
            }
    }
});

// ** models
var models = {};
// create you model, if there is no collection_name, the default collection name will be
// < model_name + 's' >
// db.model(model_name, pre_schema, collection_name);
models['blog'] = db.model('blog', Schema_blog, 'blog');


// get the related model
module.exports = function getRelModel(collection) {
    //var model = models[collection];
    //return model;

    return models[collection];
};


//// test insert data
//// method one
//models['blog'].create({data: {title: 'test1', content: 'content1'}}, function(e) {
//    if (e) {
//        console.log("ERROR: [" + e + "]");
//    } else {
//        console.log('Doc insert  success.');
//    }
//});

//// method two
//var doc = new models['blog']({data: {title: 'test2', content: 'content2'}});
//doc.save(function(err) {
//    if (err) {
//        console.log('ERROR: ' + err);
//    } else {
//        console.log('Doc insert success.');
//    }
//});

//// test find
