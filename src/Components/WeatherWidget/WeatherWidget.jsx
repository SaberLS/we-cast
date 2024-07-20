import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import {
  cnvtUni,
  cnvtUniDate,
  capitalFirstL,
  cnvtMtoKM,
} from "../../Helpers/helpers";
import Box from "@mui/material/Box";
import { theme } from "../../Themes/theme";
import getCurrentWeather from "../../ApiCall/getCurrentWeather";
import { apiKey } from "../../apiKey";

export default function WeatherWidget({ weather, setWeather, location }) {
  useEffect(() => {
    (async () => {
      console.log("location:", location);
      const result = await getCurrentWeather(
        location.lat,
        location.lon,
        apiKey
      );
      setWeather(result);
      console.log(weather);
    })();
  }, [location]);

  return (
    <Box>
      {weather.dt ? (
        <Box>
          <Typography fontSize={"15px"}>{cnvtUniDate(weather.dt)}</Typography>
          <Typography variant="h3">{weather.name}</Typography>

          <Box sx={{ display: "inline-flex" }}>
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {`${Math.round(weather.main.temp)}°C`}
            </Typography>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
          </Box>
          <Box>
            <Typography variant="h5">
              {`Temperatura odczuwalna ${Math.round(
                weather.main.feels_like
              )}°C. ${capitalFirstL(weather.weather[0].description)}.`}
            </Typography>
          </Box>
          <Grid
            container
            spacing={3}
            sx={{
              borderLeft: `2px solid ${theme.palette.primary.light}`,
            }}
          >
            <Grid item xs={6}>
              <Typography variant="h6">{`zachmurzenie ${weather.clouds.all}%`}</Typography>
              <Typography variant="h6">{`ciśnienie ${weather.main.pressure}hPa`}</Typography>
              <Typography variant="h6">{`wilgotność ${weather.main.humidity}%`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">{`widoczność ${cnvtMtoKM(
                weather.visibility
              )}km`}</Typography>
              <Typography variant="h6">{`wschód ${cnvtUni(
                weather.sys.sunrise
              )}`}</Typography>
              <Typography variant="h6">{`zachód ${cnvtUni(
                weather.sys.sunset
              )}`}</Typography>
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </Box>
  );
}
