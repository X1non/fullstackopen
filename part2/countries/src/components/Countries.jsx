const Countries = ({ list }) => {
  // console.log(list)
  if (list.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (list.length > 1) {
    return ( 
      list.map((c) => {
        return (
          <p key={c.name.common}>
            {c.name.common}
          </p>
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