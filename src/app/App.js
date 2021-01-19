import React, { Component } from 'react';
import Wform from './components/Wform';
import Winfo from './components/Winfo';

import { KEY_WEATHER } from './keys';

class App extends Component {

    state = {
        temperature: '',
        description: '',
        humidity: '',
        wind_speed: 0,
        city: '',
        country: '',
        error: null
    };

    getWeather = async (e) => {
        e.preventDefault();
        const { city, country } = e.target.elements;
        const cityVal = city.value;
        const countryVal = country.value;

        if (cityVal && countryVal) {
            // Celcius Unit
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal},${countryVal}&appid=${KEY_WEATHER}&units=metric`;
            const response = await fetch(API_URL);
            const data = await response.json();
            console.log(data)

            this.setState({
                temperature: data.main.temp,
                description: data.weather[0].description,
                humidity: data.main.humidity,
                wind_speed: data.wind.speed,
                city: data.name,
                country: data.sys.country,
                error: null
            });
        } else {
            this.setState({
                error: 'Please enter a City and a Country.'
            });
        }

    }

    render() {
        return <div className="container p-4">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <Wform
                        getWeather={this.getWeather}
                    />
                    <Winfo {...this.state} />
                </div>
            </div>
        </div>
    }
}

export default App;
               