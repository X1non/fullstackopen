import axios from 'axios'

const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  const req = axios.get(`${countriesUrl}/all`)
  return req.then((response) => response.data)
}

const getCountry = (name) => {
  const req = axios.get(`${countriesUrl}/name/${name}`)
  return req.then((response) => response.data)
}

export default { getAll, getCountry }