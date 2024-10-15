import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notificationMsg, setNotificationMsg] = useState()
  const [notificationAction, setNotificationAction] = useState()
  
  useEffect(() => {
    phonebookService
      .getPersons()
      .then(initPersons => {
        setPersons(initPersons)
      })
  }, [])

  const updatePersonNumber = (person) => {
    const updatedPerson = { ...person, number: newNumber }
    phonebookService
      .updatePersonNumber(updatedPerson)
      .then((updatedResult) => { 
        setPersons(persons.map(p => p.id === updatedPerson.id ? updatedResult : p))
        setNotificationMsg(`Updated ${updatedPerson.name}`)
        setNotificationAction('success')
      })
      .catch((error) => {
        setNotificationMsg(`Error updating ${updatedPerson.name} data. 
          ${error.response.data.error}`)
        setNotificationAction('error')
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const arrNumbers = persons.map((person) => person.number)
    const existedPerson = persons.find(p => p.name === newName)
    
    if (arrNumbers.includes(newNumber)) {
      setNotificationMsg(`${newNumber} is already exists in phonebook`)
      setNotificationAction('error')
    } else if (existedPerson) {
      if (confirm(`${existedPerson.name} is already added to phonebook, replace the old number with a new one?`)) 
        updatePersonNumber(existedPerson)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      phonebookService
        .addPerson(newPerson)
        .then(savedPerson => { 
          setPersons(persons.concat(savedPerson))
          setNotificationMsg(`Added ${savedPerson.name}`)
          setNotificationAction('success')
        })
        .catch(error => {
          setNotificationMsg(`Error adding data. ${error.response.data.error}`)
          setNotificationAction('error')
        })
    }
    
    setTimeout(() => {
      setNotificationMsg(null)
      setNotificationAction(null)
    }, 5000)
    
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
          setNotificationMsg(`Deleted ${person.name}`)
          setNotificationAction('success')
        })
        .catch((error) => {
          setNotificationMsg(`${person.name} was already deleted from the server`)
          setNotificationAction('error')
          // same, but less syntax needed
          setPersons(persons.filter(p => p.id !== id))
        })
    }
    setTimeout(() => {
      setNotificationMsg(null)
      setNotificationAction(null)
    }, 5000)
  }
  
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
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
      <Notification message={notificationMsg} type={notificationAction} />
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
