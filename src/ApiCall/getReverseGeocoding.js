import { addParIfE } from '../Helpers/helpers';

export default async function getReverseGeocoding(lat, lon, appid, limit) {
  /*
    lat, lon - required - Geographical coordinates (latitude, longitude)
    appid - required - Your unique API key (you can always find it on your account page under the "API key" tab)
    limit optional - Number of the location names in the API response (several results can be returned in the API response)
    */
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}${addParIfE(limit, 'limit')}&appid=${appid}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    // console.log(result);
    /* 
            name Name of the found location
            local_names
            local_names.[language code] Name of the found location in different languages. The list of names can be different for different locations.
            local_names.ascii Internal field
            local_names.feature_name Internal field
            lat Geographical coordinates of the found location (latitude)
            lon Geographical coordinates of the found location (longitude)
            country Country of the found location
            state (where available) State of the found location
        */

    return result;
  } catch (e) {
    console.error('getReverseGeocoding() error:', e);
    return [];
  }
}
