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

  windDirection = (wind) => {
    return wind >= 22.5 && wind <= 68 ? 'north-east' :
           wind >= 68 && wind <= 112 ? 'east' :
           wind >= 112 && wind <= 158 ? 'south-east' :
           wind >= 158 && wind <= 202 ? 'south' :
           wind >= 202 && wind <= 248 ? 'south-west' :
           wind >= 248 && wind <= 292 ? 'west' :
           wind >= 292 && wind <= 318 ? 'north-west' :
           wind >= 318 && wind <= 360 ? 'north' : 'north';
  }

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
                                <td><div className={`weatherContainer icon-${forecast.weather[0].icon}`}></div></td>
                                <td><span>{ forecast.weather[0].description }</span></td>
                                <td><span>{ this.KelvinToCelsius(forecast.main.temp) } °C</span></td>
                                <td><span>{ forecast.main.pressure }</span></td>
                                <td><span>{ forecast.main.humidity }</span></td>
                                <td className="flex-container"><div className={`windContainer ${this.windDirection(forecast.wind.deg)}`}></div><p className="windPar">{ forecast.wind.speed }</p></td>
                              </tr>
                            )
                          }
                        }
                      })
                      : <tr><td><h1>Service is currently unavailable</h1></td></tr>
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
        <Tabs
        value={this.state.value}
        onChange={this.handleTabChange}
        >
          { this.weatherTbody(0) }
          { this.weatherTbody(1) }
          { this.weatherTbody(2) }
        </Tabs>
      </div>
    )
  }
}

export default MainInformation;