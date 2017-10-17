import React, { Component } from 'react';
import './index.css';

class Header extends Component {
  KelvinToCelsius(temperature) {
    return +(temperature - 273.15).toFixed(0);
  }
  render () {
    let forecasts = this.props.weatherInfo.list;
    return (
      <div>
	      <h1 className="current-city">Current city: {this.props.defaultCity}</h1>
	      <div className="flex-container">
	        {
	          forecasts 
	            ? forecasts.map((forecast, index) => {
	              return (
	                <div key={index} className="flex-item">
	                    Date of the weather : { forecast.dt_txt }<br />
	                    Weather : { forecast.weather[0].main }<br />
	                    Temperature : { this.KelvinToCelsius(forecast.main.temp) } C<br />
	                    Description weather : { forecast.weather[0].description }<br />
	                    Icond for the weather :{ forecast.weather[0].icon }<br />
	                    Wind speed :{ forecast.wind.speed } m/s<br />
	                </div>
	              )
	            })
	            : <h1>Service is downloading</h1>
	        }
	      </div>
      </div>
    )
  }
}

export default Header;