import { useState, useEffect } from 'react'

const Countries = ({ list }) => {
  const [refinedCountryList, setRefinedCountryList] = useState([])

  useEffect(() => {
    setRefinedCountryList(
      list.map(country => {
        const countryData = {
          commonName: country.name.common,
          capital: country.capital,
          area: country.area,
          languages: country.languages,
          flagImage: country.flags.png,
          isShowed: false
        }
        return countryData
      })
    )
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
      </div>
    )
  })
  
}

export default Countries