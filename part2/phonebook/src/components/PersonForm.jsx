const PersonForm = (
  { 
    addPerson, 
    personName, 
    personNumber, 
    handlePersonName, 
    handlePersonNumber 
  }) => {
    return (
      <form onSubmit={addPerson}>
        <div>
          name: <input value={personName} onChange={handlePersonName} required={true}/>
        </div>
        <div>
          number: <input value={personNumber} onChange={handlePersonNumber} required={true}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>  
    )
}

export default PersonForm