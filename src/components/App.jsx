import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import { CircularProgress, TextField, RaisedButton } from 'material-ui';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherInfo: [],
      defaultCity: 'London',
      newCity: '',
      showPreloader: true,
      mainBlockShow: false
    }
  };

  componentDidMount = () => {
    this.preloader();
    this.getCity();
  };

  getCity = () => {
    let cityRequestURL = 'https://freegeoip.net/json/';
    fetch(cityRequestURL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      this.setState({defaultCity: json.city})
      this.createRequest(this.state.defaultCity);
    })
  };

  createRequest = (city) => {
    const WEATHER_FORECAST_API_TOKEN = '6692528c5050d5ca6bbd2daac9eeab8a';
    let BASE_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_FORECAST_API_TOKEN}`;
    
    fetch(BASE_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      this.setState({weatherInfo: json});
    })
  };

  updateCity = () => {
    if (/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(this.state.newCity)) {
      this.setState({defaultCity: this.state.newCity});
      this.createRequest(this.state.newCity);
    }
  };
  
  preloader = () => {
    setTimeout(() => {
      this.setState({
        mainBlockShow: true,
        showPreloader: false
      });
    }, 2000);
  };


  render() {
    return (
      <div>
        <div className={ this.state.mainBlockShow ? 'element-show' : 'element-hidden' }>
          <Header />
          <div className="input-wrapper">
          <TextField 
            className="search-input"
            hintText="City to find..."
            onChange={ event => {
              this.setState({newCity: event.target.value})
            }}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.updateCity()
              }
            }}
          />
          <RaisedButton 
            label="Search" 
            primary={true} 
            className="submit-button"
            onClick={() => this.updateCity()}
          />
          </div> 
          <Main weatherInfo={this.state.weatherInfo} defaultCity={this.state.defaultCity} /> 
        </div>
        <div className={`preloader-wrapper ${this.state.mainBlockShow ? 'element-hidden' : 'element-show' }`}>
          <CircularProgress size={100} thickness={5} />
        </div>
      </div>
    )
  }
}

export default App;
