import { addParIfE } from '../Helpers/helpers';

export default async function getGeocoding(
  appid,
  cityName,
  stateCode,
  countryCode,
  limit = 5,
) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}${stateCode ? `,${stateCode}` : ''}${countryCode ? `,${countryCode}` : ''}${addParIfE(limit, 'limit')}&appid=${appid}`;

  // q required	City name, state code (only for the US) and country code divided by comma. Please use ISO 3166 country codes.
  // appid required	Your unique API key (you can always find it on your account page under the "API key" tab)
  // limit optional Number of the locations in the API response (up to 5 results can be returned in the API response)

  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error('getGeocoding() error:', e);
  }
}

// name Name of the found location
// local_names
// local_names.[language code] Name of the found location in different languages. The list of names can be different for different locations
// local_names.ascii Internal field
// local_names.feature_name Internal field
// lat Geographical coordinates of the found location (latitude)
// lon Geographical coordinates of the found location (longitude)
// country Country of the found location
// state (where available) State of the found location
