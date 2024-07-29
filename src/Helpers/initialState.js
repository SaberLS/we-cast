export const initLocation = {
  name: '',
  country: '',
  admin: '',
  lat: 0,
  lon: 0,
};

export const initSearchLocation = {
  name: 'Llanfairpwllgwyngyll',
  country: 'GB',
  admin: 'Wales',
  lat: 52.22977,
  lon: -4.20329,
};

export const initForecast = {
  city: {
    coord: { lat: 0, lon: 0 },
    country: '',
    id: 0,
    name: '',
    population: 0,
    sunrise: 0,
    sunset: 0,
    timezone: 0,
  },
  list: [
    {
      clouds: { all: 0 },
      all: 0,
      dt: 0,
      dt_txt: 'YYYY-MM-DD HH:MM:SS',
      main: {
        feels_like: 0,
        grnd_level: 0,
        humidity: 0,
        pressure: 0,
        sea_level: 0,
        temp: 0,
        temp_kf: 0,
        temp_max: 0,
        temp_min: 0,
      },
      pop: 0,
      sys: { pod: '' },
      visibility: 0,
      weather: [{ id: 0, main: '', description: '', icon: '' }],
      wind: { speed: 0, deg: 0, gust: 0 },
    },
  ],
};

export const initCurrentWeather = {
  base: '',
  clouds: { all: 0 },
  cod: 0,
  coord: { lat: 0, lon: 0 },
  dt: 0,
  id: 0,
  main: {
    feels_like: 0,
    grnd_level: 0,
    humidity: 0,
    pressure: 0,
    sea_level: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    name: '',
  },
  sys: {
    country: '',
    id: 0,
    sunrise: 0,
    sunset: 0,
    type: 0,
  },
  timezone: 0,
  visibility: 0,
  weather: { id: 0, main: '', description: '', icon: '' },
  length: 0,
  wind: { deg: 0, speed: 0 },
};
