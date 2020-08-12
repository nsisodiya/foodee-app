import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-rubik';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import './css/styles.css';
import './css/tailwind.pcss';

import { App } from './App';
import { store } from './domless/stores/store';

window.projectPath = '/home/narendra/Coding/toptal-assignment/narendra-sisodiya/client';

var mountNode = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountNode
);
