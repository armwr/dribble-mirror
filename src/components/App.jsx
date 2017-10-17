import React, { Component } from 'react';
import Header from './Header';
import MainInformation from './MainInformation';
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
    let apiCall = new Promise(function(resolve, reject) {});
    apiCall.then(this.getCity());
    apiCall.then(this.createRequest());
  }
  getCity() {
    let cityRequestURL = 'https://freegeoip.net/json/';
    fetch(cityRequestURL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      this.setState({defaultCity: json.city})
      console.log(this.state.defaultCity)
    })
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
	          onChange={event => this.setState({newCity: event.target.value})}
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
