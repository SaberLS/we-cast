import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ThemeProvider, Typography, createTheme } from '@mui/material';
import getGeocoding from '../../ApiCall/getGeocoding';
import { apiKey } from '../../apiKey';

export default function Select({ setSearchLocation }) {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Fetch autocomplete options as the user types in the input field

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    (async () => {
      const response = await getGeocoding(apiKey, inputValue);

      response && setOptions(response);
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
        getOptionLabel={(option) =>
          option
            ? `${option.name}${option.country ? `/${option.country}` : ''}${option.state ? `/${option.state}` : ''}`
            : ''
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        // eslint-disable-next-line no-shadow
        isOptionEqualToValue={(option, value) => option === value} // true to filter options based on input value
        value={value}
        noOptionsText="No locations"
        onChange={(event, newValue) => {
          // update searchLocation and options
          if (newValue) {
            setSearchLocation({
              country: newValue.country,
              name: newValue.name,
              admin: newValue.state,
              lon: newValue.lon,
              lat: newValue.lat,
            });
          }
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          // update inputValue and options
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          // render the input field
          <TextField {...params} label="location" fullWidth />
        )}
        renderOption={(props, option) => {
          // display options in the dropdown menu
          // render the autocomplete options with country, state and name
          const { ...optionProps } = props;

          return (
            <li {...optionProps} key={`${option.lon},${option.len}`}>
              <Typography component="span">
                {option.name}/{option.country}/{option.state}
              </Typography>
            </li>
          );
        }}
      />
    </ThemeProvider>
  );
}
