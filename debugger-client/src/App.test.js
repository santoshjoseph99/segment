import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

describe('App tests', () => {
  class DataProviderMock {
    start(){}
  }
  it('renders without crashing', () => {
    const dataProvider = new DataProviderMock();
    const div = document.createElement('div');
    ReactDOM.render(<App dataProvider={dataProvider}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('items can be added', () => {
    const dataProvider = new DataProviderMock();
    dataProvider.start = function (callbacks) {
      callbacks.onmessage({data: JSON.stringify({x: 'abc'})})
      callbacks.onmessage({data: JSON.stringify({x: 'def'})})
      callbacks.onmessage({data: JSON.stringify({x: 'ghi'})})
    };
    const div = document.createElement('div');
    const app = <App dataProvider={dataProvider}/>;
    const wrapper = shallow(app);
    ReactDOM.unmountComponentAtNode(div);
    expect(wrapper.props().children[1].props.itemCount).toEqual(3);
  });

  it('live data can be paused', () => {

  });

  it('live data can be searched', () => {

  });

  it('paused data can be unpaused', () => {

  });

  it('paused data can be searched', () => {

  });
});