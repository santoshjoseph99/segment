const redis = require('redis');

class MessageProvider {
  constructor(cbInit, cbError) {
    this.redisClient = redis.createClient();
    this.redisClient.on('connect', cbInit);
    this.redisClient.on('error', cbError);
  }

  subscribe(name) {
    this.redisClient.subscribe(name);
  }

  onMessage(cbMsg) {
    this.redisClient.on('message', cbMsg);
  }
}

module.exports = MessageProvider;