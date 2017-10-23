import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui';
import './index.css';

class MainInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'tab_0',
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

  weatherTbody = (tab_index) => {
    let forecasts = this.props.weatherInfo.list;
    return (
        <Tab label={`${ +this.today[2] + tab_index } ${ this.today[1] } ${ this.today[3] }`} value={`tab_${tab_index}`}>
          <table className="weather-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Weather</th>
                    <th>Description</th>
                    <th>Temperature</th>
                    <th>Atm. pressure, mmHg</th>
                    <th>Humidity air, %</th>
                    <th>Wind, m/s</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    forecasts 
                      ? forecasts.map((forecast, index) => {
                        let currentDate = new Date(forecast.dt_txt).toString().split(' ');
                        if (this.today[1] === currentDate[1] && +currentDate[2] === +this.today[2] + tab_index) {
                          if (forecast.dt_txt.split(' ')[1] === "03:00:00" || forecast.dt_txt.split(' ')[1] === "09:00:00" ||
                            forecast.dt_txt.split(' ')[1] === "15:00:00" || forecast.dt_txt.split(' ')[1] === "21:00:00") {
                            return (
                              <tr key={index}>
                                <td>
                                  { 
                                    forecast.dt_txt.split(' ')[1] ===  '03:00:00' ? 'Night' : 
                                    forecast.dt_txt.split(' ')[1] ===  '09:00:00' ? 'Morning' : 
                                    forecast.dt_txt.split(' ')[1] ===  '15:00:00' ? 'Afternoon' : 'Evening'
                                  }
                                </td>
                                <td><div className={`imageContainer icon-${forecast.weather[0].icon}`}></div></td>
                                <td>{ forecast.weather[0].description }</td>
                                <td>{ this.KelvinToCelsius(forecast.main.temp) } °C</td>
                                <td>{ forecast.main.pressure }</td>
                                <td>{ forecast.main.humidity }</td>
                                <td>{ forecast.wind.speed }</td>
                              </tr>
                            )
                          }
                        }
                      })
                      : <tr><td><h1>Service is downloading</h1></td></tr>
                  }
            </tbody>
          </table>
        </Tab>
    )
  }
  render () {
    return (
      <div className="tabs-wrapper">
        <h1 className="current-city">Weather in {this.props.defaultCity}</h1>
        <div className="flex-container">
          <Tabs
          value={this.state.value}
          onChange={this.handleTabChange}
          >
            { this.weatherTbody(0) }
            { this.weatherTbody(1) }
            { this.weatherTbody(2) }
          </Tabs>
        </div>
      </div>
    )
  }
}

export default MainInformation;