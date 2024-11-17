import { useState, useEffect } from 'react'

import weatherService from '../services/weathers'

const Countries = ({ list }) => {
  const [refinedCountryList, setRefinedCountryList] = useState([])
  const [countryWeather, setCountryWeather] = useState(null)

  useEffect(() => {
    setRefinedCountryList(
      list.map(country => {
        const countryData = {
          commonName: country.name.common,
          capital: country.capital,
          area: country.area,
          languages: country.languages,
          flagImage: country.flags.png,
          latlng: country.capitalInfo.latlng,
          isShowed: false
        }
        return countryData
      })
    )

    if (list.length === 1) {
      weatherService.getCountryWeather(list[0].capitalInfo.latlng[0], list[0].capitalInfo.latlng[1])
        .then((weatherData) => {
          setCountryWeather({
            temp: weatherData.main.temp,
            wind: weatherData.wind.speed,
            icon: weatherData.weather[0].icon
          })
        })
    }
  }, [list])
  
  const handleShowDetail = (country) => {
    const checkList = [...refinedCountryList]

    for (const c in checkList) {
      if (checkList[c] === country) {
        const newCountry = {
          ...country,
          isShowed: !country.isShowed
        }
        checkList[c] = newCountry
        break
      }
    }
    setRefinedCountryList(checkList)
  }

  if (refinedCountryList.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  return refinedCountryList.map((c) => {
    const countryLangs = []
    for (const k in c.languages) {
      countryLangs.push(c.languages[k])
    }
    return (
      <div key={c.commonName}>
        {refinedCountryList.length !== 1 && 
          <div>
            {c.commonName} <button onClick={() => handleShowDetail(c)}>{c.isShowed ? 'unshow' : 'show'}</button>
          </div>
        }
        {(c.isShowed || refinedCountryList.length === 1) && 
          <div>
            <h2>{c.commonName}</h2>
            <p>capital {c.capital}</p>
            <p>area {c.area}</p>
            <h4>languages:</h4>             
            <ul>
              {countryLangs.map((lang) => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={c.flagImage} width={150}/>        
          </div> 
        }
        {refinedCountryList.length === 1 && countryWeather &&
          <div>
            <h3>Weather in {c.capital}</h3>
            <p>temperature {countryWeather.temp} celcius</p>           
            <img src={`https://openweathermap.org/img/wn/${countryWeather.icon}@2x.png`} />
            <p>wind {countryWeather.wind} m/s</p>        
          </div> 
        }

      </div>
    )
  })
  
}

export default Countries