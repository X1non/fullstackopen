import { useState } from 'react'

// part 1d: A more complex state, debugging React apps
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ onClick, text }) => 
  <button onClick={onClick}>
    {text}
  </button>

const App2 = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    // console.log('left before', left)
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    // console.log('left after', updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }

  // return (
  //   <div>
  //     {left}
  //     <Button onClick={handleLeftClick} text={'left'} />
  //     <Button onClick={handleRightClick} text={'right'} />
  //     {right}
  //     <History allClicks={allClicks}/>
  //     <p>total {total}</p>
  //   </div>
  // )

  const [value, setValue] = useState(10)
  
  // the function that returns function
  const setToValue = (newValue) => () => { // adds another arrow function layer
    console.log('value now', newValue)
    setValue(newValue)
  }

  // the normal approach
  const setToValue2 = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }
  
  return (
    <div>
      {value}
      <Button onClick={setToValue(1000)} text='thousand' />
      <Button onClick={setToValue(0)} text='reset' />
      <Button onClick={() => setToValue2(value + 1)} text='increment' />
    </div>
  )
}

export default App2