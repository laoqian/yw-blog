/**
 * Created by gg on 2015/9/23.
 */
exports = module.exports = function  (req, res) {

    var locals=res.app.locals;

    res.render('index',locals);
}