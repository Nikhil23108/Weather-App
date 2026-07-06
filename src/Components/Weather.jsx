import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'

import searchicon from '../assets/search.png'
import clearicon from '../assets/clear.png'
import cloudicon from '../assets/cloud.png'
import drizzleicon from '../assets/drizzle.png'
import humidityicon from '../assets/humidity.png'
import rainicon from '../assets/rain.png'
import snowicon from '../assets/snow.png'
import windicon from '../assets/wind.png'


const Weather = () => {

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false)

    const allIcons = {
        "01d": clearicon,
        "01n": clearicon,
        "02d": cloudicon,
        "02n": cloudicon,
        "03d": cloudicon,
        "03n": cloudicon,
        "04d": drizzleicon,
        "04n": drizzleicon,
        "09d": rainicon,
        "09n": rainicon,
        "10d": rainicon,
        "10n": rainicon,
        "13d": snowicon,
        "13n": snowicon
    }

    const search = async (city) => {
    if (!city.trim()) {
        alert("Enter City Name")
        return
    }

    try {

        console.log("API Key:", import.meta.env.VITE_APP_ID)

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

        console.log("Request URL:", url)

        const response = await fetch(url)
        const data = await response.json()

        console.log("Response:", data)

        if (!response.ok) {
            alert(data.message)
            return
        }

        const icon = allIcons[data.weather[0].icon] || clearicon

        setWeatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            temperature: Math.floor(data.main.temp),
            location: data.name,
            icon: icon
        })

    } catch (error) {
        console.error("Error fetching data:", error)
        setWeatherData(false)
    }
}

    useEffect(() => {
        search("India")
    }, [])

    return (
        <div className='weather'>

            {/* Search Bar */}
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search city' />
                <img
                    src={searchicon}
                    alt="search"
                    onClick={() => search(inputRef.current.value)}
                />
            </div>

            {/* Weather Display */}
            {weatherData ? (
                <>
                    <img src={weatherData.icon} alt="weather icon" className='weather-icon' />

                    <p className="temperature">
                        {weatherData.temperature}°C
                    </p>

                    <p className="location">
                        {weatherData.location}
                    </p>

                    <div className="weather-data">

                        <div className="col">
                            <img src={humidityicon} alt="humidity" />
                            <p>{weatherData.humidity}%</p>
                            <span>Humidity</span>
                        </div>

                        <div className="col">
                            <img src={windicon} alt="wind" />
                            <p>{weatherData.windSpeed} km/hr</p>
                            <span>Wind Speed</span>
                        </div>

                    </div>
                </>
            ) : (
                <p className="error-msg">Search a city to see weather</p>
            )}

        </div>
    )
}

export default Weather