import { useState } from 'react'

const Title = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Feedback = (props) => {
  return (
    <p>{props.type} {props.count}</p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
  }

  const incrementNeutral = () => {
    setNeutral(neutral + 1)
  }

  const incrementBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Title text='give feedback'/>
      <Button text='good' handleClick={incrementGood}/>
      <Button text='neutral' handleClick={incrementNeutral}/>
      <Button text='bad' handleClick={incrementBad}/>

      <Title text='statistics'/>
      <Feedback type='good' count={good} />
      <Feedback type='neutral' count={neutral} />
      <Feedback type='bad' count={bad} />
    </div>
  )
}

export default App
