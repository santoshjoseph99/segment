import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sockette from 'sockette';
import VirtualList from 'react-tiny-virtual-list';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    let app = this;
    this.ws = new Sockette('ws://localhost:8080', {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: e => console.log('Connected!', e),
      onmessage: e => {
        // if(this.state.items.length > 500) {
        //   return;
        // }
        // console.log('Received:', e.data);
        try {
          let item = JSON.parse(e.data);
          app.state.items.unshift(item);
          app.setState({items: app.state.items})
          // this.setState({items: this.state.items.concat(item)})
        } catch (e) {
          console.log('ERROR:', e);
        }
      },
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => console.log('Stop Attempting!', e),
      onclose: e => console.log('Closed!', e),
      onerror: e => console.log('Error:', e)
    });
  }
  render() {
    // let items = this.state.items.map(x => {
    //   let userId = x.userId;
    //   userId = x.userId.substr(x.userId.lastIndexOf('-')+1);
    //   return <li>{x.type} {userId} {x.receivedAt}</li>
    // });
    // const data = ['A', 'B', 'C', 'D', 'E', 'F'];
    return (
      <div className="App">
      <div>
        <button>Live</button>
        <button>Pause</button>
        <input type="text" placeholder="Type to search" />
      </div>
      <VirtualList
    width='100%'
    height={300}
    itemCount={this.state.items.length}
    itemSize={25}
    scrollOffset={300}
    scrollToIndex={this.state.items.length}
    scrollToAlignment={'end'}
    renderItem={({index, style}) => {
      let item = this.state.items[index];
      let userId = item.userId;
      userId = item.userId.substr(item.userId.lastIndexOf('-')+1);
      return (
      <div key={index} style={style}>
        {item.type} {userId} {item.receivedAt}
      </div>);
    }
    }
  />
      </div>
    );
  }
}

export default App;
