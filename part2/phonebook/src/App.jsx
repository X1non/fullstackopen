import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567',
      id: 1
     }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} required={true}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} required={true}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <li key={person.id}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App
