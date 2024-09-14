const Persons = ({ personList, personDelete }) => {
  return (
    <ul>
      {personList.map(person => 
        <li key={person.id}>{person.name} {person.number} <button onClick={() => personDelete(person.id)}>delete</button>  
        </li>
      )}
    </ul>
  )
}

export default Persons