var express = require('express');
var router = express.Router();
//const redis = require('redis');

// const sub = redis.createClient();

// sub.on_connect('connnect', function(){
//   console.log('connected');
// });

// sub.on_connect('subscribe', function(channel, count){
//   console.log('subscribe');
// })
// sub.on_connect('message', function(channel, message){
//   try {
//     const json = JSON.parse(message);
//     console.log('DATA:', json);
//   } catch(e) {
//     console.log('ERROR:',e );
//   }
// });

// sub.subscribe('events');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
