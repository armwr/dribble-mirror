import React, { Component } from 'react';
import Header from './Header';
import MainInformation from './MainInformation';
import cookie from 'react-cookies';
import { MuiThemeProvider, TextField, RaisedButton } from 'material-ui';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherInfo: [],
      defaultCity: 'London',
      newCity: '',
    }
  }
  componentDidMount() {
    let apiCall = new Promise(function() {});
    apiCall.then(this.getCity());
    apiCall.then(this.createRequest());
  }
  getCity() {
	    if (cookie.load('weather-app-city')) {
	      this.setState({defaultCity: cookie.load('weather-app-city')})
	    } else {
	    let cityRequestURL = 'https://freegeoip.net/json/';
	    fetch(cityRequestURL, {
	      method: 'GET'
	    })
	    .then(response => response.json())
	    .then(json => {
	      this.setState({defaultCity: json.city})
	    })
	  }
  }
  createRequest(city) {
    const WEATHER_FORECAST_API_TOKEN = '6692528c5050d5ca6bbd2daac9eeab8a';
    let BASE_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_FORECAST_API_TOKEN}`;

    fetch(BASE_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      this.setState({weatherInfo: json});
    })
  }
  updateCity() {
  	cookie.save('weather-app-city', this.state.newCity);
    this.setState({defaultCity: this.state.newCity});
    this.createRequest(this.state.newCity);
  }
  render() {
    return (
	    <MuiThemeProvider>
	      <div>
	        <Header />
	        <div className="input-wrapper">
	        <TextField 
	          className="search-input"
	          hintText="City to find..."
	          onChange={ event => {
	            this.setState({newCity: event.target.value}),
	            cookie.save('weather-app-city', this.state.newCity);
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
	        <MainInformation weatherInfo={this.state.weatherInfo} defaultCity={this.state.defaultCity} />
	      </div>
	    </MuiThemeProvider>
    )
  }
}

export default App;
