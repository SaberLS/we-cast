import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { Link } from '@mui/material';
import { Search } from './Search';
import Select from './Select.jsx';
import LocationInfo from './LocationInfo.jsx';

export default function SearchAppBar({ setSearchLocation, location }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            flexDirection: { md: 'row', xs: 'column' },
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: { md: 'flex-start', xs: 'space-around' },
            }}
          >
            <Link href="https://openweathermap.org" target="_blank">
              <img
                src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png"
                height="40px"
                alt="logo of OpenWeather"
              />
            </Link>
          </Box>

          <Box
            sx={{
              width: '100%',
            }}
          >
            <Search>
              <Select setSearchLocation={setSearchLocation} />
            </Search>
          </Box>

          <Box
            sx={{
              width: '100%',
            }}
          >
            <LocationInfo
              name={location.name}
              country={location.country}
              admin={location.admin}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
