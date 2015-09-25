/**
 * Created by gg on 2015/9/23.
 */
exports = module.exports = function  (req, res) {

    var locals=res.app.locals;
    console.log("首页就是这个");
    res.render('index',locals);
}