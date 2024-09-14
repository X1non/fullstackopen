const Note = ({ note, toogleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'


  return (
    <li>
      {note.content}
      <button onClick={toogleImportance}>{label}</button>
    </li> 
  )
}

export default Note