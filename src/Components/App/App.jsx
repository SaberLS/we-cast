// React
import { React, useState, useEffect } from 'react';

// styling
import './App.css';
import { ThemeProvider } from '@emotion/react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { theme } from '../../Themes/theme';

// Mui
// import Button from "@mui/material/Button";

// components
import SearchAppBar from '../AppBar/SearchAppBar.jsx';
import ForecastTable from '../Forecast/ForecastTable.jsx';
import WeatherWidget from '../WeatherWidget/WeatherWidget.jsx';

// API Calls
import getForecast from '../../ApiCall/getForecast';
import getCurrentWeather from '../../ApiCall/getCurrentWeather';
import getReverseGeocoding from '../../ApiCall/getReverseGeocoding';

// geolocation
import geolocate from '../../Helpers/geolocate';

// initial state values for use state variables
import {
  initCurrentWeather,
  initForecast,
  initLocation,
  initSearchLocation,
} from '../../Helpers/initialState';

// IN MY CASE apiKey WAS IMPORTED FROM FILE WHICH GOT IGNORED TO KEEP MY KEY PRIVATE
// YOU CAN GET API KEY HERE: https://openweathermap.org/api
import { apiKey } from '../../apiKey.js';
import Chart from '../Forecast/Chart/Chart.jsx';

function App() {
  const [location, setLocation] = useState(initLocation);
  const [searchLocation, setSearchLocation] = useState(initSearchLocation);

  const [forecast, setForecast] = useState(initForecast);
  const [currentWeather, setCurrentWeather] = useState(initCurrentWeather);

  // get user localisation when app starts
  useEffect(() => {
    geolocate(success);
  }, []);

  // executed when geolocation is possible
  async function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      const geoCoding = await getReverseGeocoding(lat, lon, apiKey);

      // Location
      const { country, local_names, state } = geoCoding[0];
      setLocation({
        name: local_names.en,
        country,
        admin: state,
        lat,
        lon,
      });

      // Search Location
      setSearchLocation({
        name: local_names.en,
        country,
        admin: state,
        lat,
        lon,
      });

      // Current Weather
      const weather = await getCurrentWeather(lat, lon, apiKey);
      setCurrentWeather(weather);

      // Forecast
      const response = await getForecast(lat, lon, apiKey);
      setForecast({
        city: response.city,
        list: response.list,
      });
    } catch (e) {
      console.error('error geolocation success():', e);
    }
  }

  // handle searchLocation change
  useEffect(() => {
    // get new forecast
    (async () => {
      const response = await getForecast(
        searchLocation.lat,
        searchLocation.lon,
        apiKey,
      );
      setForecast({
        city: response.city,
        list: response.list,
      });
    })();

    // get new currentWeather
    (async () => {
      const response = await getCurrentWeather(
        searchLocation.lat,
        searchLocation.lon,
        apiKey,
      );
      setCurrentWeather(response);
    })();
  }, [searchLocation]);

  return (
    <ThemeProvider theme={theme}>
      <Button onClick={() => console.log('location:', location)}>
        location
      </Button>
      <Button onClick={() => console.log('searchLocation:', searchLocation)}>
        searchLocation
      </Button>
      <Button onClick={() => console.log('forecast:', forecast)}>
        forecast
      </Button>
      <Button onClick={() => console.log('currentWeather:', currentWeather)}>
        currentWeather
      </Button>

      <Container maxWidth={false} disableGutters>
        <SearchAppBar
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          location={location}
        />
        <Box className="App-header">
          <WeatherWidget
            weather={currentWeather}
            setWeather={setCurrentWeather}
            location={searchLocation}
          />
        </Box>

        <Box className="App-body">
          <Box>
            <Chart
              xData={forecast.list.map((el) => el.dt * 1000)}
              valueFormatter={(el) => {
                const date = new Date(el);
                return `${date.getUTCHours()}:00\n${date.getUTCDate()}-${date.getUTCMonth() + 1}`;
              }}
              topSeries={[
                {
                  id: 'temp',
                  label: 'temperature',
                  showMark: false,
                  data: forecast.list.map((el) => Math.round(el.main.temp)),
                },
                {
                  id: 'feelsLike',
                  label: 'feels like',
                  data: forecast.list.map((el) =>
                    Math.round(el.main.feels_like),
                  ),
                  showMark: false,
                },
              ]}
              bottomSeries={[
                {
                  id: 'rain',
                  label: 'rain',
                  data: forecast.list.map((el) =>
                    el.rain ? el.rain['3h'] : 0,
                  ),
                  showMark: false,
                },
                {
                  id: 'snow',
                  label: 'snow',
                  data: forecast.list.map((el) =>
                    el.snow ? el.snow['3h'] : 0,
                  ),
                  showMark: false,
                },
              ]}
            />
          </Box>
          <ForecastTable list={forecast.list} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
