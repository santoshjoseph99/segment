const MessageProvider = require('./message-provider');
const Server = require('./server');
const _ = require('lodash');

function init() {
  console.log('REDIS: connected');
}

function error(err) {
  console.log('REDIS: Something went wrong ' + err);
}

function message(sendMessage, channel, message) {
  try {
    //TODO: google protocolbuf?
    sendMessage(message);
  } catch(e) {
    console.log('REDIS ERROR:', e);
  }
}

const server = new Server(8080);
const messageProvider = new MessageProvider(init, error);
messageProvider.subscribe('events');
messageProvider.onMessage(_.partial(message, server.broadcast.bind(server)));