import './App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './Themes/theme';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import getCurrentWeather from './ApiCall/getCurrentWeather';
import { apiKey } from './apiKey';



function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    locate();
  }, [])

  function locate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    console.log(position.coords);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setLocation({ lat, lon });
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <ThemeProvider theme={theme}>
      <header className="App-header">
        <Button onClick={() => getCurrentWeather(location.lat, location.lon, apiKey)}>getCurrentWeather</Button>
        <Button onClick={() => locate()}>loc</Button>
      </header>
    </ThemeProvider>
  );
}

export default App;
