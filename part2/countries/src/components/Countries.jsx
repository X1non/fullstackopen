import { useState } from 'react'

// TODO: Exercise 2.19
const Countries = ({ list }) => {

  // Old Approach
  // const [listCountry, setListCountry] = useState(
  //   list.map(country => {
  //     const cData = {
  //       commonName: country.name.common,
  //       capital: country.capital,
  //       area: country.area,
  //       languages: country.languages,
  //       flagImage: country.flags.png,
  //       isShowed: false
  //     }
  //     console.log(cData)
  //     return cData
  //   })
  // )

  const filteredCountry = list.map(country => {
    const cData = {
      commonName: country.name.common,
      capital: country.capital,
      area: country.area,
      languages: country.languages,
      flagImage: country.flags.png,
      isShowed: false
    }
    console.log(cData)
    return cData
  })

  const [listCountry, setListCountry] = useState(filteredCountry)
  
  const handleShowDetail = (countryName) => {
    console.log(list)
    console.log(countryName)
    console.log(listCountry)
  }

  if (list.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (list.length > 1) {
    return ( 
      list.map((c) => {
        return (
          <div key={c.name.common}>
            {c.name.common} <button onClick={() => handleShowDetail(c.name.common)}>show</button>
          </div>     
        )
      })
    )
  } else if (list.length === 1) {
    const countryData = list[0]
    const countryLanguages = []
    
    for (const lang in countryData.languages) {
      countryLanguages.push(countryData.languages[lang])
    }

    return (
      <div>
        <h2>{countryData.name.common}</h2>

        <p>capital {countryData.capital}</p>
        <p>area {countryData.area}</p>

        <h4>languages:</h4>

        <ul>
          {countryLanguages.map((lang) => <li key={lang}>{lang}</li>)}
        </ul>
        
        <img src={countryData.flags.png} width={150}/>
      </div>
    )
  }
}


export default Countries