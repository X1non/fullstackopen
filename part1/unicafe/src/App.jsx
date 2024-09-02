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

const Statistics = (props) => {
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

  const averageFeedback = () => {
    const score = ((good * 1) + (bad * -1)) / (good + neutral + bad)
    if (isNaN(score)) {
      return 0
    }
    return score 
  }

  const positiveFeedback = () => {
    const percentage = (good / (good + neutral + bad)) * 100
    if (isNaN(percentage)) {
      return 0 + ' %' 
    }
    return percentage + ' %'
  }

  return (
    <div>
      <Title text='give feedback'/>
      <Button text='good' handleClick={incrementGood}/>
      <Button text='neutral' handleClick={incrementNeutral}/>
      <Button text='bad' handleClick={incrementBad}/>

      <Title text='statistics'/>
      <Statistics type='good' count={good} />
      <Statistics type='neutral' count={neutral} />
      <Statistics type='bad' count={bad} />
      <Statistics type='all' count={good + neutral + bad} />
      <Statistics type='average' count={averageFeedback()} />
      <Statistics type='positive' count={positiveFeedback()} />
    </div>
  )
}

export default App
