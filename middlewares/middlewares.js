/**
 * Created by gg on 2015/9/22.
 */


//初始化局部变量
exports.initLocals = function(req, res, next) {

    var locals = res.app.locals;

    locals.title='木鱼网络';
    locals.navlinks = [
        { label: '首页',		key: '全部项目',		href: '/'  ,icon:'glyphicon-th'},
        { label: '博客',		key: '增加项目',		href: '/post',icon:'glyphicon-plus' }
    ];

    console.log('initLocals');
    next();
};