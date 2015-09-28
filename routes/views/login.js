
exports = module.exports = function (req, res) {

    if (req.method.toLowerCase() === 'post') {
        console.log(req.body.user + '***' + req.body.pass);
    }

    res.render('login', res.locals);
};