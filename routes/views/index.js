/**
 * Created by gg on 2015/9/23.
 */
var url = require('url');

var debug = require('debug')('app:index');
var findArgs = {
  searchField : 'data.title date',
  itemPerPage : 5,
  sortArgs    : {date:-1}
};


exports = module.exports = function  (req, res) {
  var myLocals  = res.app.locals;
  var modelBlog = myLocals.table('blog');

  var locals = res.locals;
  locals.pages = {};
  locals.blogs = [];

  modelBlog.count(updatePageCount);
  function updatePageCount(err, count) {
    if (err) {
      debug(err);
      res.render('index', locals);
      return;
    }

    // get the total page
    locals.pages.tol = count / findArgs.itemPerPage + (0 == count % findArgs.itemPerPage ? 0 : 1);

    // revise the page number, and it is also the current page number
    var urlParse = url.parse(req.url).query;
    var pNum = urlParse.p;
    if (typeof pNum != 'number' || pNum <= 0) {
      pNum = 1;
    }
    if (pNum > locals.pages.tol) {
      pNum = locals.pages.tol;
    }
    locals.pages.cur = pNum;

    modelBlog.find({}, findArgs.searchField, getData)
      .sort(findArgs.sortArgs)
      .skip((pNum-1) * findArgs.itemPerPage)
      .limit(findArgs.itemPerPage);
  }

  function getData(err, data){
    if (err) {
      debug(err);
      res.render('index', locals);
      return;
    }

    for (i in data) {
      locals.blogs.push({index: findArgs.skip++, title: data[i].data.title, date: data[i].date});
    }

    res.render('index', locals);
  }
};