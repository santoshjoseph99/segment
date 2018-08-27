import React, { Component } from 'react';
import './App.css';
import VirtualList from 'react-tiny-virtual-list';
import Header from './Header';
import Row from './Row';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.items = [];
    this.filteredItems = [];
    this.showEvents = true;
    this.searchTerm = '';
    this.change = this.change.bind(this);
    this.search = this.search.bind(this);
  }

  change(value) {
    if(value === 'pause') {
      this.showEvents = false;
    } else {
      this.showEvents = true;
    }
  }

  search(event) {
    this.searchTerm = event.target.value;
  }

  addItem(data) {
    if(this.searchTerm && this.searchTerm.length > 2) {
      this.filteredItems = this.items.filter(x => {
           return x.type.indexOf(this.searchTerm) >= 0 ||
               x.userId.indexOf(this.searchTerm) >= 0;
          });
    } else {
      this.filteredItems = [];
    }
    if(!this.showEvents) {
      this.setState({items: this.filteredItems.length > 0 ? this.filteredItems : this.items})
      return;
    }
    if(this.items.length > 10000) {
      this.items.splice(9000, 1000);
      this.setState({items: this.items});
    }
    try {
      let item = JSON.parse(data);
      this.items.unshift(item);
      this.setState({items: this.filteredItems.length > 0 ? this.filteredItems : this.items})
    } catch (e) {
      console.log('ERROR:', e);
    }
  }

  componentDidMount() {
    let app = this;
    let delay = 100;
    let totalDelay = 0;
    function message(e) {
      totalDelay += delay;
      if(app.items.length < 5) {
        app.addItem(e.data);
      } else {
        setTimeout(app.addItem.bind(app), totalDelay, e.data);
      }
    }
    function error(e) {

    }
    this.props.dataProvider.start({
      onmessage: message,
      onerror: error
    });
  }

  render() {
    return (
      <div className="App">
        <Header changeClick={this.change} search={this.search} />
        <VirtualList
          width='100%'
          height={600}
          itemCount={this.state.items.length}
          itemSize={50}
          renderItem={({index, style}) => {
            let item = this.state.items[index];
            return (
              <div key={index} style={style}>
                <Row item={item} />
              </div>);
            }
          }
        />
      </div>
    );
  }
}

export default App;
