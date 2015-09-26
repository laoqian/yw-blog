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
    var urlQuery = url.parse(req.url, true).query;
    var pNum = parseInt(urlQuery.p, 10);
    if (isNaN(pNum) || pNum <= 0) {
      pNum = 1;
    }

    if (pNum > locals.pages.tol) {
      pNum = locals.pages.tol;
    }
    locals.pages.cur = pNum;

    modelBlog.find({}, findArgs.searchField, getData).sort(findArgs.sortArgs).skip((pNum-1) * findArgs.itemPerPage) .limit(findArgs.itemPerPage);
  }

  function getData(err, data){
    if (err) {
      debug(err);
      res.render('index', locals);
      return;
    }

    var index = 1 + (locals.pages.cur - 1) * findArgs.itemPerPage;
    for (i in data) {
      locals.blogs.push({index: index++, title: data[i].data.title, date: data[i].date});
    }

    res.render('index', locals);
  }
};