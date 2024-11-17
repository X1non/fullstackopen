import axios from 'axios'

const getCountryWeather = (lat, lon) => {
  const appid = import.meta.env.VITE_WEATHER_API_KEY
  const req = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`)

  return req.then((response) => response.data)
}

export default { getCountryWeather }