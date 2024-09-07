import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    // console.log(event.target)
    // console.log(newName)
    const arrNames = persons.map((person) => person.name)
    if (arrNames.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({
        name: newName
      }))
    }
    
    setNewName('')
  }
  
  const handleNewName = (event) => {
    // console.log(event.target)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <li key={person.name}>{person.name}</li>
        )}
      </ul>
    </div>
  )
}

export default App
