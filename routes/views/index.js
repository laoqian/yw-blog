/**
 * Created by gg on 2015/9/23.
 */
var debug = require('debug')('app:index');
var find_args = {
    field: 'data.title date',
    limit: 5,
    skip : 0,
    sort : {date:-1}
};
var page_args = {
    current: 1,
    total: 0
};


exports = module.exports = function  (req, res) {
    var locals=res.app.locals;
    var model_blog = locals.table('blog');
    locals.pages = {};
    locals.blogs = [];


    if (req.method.toLocaleLowerCase() === 'get') {
        model_blog.count(updatePage);
    } else {
        model_blog.find({}, find_args.field, getData).sort(find_args.sort).skip(find_args.skip).limit(find_args.limit);
    }


    function updatePage(err, count) {
        if (err) {
            debug(err);
            res.render('index', locals);
            return;
        }

        locals.pages.total = count / find_args.limit + (0 == count % find_args.limit ? 0 : 1);
        model_blog.find({}, find_args.field, getData).sort(find_args.sort).skip(find_args.skip).limit(find_args.limit);
    }

    function getData(err, data){
        if (err) {
            debug(err);
            res.render('index', locals);
            return;
        }

        for (i in data) {
            locals.blogs.push({index: find_args.skip++, title: data[i].data.title, date: data[i].date});
        }

        page_args.current = find_args.skip / find_args.limit + (0 == find_args.skip % find_args.limit ? 0 : 1);
        locals.pages.current = page_args.current;
        res.render('index', locals);
    }

};