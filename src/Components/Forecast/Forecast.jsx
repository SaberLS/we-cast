import React, { useEffect, useState } from "react";
import getForecast from "../../ApiCall/getForecast";
import { apiKey } from "../../apiKey";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import {
  cnvtUni,
  cnvtShiftUTC,
  capitalFirstL,
  cnvtMtoKM,
} from "../../Helpers/helpers";
import Box from "@mui/material/Box";
import { theme } from "../../Themes/theme";

export default function Forecast({ searchLocation }) {
  const [forecast, setForecast] = useState({
    city: {
      name: "",
    },
    list: [],
  });

  useEffect(() => {
    callForecast();
  }, [searchLocation]);

  async function callForecast() {
    if (searchLocation.lat) {
      const response = await getForecast(
        searchLocation.lat,
        searchLocation.lon,
        apiKey
      );

      setForecast({
        city: response.city,
        list: response.list,
      });

      console.log(forecast);
    }
  }

  return (
    <Box>
      {forecast.list[0] ? (
        <Box>
          <Box sx={{ display: "inline-flex" }}>
            <Typography fontSize={"15px"}>
              {forecast.list[0] ? forecast.list[0].dt_txt : null}
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ marginX: "5px" }} />
            <Typography fontSize={"15px"}>
              {cnvtShiftUTC(forecast.city.timezone)}
            </Typography>
          </Box>
          <Typography variant="h3">{forecast.city.name}</Typography>

          <Box sx={{ display: "inline-flex" }}>
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {Math.round(forecast.list[0].main.temp)}°C
            </Typography>
            <img
              src={`https://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@2x.png`}
              alt="weather icon"
            />
          </Box>
          <Box>
            <Typography variant="h5">
              {`Temperatura odczuwalna ${Math.round(
                forecast.list[0].main.feels_like
              )}°C. ${capitalFirstL(forecast.list[0].weather[0].description)}.`}
            </Typography>
          </Box>
          <Grid
            container
            spacing={3}
            sx={{
              borderLeft: `2px solid ${theme.palette.primary.light}`,
            }}
          >
            <Grid item xs="6">
              <Typography variant="h6">{`zachmurzenie ${forecast.list[0].clouds.all}%`}</Typography>
              <Typography variant="h6">{`ciśnienie ${forecast.list[0].main.pressure}hPa`}</Typography>
              <Typography variant="h6">{`wilgotność ${forecast.list[0].main.humidity}%`}</Typography>
            </Grid>
            <Grid item xs="6">
              <Typography variant="h6">{`widoczność ${cnvtMtoKM(
                forecast.list[0].visibility
              )}km`}</Typography>
              <Typography variant="h6">{`wschód ${cnvtUni(
                forecast.city.sunrise
              )}`}</Typography>
              <Typography variant="h6">{`zachód ${cnvtUni(
                forecast.city.sunset
              )}`}</Typography>
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </Box>
  );
}
