var express = require('express');
var router = express.Router();
var debug = require('debug')('hookhub-hook-ping');

debug("Loading");

router.use('/', function (req, res, next) {
	if (req.method == 'GET') {
		res.locals.payload = req.query;
	} else if (req.method == 'POST') {
		debug("Request Body:");
		debug(req.body);
		if (req.headers['content-type'] == 'application/json' && typeof req.body != 'object') {
			debug("Converting to JSON");
			res.locals.payload = JSON.parse(req.body);
		} else {
			res.locals.payload = req.body;
		}
	}
	next();
});

/* GET home page. */
router.use('/', function(req, res, next) {
  debug("Handling default request");
  var params = {result:"PONG",ts:Date.now(),message:"PONG"};

  if(res.locals.payload.message !== undefined)
    params.message = res.locals.payload.message;

  res.send(params);
});

module.exports = router;
