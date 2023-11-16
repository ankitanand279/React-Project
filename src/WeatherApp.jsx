import React, { Component } from 'react';
import './WeatherApp.css';


export default class WeatherApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      weatherData: null,
      forecastData: null,
      error: '',
      showForecast: false,
    };

    this.API_KEY = '09d75966cd9607042f423dc9c0e6f26d';
    this.weatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
    this.forecastEndpoint = 'https://api.openweathermap.org/data/2.5/forecast';
  }

  getWeatherData = async () => {
    try {
      const { location } = this.state;

      const response = await fetch(`${this.weatherEndpoint}?q=${location}&appid=${this.API_KEY}`);
      const weatherData = await response.json();

      const forecastResponse = await fetch(`${this.forecastEndpoint}?q=${location}&appid=${this.API_KEY}`);
      const forecastData = await forecastResponse.json();

      this.setState({ weatherData, forecastData, error: '' });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      this.setState({ error: 'Error fetching weather data. Please check your input and try again.' });
    }
  };


  getForecastData = async() =>{

  };

  handleSearch = () => {
    const { location } = this.state;

    if (location) {
      this.getWeatherData();
      this.setState({showForecast:false});
    } else {
      this.setState({ error: 'Please enter a city name.' });
    }
  };

  handleForecast = () =>{
    const {location} = this.state;
    
    if (location){
        this.getForecastData();
        this.setState({showForecast:true});
    }
    else{
        this.setState({error:'Please enter a city name'});
    }
  }

  render() {
    const { location, weatherData, forecastData, error,showForecast } = this.state;

    return (
    <div className="weather-app-container">
    {/* <h1>Weather App</h1> */}
    <div className="input-container">
    <h1>Weather App</h1>
    <label>
    City Name:
    <input
        type="text"
        value={location}
        onChange={(e) => this.setState({ location: e.target.value })}
        className="input-field"
    />
    </label>
    <br></br>
    <button onClick={this.handleSearch} className="search-button">
        Search
    </button>
    <button onClick={this.handleForecast} className='forecast-button'>
        Forecast
    </button>
    </div>
    

    {error && <p className="error-message">{error}</p>}

    {weatherData && !showForecast && (
    <div className="weather-details">
    <h2>Current Weather</h2>
    <p>Temperature: {(weatherData.main.temp- 273).toFixed(2)} Celsius</p>
    <p>Weather: {weatherData.weather[0].description}</p>
    </div>
    )}

    {forecastData && showForecast && (
    <div className="forecast-details">
    <h2>5-Days Forecast</h2>
    <ul>
    {forecastData.list.map((item) => (
    <li key={item.dt}>
        {item.dt_txt}: {(item.main.temp - 273).toFixed(2)} Celsius, {item.weather[0].description}
    </li>
    ))}
    </ul>
    </div>
    )}
    </div>
    );
  }
}
