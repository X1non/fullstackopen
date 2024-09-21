import { useEffect, useState } from 'react'

import Countries from './components/Countries'
import countryService from './services/countries'

const App = () => {
  const [searchCountry, setSearchCountry] = useState('')
  const [listCountry, setListCountry] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then((countriesData) => {
        setListCountry(countriesData)
      })
  }, [])
  
  const handleCountryChange = (event) => {
    setSearchCountry(event.target.value)
  }

  const displayedCountries = searchCountry 
    ? listCountry.filter(c => c.name.common.toLowerCase().includes(searchCountry.toLowerCase()))
    : []

  return (
    <div>
      <div>
        find countries <input value={searchCountry} onChange={handleCountryChange}/>
      </div>
      <div>
        <Countries list={displayedCountries} />
      </div>
    </div>
  )
}

export default App
