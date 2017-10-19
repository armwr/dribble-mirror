import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import './index.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first_tab',
    };
    this.today = new Date().toString().split(' ');
  }
  handleTabChange = (value) => {
    this.setState({
      value: value,
    });
  };
  KelvinToCelsius = (temperature) => {
    return +(temperature - 273.15).toFixed(0);
  };
  weatherTabInfo = (forecast, index) => {
	   return (
	    <div key={index}>
	      <p>
	        Date of the weather : { forecast.dt_txt }<br />
	        Weather : { forecast.weather[0].main }<br />
	        Temperature : { this.KelvinToCelsius(forecast.main.temp) } C<br />
	        Description weather : { forecast.weather[0].description }<br />
	        Icon for the weather :{ forecast.weather[0].icon }<br />
	        Wind speed :{ forecast.wind.speed } m/s<br />
	      </p>
	    </div>
	  )
  }
  render () {
    let forecasts = this.props.weatherInfo.list;
    return (
      <div>
	      <h1 className="current-city">Current city: {this.props.defaultCity}</h1>
	      <div className="flex-container">
	      <Tabs
          value={this.state.value}
          onChange={this.handleTabChange}
         >
         <Tab label={`${this.today[2]} ${this.today[1]} ${this.today[3]}`} value="first_tab">
	        {
	          forecasts 
	            ? forecasts.map((forecast, index) => {
	              let currentDate = new Date(forecast.dt_txt).toString().split(' ');
                if (this.today[1] === currentDate[1] && currentDate[2] === this.today[2]) {
                  return (this.weatherTabInfo(forecast, index))
	              }
	            })
	            : <h1>Service is downloading</h1>
	        }
	        </Tab>
	        <Tab label={`${+this.today[2] + 1} ${this.today[1]} ${this.today[3]}`} value="second_tab">
	        {
	          forecasts 
	            ? forecasts.map((forecast, index) => {
	              let currentDate = new Date(forecast.dt_txt).toString().split(' ');
                if (this.today[1] === currentDate[1] && +currentDate[2] === +this.today[2] + 1) {
                  return (this.weatherTabInfo(forecast, index))
	              }
	            })
	            : <h1>Service is downloading</h1>
	        }
	        </Tab>
	        <Tab label={`${+this.today[2] + 2} ${this.today[1]} ${this.today[3]}`} value="third_tab">
	        {
	          forecasts 
	            ? forecasts.map((forecast, index) => {
	              let currentDate = new Date(forecast.dt_txt).toString().split(' ');
                if (this.today[1] === currentDate[1] && +currentDate[2] === +this.today[2] + 2) {
                  return (this.weatherTabInfo(forecast, index))
	              }
	            })
	            : <h1>Service is downloading</h1>
	        }
	        </Tab>
	      </Tabs>
	      </div>
      </div>
    )
  }
}

export default Header;