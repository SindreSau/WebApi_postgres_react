import React, { useEffect, useState } from 'react';

const WeatherForecast = () => {
    const [forecasts, setForecasts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/weatherforecast', {
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setForecasts(data))
            .catch(e => {
                console.error('There was a problem fetching the weather data:', e);
                setError(e.message);
            });
    }, []);

    if (error) return <div>Error: {error}</div>;
    
    interface WeatherForecast {
        date: string;
        temperatureC: number;
        temperatureF: number;
        summary: string;
    }

    return (
        <div>
            <h1>Weather Forecast</h1>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
                </thead>
                <tbody>
                {forecasts.map((forecast: WeatherForecast, index) => (
                    <tr key={index}>
                        <td>{new Date(forecast.date).toLocaleDateString()}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default WeatherForecast;