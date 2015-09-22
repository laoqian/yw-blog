var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {

  var locals={
    title:'木鱼网络',
    section:'index',
    navlinks:{
      index:{
        label:'index',
        key:'内容管理',
        icon:'glyphicon-home'
      },
      post:{
        label:'post',
        key:'内容增加',
        icon:'glyphicon-time'

      },
      comment:{
        label:'comment',
        key:'回复管理',
        icon:'glyphicon-user'
      }
    }
  }

  res.render('index', locals);
});

router.get("/post", function(req, res, next) {

  var locals={
    title:'木鱼网络',
    section:'index',
    navlinks:{
      index:{
        label:'index',
        key:'内容管理',
        icon:'glyphicon-home'
      },
      post:{
        label:'post',
        key:'内容增加',
        icon:'glyphicon-time'

      },
      comment:{
        label:'comment',
        key:'回复管理',
        icon:'glyphicon-user'
      }
    }
  }

  res.render('post', locals);
});

module.exports = router;
