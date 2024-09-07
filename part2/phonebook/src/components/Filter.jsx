const Filter = ({ filterString, handleFilter }) => {
  return (
    <div>
      filter shown with <input value={filterString} onChange={handleFilter}/>
    </div>
  ) 
}

export default Filter