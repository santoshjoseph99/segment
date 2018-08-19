const WebSocket = require('ws');
var redis = require('redis');
var client = redis.createClient();
// var clients = [];



const wss = new WebSocket.Server({ port: 8080 });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // console.log('received: %s', message);
  });

  ws.send('something');
});

client.on('connect', function() {
  console.log('connected');
});
client.on('error', function (err) {
console.log('Something went wrong ' + err);
});
var i = 0;
client.on('message', function(channel, message){
try {
  const json = JSON.parse(message);
  console.log('DATA:', i);
  wss.broadcast(message);
  i = i + 1;
} catch(e) {
  console.log('ERROR:',e );
}
});
client.subscribe('events');