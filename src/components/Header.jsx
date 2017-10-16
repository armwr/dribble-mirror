import React, { Component } from 'react';
import { MuiThemeProvider, AppBar }  from 'material-ui';
import './index.css';

class Header extends Component {
  render () {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            title="Weather App"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Header;