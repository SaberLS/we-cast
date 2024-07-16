//You can search weather forecast for 5 days with data every 3 hours by geographic coordinates.
//All weather data can be obtained in JSON and XML formats.

import { addParIfE } from "../Helpers/helpers";

export default async function getForecast(lat, lon, appid, cnt, mode, units = "metric", lang = 'PL') {
    /*
    lat	required - Latitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API
    lon	required - Longitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API
    appid required - Your unique API key (you can always find it on your account page under the "API key" tab)
    cnt	optional - A number of timestamps, which will be returned in the API response. Learn more (https://openweathermap.org/forecast5#limit)
    mode optional - Response format. Possible values are xml/json. If you don't use the mode parameter format is JSON by default.
    units optional - Units of measurement. Celsius use units=metric and Fahrenheit use units=imperial are available. If you do not use the units parameter, Kelvin is used by default .
    lang optional - You can use this parameter to get the output in your language.
    */
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}${addParIfE(cnt, 'cnt')}${addParIfE(mode, 'mode')}${addParIfE(units, 'units')}${addParIfE(lang, 'lang')}`;

    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);

        return result;
    } catch (e) {
        console.error("getForecast() error:", e);
    }
}

/*
API response fields

cod Internal parameter
message Internal parameter
cntA number of timestamps returned in the API response

list
list.dt Time of data forecasted, unix, UTC
list.main
list.main.temp Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
list.main.feels_like This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
list.main.temp_min Minimum temperature at the moment of calculation. This is minimal forecasted temperature (within large megalopolises and urban areas), use this parameter optionally. Please find more info (https://openweathermap.org/forecast5#min). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
list.main.temp_max Maximum temperature at the moment of calculation. This is maximal forecasted temperature (within large megalopolises and urban areas), use this parameter optionally. Please find more info (https://openweathermap.org/forecast5#max). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
list.main.pressure Atmospheric pressure on the sea level by default, hPa
list.main.sea_level Atmospheric pressure on the sea level, hPa
list.main.grnd_level Atmospheric pressure on the ground level, hPa
list.main.humidity Humidity, %
list.main.temp_kf Internal parameter

list.weather
list.weather.id Weather condition id
list.weather.main Group of weather parameters (Rain, Snow, Clouds etc.)
list.weather.description Weather condition within the group. Please find more (https://openweathermap.org/forecast5#list). You can get the output in your language (https://openweathermap.org/forecast5#multi)
list.weather.icon Weather icon id

list.clouds
list.clouds.all Cloudiness, %

list.wind
list.wind.speed Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
list.wind.deg Wind direction, degrees (meteorological)
list.wind.gust Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour

list.visibility Average visibility, metres. The maximum value of the visibility is 10km

list.pop Probability of precipitation. The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%

list.rain
list.rain.3h Rain volume for last 3 hours, mm. Please note that only mm as units of measurement are available for this parameter

list.snow
list.snow.3h Snow volume for last 3 hours. Please note that only mm as units of measurement are available for this parameter

list.sys
list.sys.pod Part of the day (n - night, d - day)

list.dt_txt Time of data forecasted, ISO, UTC

city
city.id City ID. Please note that built-in geocoder functionality has been deprecated. Learn more (https://openweathermap.org/forecast5#builtin)
city.name City name. Please note that built-in geocoder functionality has been deprecated. Learn more (https://openweathermap.org/forecast5#builtin)
city.coord
city.coord.lat Geo location, latitude
city.coord.lon Geo location, longitude
city.country Country code (GB, JP etc.). Please note that built-in geocoder functionality has been deprecated. Learn more (https://openweathermap.org/forecast5#builtin)
city.population City population
city.timezone Shift in seconds from UTC
city.sunrise Sunrise time, Unix, UTC
city.sunset Sunset time, Unix, UTC
XML
*/