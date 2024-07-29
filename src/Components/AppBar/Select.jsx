import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ThemeProvider, Typography, createTheme } from '@mui/material';
import openMeteoGeocode from '../../ApiCall/openMeteoGeocode';

export default function Select({ setSearchLocation }) {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    (async () => {
      const response = await openMeteoGeocode(inputValue);
      response.results && setOptions(response.results);
    })();
  }, [value, inputValue]);

  const theme = createTheme({
    palette: {
      text: {
        primary: '#000',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        id="autocomplete"
        sx={{ width: { md: 300, xs: '95vw' } }}
        getOptionLabel={(option) => (option ? `${option.name}` : '')}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        // eslint-disable-next-line no-shadow
        isOptionEqualToValue={(option, value) => option.name === value.name}
        value={value}
        noOptionsText="No locations"
        onChange={(event, newValue) => {
          if (newValue) {
            setSearchLocation({
              country: newValue.country_code,
              name: newValue.name,
              admin: newValue.admin1,
              lon: newValue.longitude,
              lat: newValue.latitude,
            });
          }
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="location" fullWidth />
        )}
        renderOption={(props, option) => {
          const { ...optionProps } = props;

          return (
            <li key={option.id} {...optionProps}>
              <Typography component="span">
                {option.name}\{option.country_code}\{option.admin1}
              </Typography>
            </li>
          );
        }}
      />
    </ThemeProvider>
  );
}
