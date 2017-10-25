import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { MuiThemeProvider } from 'material-ui';

ReactDOM.render(
  <MuiThemeProvider >
    <App />
  </MuiThemeProvider>, document.getElementById('root')
);
