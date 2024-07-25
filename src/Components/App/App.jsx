import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../Themes/theme";
import { useState, useEffect } from "react";
import { Container, createTheme } from "@mui/material";
import getCurrentWeather from "../../ApiCall/getCurrentWeather";
import { apiKey } from "../../apiKey";
import SearchAppBar from "../AppBar/SearchAppBar";
import LocationInfo from "../AppBar/LocationInfo";
import getReverseGeocoding from "../../ApiCall/getReverseGeocoding";
import ForecastTable from "../Forecast/ForecastTable";
import Box from "@mui/material/Box";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import getForecast from "../../ApiCall/getForecast";
import { LineChart } from "@mui/x-charts/LineChart";



function error() {
  console.error("Unable to retrieve your location");
}

function App() {
 
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0,
    location_name: "",
    state: "",
    country: "",
  });
  const [forecast, setForecast] = useState({
    city: {
      name: "",
    },
    list: [],
  });
  const [currentWeather, setCurrentWeather] = useState({});
  const [searchLocation, setSearchLocation] = useState(location);

  useEffect(() => {
    geolocate();
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
    const geoCoding = await getReverseGeocoding(lat, lon, apiKey);

    const weather = await getCurrentWeather(lat, lon, apiKey);
    setCurrentWeather(weather);

    const response = await getForecast(lat, lon, apiKey);

    setForecast({
      city: response.city,
      list: response.list,
    });

    const { country, local_names, state } = geoCoding[0];
    setLocation({
      country: country,
      name: local_names.en,
      state: state,
      lat: lat,
      lon: lon,
    });

    if (!searchLocation.name) {
      setSearchLocation({
        country: country,
        name: local_names.en,
        state: state,
        lat: lat,
        lon: lon,
      });
    }

    // console.log("current location:", location);
    // console.log("current weather:", currentWeather);
    // console.log("forecast:", forecast);
  }

  useEffect(() => {
    (async() => {
      const response = await getForecast(searchLocation.lat, searchLocation.lon, apiKey);
      setForecast({
        city: response.city,
        list: response.list,
      });
    })();
  }, [searchLocation])

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false} disableGutters>
        
        <SearchAppBar
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
        >
          <LocationInfo
            name={location.name}
            country={location.country}
            state={location.state}
          />
        </SearchAppBar>
        <Box className="App-header">
          <WeatherWidget
            weather={currentWeather}
            setWeather={setCurrentWeather}
            location={searchLocation}
          />
        </Box>
        
        <Box className="App-body">
          {forecast.list ? (
        <Box sx={{ height: {md:"50vh", xs: "70vh", sm: "65vh", lg: "50vh", xl: "50vh"}, width: {md:"80vw", xs: "100vw", sm: "100vw", lg: "80vw", xl: "80vw"}}}>
        <LineChart
        yAxis={[
          { id: 'temperature', scaleType: 'linear' },
        ]} 
        xAxis={[
          {
            data: forecast.list.map((el) => {
              return el.dt;
            }),
            valueFormatter: (el) => {
              const date = new Date(el * 1000)
              return `${date.getUTCHours()}:00 ${date.getUTCDate()}`}
            ,
            scaleType: "utc" ,
            min: forecast.list[0] ? forecast.list[0].dt : 0,
        }]}
        series={[
          {
            id: "temp",
            label: "temperature",
            data: forecast.list.map((el) => {
              return Math.round(el.main.temp);
            }),
            showMark: false,
          },
          {
            id: "feelsLike",
            label: "feels Like",
            data: forecast.list.map((el) => {
              return Math.round(el.main.feels_like);
            }),
            showMark: false,
          },
          
          
        ]}
        slotProps={{
          popper: {
            sx: {
              '& .MuiChartsTooltip-root': {
                '& .MuiTypography-root': {
                  color: 'black',
                },
              },
            },
          },
        }}
      />
      
      </Box>
      
          ) : null}
          <ForecastTable list={forecast.list} />
        </Box>
        
      </Container> 
      </ThemeProvider>
  );
}

export default App;
