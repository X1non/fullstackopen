import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    // console.log(event.target)
    // console.log(newName)

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
