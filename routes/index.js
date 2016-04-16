var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session['UserSessionInfo'] !== undefined){
    res.render('index', { title: JSON.stringify(req.session['UserSessionInfo']) });
  }
  else {
    res.render('index', {title: 'Express'});
  }
});


module.exports = router;
