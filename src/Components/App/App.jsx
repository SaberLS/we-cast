//React
import { React, useState, useEffect } from "react";

//styling
import "./App.css";
import { theme } from "../../Themes/theme";

//Mui
import { ThemeProvider } from "@emotion/react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
//import Button from "@mui/material/Button";

//components
import SearchAppBar from "../AppBar/SearchAppBar";
import ForecastTable from "../Forecast/ForecastTable";
import WeatherWidget from "../WeatherWidget/WeatherWidget";

//API Calls
import getForecast from "../../ApiCall/getForecast";
import getCurrentWeather from "../../ApiCall/getCurrentWeather";
import getReverseGeocoding from "../../ApiCall/getReverseGeocoding";

//geolocation
import geolocate from "../../Helpers/geolocate";

//initial state values for use state variables
import {
  initCurrentWeather,
  initForecast,
  initLocation,
  initSearchLocation,
} from "../../Helpers/initialState";

//IN MY CASE apiKey WAS IMPORTED FROM FILE WHICH GOT IGNORED TO KEEP MY KEY PRIVATE
//YOU CAN GET API KEY HERE: https://openweathermap.org/api
import { apiKey } from "../../apiKey";
import Chart from "../Forecast/Chart";

function App() {
  const [location, setLocation] = useState(initLocation);
  const [searchLocation, setSearchLocation] = useState(initSearchLocation);

  const [forecast, setForecast] = useState(initForecast);
  const [currentWeather, setCurrentWeather] = useState(initCurrentWeather);

  //get user localisation when app starts
  useEffect(() => {
    geolocate(success);
  }, []);

  async function success(position) {
    //executed when geolocation is possible
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      const geoCoding = await getReverseGeocoding(lat, lon, apiKey);

      //Location
      const { country, local_names, state } = geoCoding[0];
      setLocation({
        name: local_names.en,
        country: country,
        admin: state,
        lat: lat,
        lon: lon,
      });

      //Search Location
      setSearchLocation({
        name: local_names.en,
        country: country,
        admin: state,
        lat: lat,
        lon: lon,
      });

      //Current Weather
      const weather = await getCurrentWeather(lat, lon, apiKey);
      setCurrentWeather(weather);

      //Forecast
      const response = await getForecast(lat, lon, apiKey);
      setForecast({
        city: response.city,
        list: response.list,
      });
    } catch (e) {
      console.error("error geolocation success():", e);
    }
  }

  //handle searchLocation change
  useEffect(() => {
    //get new forecast
    (async () => {
      const response = await getForecast(
        searchLocation.lat,
        searchLocation.lon,
        apiKey
      );
      setForecast({
        city: response.city,
        list: response.list,
      });
    })();

    //get new currentWeather
    (async () => {
      const response = await getCurrentWeather(
        searchLocation.lat,
        searchLocation.lon,
        apiKey
      );
      setCurrentWeather(response);
    })();
  }, [searchLocation]);

  return (
    <ThemeProvider theme={theme}>
      {/* Testing buttons
      {<Button onClick={() => console.log("location:", location)}>
        location
      </Button>
      <Button onClick={() => console.log("searchLocation:", searchLocation)}>
        searchLocation
      </Button>
      <Button onClick={() => console.log("forecast:", forecast)}>
        forecast
      </Button>
      <Button onClick={() => console.log("currentWeather:", currentWeather)}>
        currentWeather
      </Button>} 
      */}

      <Container maxWidth={false} disableGutters>
        <SearchAppBar
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          location={location}
        ></SearchAppBar>
        <Box className="App-header">
          <WeatherWidget
            weather={currentWeather}
            setWeather={setCurrentWeather}
            location={searchLocation}
          />
        </Box>

        <Box className="App-body">
          <Box
            sx={{
              height: {
                xs: "70vh",
                sm: "65vh",
                md: "50vh",
                lg: "50vh",
                xl: "50vh",
              },
              width: {
                xs: "100vw",
                sm: "100vw",
                md: "80vw",
                lg: "80vw",
                xl: "80vw",
              },
            }}
          >
            <Chart
              xData={forecast.list.map((el) => {
                return el.dt;
              })}
              series={[
                {
                  id: "temp",
                  label: "temperature",
                  data: forecast.list.map((el) => {
                    return Math.round(el.main.temp);
                  }),
                },
                {
                  id: "feelsLike",
                  label: "feels Like",
                  data: forecast.list.map((el) => {
                    return Math.round(el.main.feels_like);
                  }),
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
