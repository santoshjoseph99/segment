const WebSocket = require('ws');

class Server {
  constructor(port) {
    this.wss = new WebSocket.Server({ port });
  }

  broadcast(data) {
    this.wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  onNewConnection(cb) {
    this.wss.on('connection', cb);
  }
}

module.exports = Server;