/**
 * Created by gg on 2015/9/22.
 */


//初始化局部变量
exports.initLocals = function(req, res, next) {

    var locals = res.locals;

    locals.Links = [
        { label: '首页',		key: 'home',		href: '/' },
        { label: '博客',		key: 'blog',		href: '/blog' },
        { label: '图库',		key: 'gallery',		href: '/gallery' },
        { label: '联系我们',		key: 'contact',		href: '/contact' }
    ];


    next();
};