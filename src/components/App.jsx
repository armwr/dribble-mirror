import React, { Component } from 'react';
import Header from './Header';
import MainInformation from './MainInformation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherInfo: []
    }
  }
  componentDidMount() {
    const token = '6692528c5050d5ca6bbd2daac9eeab8a';
    let BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?q=Chernihiv,UA&appid=" + token;

    fetch(BASE_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      this.setState({weatherInfo: json});
    })
  }
  render() {
    return (
      <div>
        <Header />
        <MainInformation weatherInfo={this.state.weatherInfo} />
      </div>
    )
  }
}

export default App;
