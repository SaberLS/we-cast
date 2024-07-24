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
      //console.log("location:", location);
      const result = await getCurrentWeather(
        location.lat,
        location.lon,
        apiKey
      );
      setWeather(result);
      //console.log(weather);
    })();
  }, [location]);

  return (
    <Box>
      {weather.dt ? (
        <Box>
          <Box sx={{ marginLeft: "3px" }}>
            <Typography fontSize={"15px"}>{cnvtUniDate(weather.dt)}</Typography>
            <Typography variant="h3">{location.name}</Typography>

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
              <Box>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              </Box>
            </Box>
            <Typography variant="h5">
              {`Feels Like ${Math.round(
                weather.main.feels_like
              )}°C. ${capitalFirstL(weather.weather[0].description)}.`}
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box
                sx={{
                  borderLeft: `2px solid ${theme.palette.primary.light}`,
                  paddingLeft: "5px",
                }}
              >
                <Typography variant="h6">{`overcast ${weather.clouds.all}%`}</Typography>
                <Typography variant="h6">{`pressure ${weather.main.pressure}hPa`}</Typography>
                <Typography variant="h6">{`humidity ${weather.main.humidity}%`}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">{`visibility ${cnvtMtoKM(
                weather.visibility
              )}km`}</Typography>
              <Typography variant="h6">{`sunrise ${cnvtUni(
                weather.sys.sunrise
              )}`}</Typography>
              <Typography variant="h6">{`sunset ${cnvtUni(
                weather.sys.sunset
              )}`}</Typography>
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </Box>
  );
}
