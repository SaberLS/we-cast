import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import {
  cnvtUni,
  cnvtUniDate,
  capitalFirstL,
  cnvtMtoKM,
} from '../../Helpers/helpers';
import { theme } from '../../Themes/theme';

export default function WeatherWidget({ weather, location }) {
  return (
    <Box
      sx={{
        position: 'center',
        width: {
          xs: '95vw',
          sm: '510px',
        },
      }}
    >
      {weather.dt ? (
        <Box>
          <Box sx={{ marginLeft: '3px' }}>
            <Typography /* Date */ fontSize="15px">
              {cnvtUniDate(weather.dt)}
            </Typography>
            <Typography /* Location */
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              variant="h3"
            >
              {location.name}
            </Typography>
            <Box /* Temperature */ sx={{ display: 'inline-flex' }}>
              <Typography
                variant="h4"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
            <Typography /* Weather Description */ variant="h5">
              {`Feels Like ${Math.round(
                weather.main.feels_like,
              )}°C. ${capitalFirstL(weather.weather[0].description)}.`}
            </Typography>
            <Typography /* Precipitation */ variant="h5">
              {weather.rain
                ? Object.keys(weather.rain).map(
                    (time) => `Rain in ${time} ${weather.rain[time]}mm.`,
                  )
                : null}
              {weather.snow
                ? Object.keys(weather.snow).map(
                    (time) => `Snow in ${time} ${weather.snow[time]}mm.`,
                  )
                : null}
            </Typography>
          </Box>

          <Grid /* detailed forecast */ container spacing={3}>
            <Grid item xs={6}>
              <Box
                sx={{
                  borderLeft: `2px solid ${theme.palette.primary.light}`,
                  paddingLeft: '5px',
                }}
              >
                <Typography variant="h6">{`overcast ${weather.clouds.all}%`}</Typography>
                <Typography variant="h6">{`pressure ${weather.main.pressure}hPa`}</Typography>
                <Typography variant="h6">{`humidity ${weather.main.humidity}%`}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">{`visibility ${cnvtMtoKM(
                weather.visibility,
              )}km`}</Typography>
              <Typography variant="h6">{`sunrise ${cnvtUni(
                weather.sys.sunrise,
              )}`}</Typography>
              <Typography variant="h6">{`sunset ${cnvtUni(
                weather.sys.sunset,
              )}`}</Typography>
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </Box>
  );
}
