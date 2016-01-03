var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
		var message = req.body.message;
		console.log(req.body);
		console.log('here');
		//res.render('index', { title: 'Express' });
    res.send("got message" + message);
  	//res.render('index', { title: 'Express' });
});

module.exports = router;
