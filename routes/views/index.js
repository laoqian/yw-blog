/**
 * Created by gg on 2015/9/23.
 */
exports = module.exports = function  index(req, res) {

    var locals=res.locals;
    console.log("首页就是这个");
    res.render('index',locals);
}