var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    console.log('connected');
});
client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});
// client.set('my test key', 'my test value', redis.print);
// client.get('my test key', function (error, result) {
//     if (error) {
//         console.log(error);
//         throw error;
//     }
//     console.log('GET result ->' + result);
// });
// client.on_connect('subscribe', function(channel, count){
//   console.log('subscribe');
// })
var i = 0;
client.on('message', function(channel, message){
  try {
    const json = JSON.parse(message);
    console.log('DATA:', i, json);
    i = i + 1;
  } catch(e) {
    console.log('ERROR:',e );
  }
});
// client.on_connect('pmessage', function(pattern,channel, message){
//   console.log('hello1');
// });
// client.on_connect('pmessage', function(pattern,channel, message){
//   console.log('hello1');
// });
// client.on_connect('pmessage_buffer', function(pattern,channel, message){
//   console.log('hello2');
// });
// client.on_connect('message_buffer', function(pattern,channel, message){
//   console.log('hello3');
// });

client.subscribe('events');
module.exports = app;
