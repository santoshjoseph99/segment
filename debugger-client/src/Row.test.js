import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Row from './Row';

describe('Row tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const item = {
      userId: 'abc-def',
      date: '2018-8-27 11:35',
      type: 'type'
    }
    ReactDOM.render(<Row item={item} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});