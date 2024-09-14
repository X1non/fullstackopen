import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  
  useEffect(() => {
    phonebookService
      .getPersons()
      .then(initPersons => {
        // console.log(initPersons)
        setPersons(initPersons)
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
      const newPerson = {
        name: newName,
        number: newNumber
      }
      phonebookService
        .addPerson(newPerson)
        .then(addedPerson => {
          // console.log(addedPerson)
          setPersons(persons.concat(addedPerson))          
        })
    }
    
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (confirm(`Delete ${person.name} with phone number: "${person.number}" ?`)) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => {
            if (p.id !== id) return p
          }))
        })
        .catch((error) => {
          alert(`${person.name} was already deleted from the server`)
          // same, but less syntax needed
          setPersons(persons.filter(p => p.id !== id))
        })

    }
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
      <Persons personList={personShowed} personDelete={deletePerson} />
    </div>
  )
}

export default App
