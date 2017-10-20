import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import './index.css';

class MainInformation extends Component {
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
    if (forecast.dt_txt.split(' ')[1] === "03:00:00" || forecast.dt_txt.split(' ')[1] === "09:00:00" ||
       forecast.dt_txt.split(' ')[1] === "15:00:00" || forecast.dt_txt.split(' ')[1] === "21:00:00") {
	    return (
		    <table key={index}>
		      <tbody>
		        <tr>
			        <td>{ forecast.dt_txt.split(' ')[1] }</td>
			        <td><div className={`imageContainer icon-${forecast.weather[0].icon}`}></div></td>
			        <td>Weather: { forecast.weather[0].main }</td>
			        <td>Temperature: { this.KelvinToCelsius(forecast.main.temp) } °C</td>
			        <td>Description: { forecast.weather[0].description }</td>
			        <td>Wind speed: { forecast.wind.speed } m/s</td>
		        </tr>
		      </tbody>
		    </table>
	    )
	 } else {
	   return;
	 }
  }
  render () {
    let forecasts = this.props.weatherInfo.list;
    return (
      <div className="tabs-wrapper">
	      <h1 className="current-city">Weather in {this.props.defaultCity}</h1>
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

export default MainInformation;