import { addParIfE } from "../Helpers/helpers";

export default async function getCurrentWeather(lat, lon, appid, mode, units = 'metric', lang = 'en') {
    /*
    lat	required - Latitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API
    lon	required - Longitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API
    appid required - Your unique API key (you can always find it on your account page under the "API key" tab)
    mode optional - Response format. Possible values are xml and html. If you don't use the mode parameter format is JSON by default.
    units optional - Units of measurement. Celsius use units=metric and Fahrenheit use units=imperial are available. If you do not use the units parameter, Kelvin is used by default .
    lang optional - You can use this parameter to get the output in your language.
    */
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}${addParIfE(mode, 'mode')}${addParIfE(units, 'units')}${addParIfE(lang, 'lang')}`;
    try {
        const response = await fetch(url);
        const result = await response.json();
        //console.log(result);

        return result;
    } catch (e) {
        console.error("getCurrentWeather() error:", e)
    }
}

/*
API response fields

cord
coord.lon Longitude of the location
coord.lat Latitude of the location

weather (https://openweathermap.org/weather-conditions)
weather.id Weather condition id
weather.main Group of weather parameters (Rain, Snow, Clouds etc.)
weather.description Weather condition within the group. You can get the output in your language. (https://openweathermap.org/current#list)
weather.icon Weather icon id

base Internal parameter
main
main.temp Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
main.feels_like Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
main.pressure Atmospheric pressure on the sea level, hPa
main.humidity Humidity, %
main.temp_min Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Please find more info (https://openweathermap.org/current#min). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
main.temp_max Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Please find more info (https://openweathermap.org/current#min). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
main.sea_level Atmospheric pressure on the sea level, hPa
main.grnd_level Atmospheric pressure on the ground level, hPa

visibility Visibility, meter. The maximum value of the visibility is 10 km

wind
wind.speed Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
wind.deg Wind direction, degrees (meteorological)
wind.gust Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour

clouds
clouds.all Cloudiness, %

rain
rain.1h (where available) Rain volume for the last 1 hour, mm. Please note that only mm as units of measurement are available for this parameter
rain.3h (where available) Rain volume for the last 3 hours, mm. Please note that only mm as units of measurement are available for this parameter

snow
snow.1h(where available) Snow volume for the last 1 hour, mm. Please note that only mm as units of measurement are available for this parameter
snow.3h (where available)Snow volume for the last 3 hours, mm. Please note that only mm as units of measurement are available for this parameter
dt Time of data calculation, unix, UTC

sys
sys.type Internal parameter
sys.id Internal parameter
sys.message Internal parameter
sys.country Country code (GB, JP etc.)
sys.sunrise Sunrise time, unix, UTC
sys.sunset Sunset time, unix, UTC

timezone Shift in seconds from UTC

id City ID. Please note that built-in geocoder functionality has been deprecated. (https://openweathermap.org/current#builtin).

name City name. Please note that built-in geocoder functionality has been deprecated. https://openweathermap.org/current#builtin

cod Internal parameter
*/
