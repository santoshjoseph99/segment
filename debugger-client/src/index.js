import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import DataProvider from './DataProvider';

var dataProvider = new DataProvider();
ReactDOM.render(<App dataProvider={dataProvider}/>, document.getElementById('root'));
registerServiceWorker();
