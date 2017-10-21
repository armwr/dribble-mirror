import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui';
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
  weatherThead = () => {
    return (
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
    )
  }
  weatherTbody = (forecast, index) => {
    if (forecast.dt_txt.split(' ')[1] === "03:00:00" || forecast.dt_txt.split(' ')[1] === "09:00:00" ||
       forecast.dt_txt.split(' ')[1] === "15:00:00" || forecast.dt_txt.split(' ')[1] === "21:00:00") {
      return (
        <tr key={index}>
          <td>{ forecast.dt_txt.split(' ')[1] }</td>
          <td><div className={`imageContainer icon-${forecast.weather[0].icon}`}></div></td>
          <td>{ forecast.weather[0].description }</td>
          <td>{ this.KelvinToCelsius(forecast.main.temp) } °C</td>
          <td>{ forecast.main.pressure }</td>
          <td>{ forecast.main.humidity }</td>
          <td>{ forecast.wind.speed }</td>
        </tr>
      )
   } else {
     return;
   }
  }
  render () {
    let forecasts = this.props.weatherInfo.list;
        console.log(forecasts)
    return (
      <div className="tabs-wrapper">
        <h1 className="current-city">Weather in {this.props.defaultCity}</h1>
        <div className="flex-container">
          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
          >
            <Tab label={`${ this.today[2] } ${ this.today[1] } ${ this.today[3] }`} value="first_tab">
              <table className="weather-table">
                {this.weatherThead()}
                 <tbody>
                  {
                    forecasts 
                      ? forecasts.map((forecast, index) => {
                        let currentDate = new Date(forecast.dt_txt).toString().split(' ');
                        if (this.today[1] === currentDate[1] && currentDate[2] === this.today[2]) {
                          return (
                            this.weatherTbody(forecast, index)
                          )
                        }
                      })
                      : <tr><td><h1>Service is downloading</h1></td></tr>
                  }
                </tbody>
              </table>
            </Tab>
            <Tab label={`${ +this.today[2] + 1 } ${ this.today[1] } ${ this.today[3] }`} value="second_tab">
              <table className="weather-table">
                 {this.weatherThead()}
                 <tbody>
                  {
                    forecasts 
                      ? forecasts.map((forecast, index) => {
                        let currentDate = new Date(forecast.dt_txt).toString().split(' ');
                        if (this.today[1] === currentDate[1] && +currentDate[2] === +this.today[2] + 1) {
                          return (
                            this.weatherTbody(forecast, index)
                          )
                        }
                      })
                      : <tr><td><h1>Service is downloading</h1></td></tr>
                  }
                </tbody>
              </table>
            </Tab>
            <Tab label={`${ +this.today[2] + 2 } ${ this.today[1] } ${ this.today[3] }`} value="third_tab">
              <table className="weather-table">
                 {this.weatherThead()}
                 <tbody>
                  {
                    forecasts 
                      ? forecasts.map((forecast, index) => {
                        let currentDate = new Date(forecast.dt_txt).toString().split(' ');
                        if (this.today[1] === currentDate[1] && +currentDate[2] === +this.today[2] + 2) {
                          return (
                            this.weatherTbody(forecast, index)
                          )
                        }
                      })
                      : <tr><td><h1>Service is downloading</h1></td></tr>
                  }
                </tbody>
              </table>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default MainInformation;