import Sockette from 'sockette';

class DataProvider {
  constructor(path = 'ws://localhost:8080') {
    this.path = path;
    this.ws = null;
  }

  start(callbacks) {
    let defaultCbs = {
      onopen: {},
      onmessage: {},
      onreconnect: {},
      onmaximum: {},
      onclose: {},
      onerror: {},
    }
    let cbs = Object.assign({}, defaultCbs, callbacks);
    this.ws = new Sockette(this.path, {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: e => console.log('Connected!', e),
      onmessage: e => cbs.onmessage(e),
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => {}, //console.log('Stop Attempting!', e),
      onclose: e => {}, //console.log('Closed!', e),
      onerror: e => cbs.onerror(e)
    });
  }
}

export default DataProvider;