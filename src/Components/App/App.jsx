import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../Themes/theme";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import getCurrentWeather from "../../ApiCall/getCurrentWeather";
import { apiKey } from "../../apiKey";
import {
  getCurrentAirPollution,
  getForecastAirPollution,
  getHistoryAirPollution,
} from "../../ApiCall/getAirPollution";
import SearchAppBar from "../AppBar/SearchAppBar";
import WeatherWidget from "../AppBar/LocationInfo";
import getReverseGeocoding from "../../ApiCall/getReverseGeocoding";

function App() {
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0,
    location_name: "",
    state: "",
    country: "",
  });
  const [searchLocation, setSearchLocation] = useState(location);

  useEffect(() => {
    geolocate();
    setSearchLocation(location);
  }, []);

  async function geolocate() {
    //when a web page tries to access location information, the user is notified and asked to grant permission.
    //The Navigator.geolocation read-only property returns a Geolocation object that gives access to the location of the device.
    if (navigator.geolocation) {
      //checks if geolocation is supported on the user device
      navigator.geolocation.getCurrentPosition(success, error); //Returns position object and calls "succes" function with position as parameter.
    } else {
      console.error("Geolocation not supported");
    }
  }

  async function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    //console.log(`Latitude: ${lat}, Longitude: ${lon}`);
    const result = await getReverseGeocoding(lat, lon, apiKey);

    const { country, local_names, state } = result[0];

    setLocation({
      country: country,
      name: local_names.pl,
      state: state,
      lat: lat,
      lon: lon,
    });

    console.log("current location:", location);
  }

  function error() {
    console.error("Unable to retrieve your location");
  }

  return (
    <ThemeProvider theme={theme}>
      <SearchAppBar searchLocation_name={searchLocation.name}>
        <WeatherWidget location={location} />
      </SearchAppBar>
      <header className="App-header">
        <Button
          onClick={() => getCurrentWeather(location.lat, location.lon, apiKey)}
        >
          getCurrentWeather
        </Button>
        <Button
          onClick={() => {
            geolocate();
          }}
        >
          loc
        </Button>
        <Button
          onClick={() =>
            getCurrentAirPollution(location.lat, location.lon, apiKey)
          }
        >
          curAir
        </Button>
        <Button
          onClick={() =>
            getForecastAirPollution(location.lat, location.lon, apiKey)
          }
        >
          foreAir
        </Button>
        <Button
          onClick={() =>
            getHistoryAirPollution(
              location.lat,
              location.lon,
              1606223802,
              1606482999,
              apiKey
            )
          }
        >
          hisAir
        </Button>
      </header>
    </ThemeProvider>
  );
}

export default App;
