import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    // Assuming one name/person can have multiple numbers
    const arrNumbers = persons.map((person) => person.number)
    if (arrNumbers.includes(newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }))
    }
    
    setNewName('')
    setNewNumber('')
  }
  
  const handleNewName = (event) => {
    // console.log(event.target)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    // console.log(event.target)
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  const personShowed = nameFilter 
  ? persons.filter((person) => 
    person.name.toLowerCase().includes(nameFilter.toLowerCase()))
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterString={nameFilter} handleFilter={handleNameFilter} />
      
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} personName={newName} handlePersonName={handleNewName} 
        personNumber={newNumber} handlePersonNumber={handleNewNumber} />
      
      <h3>Numbers</h3>
      <Persons personList={personShowed} />
    </div>
  )
}

export default App
