import { useState } from 'react'

const Anecdote = (props) => {
  return (
    <p>{props.text}</p>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const nextRandomAnecdote = (min, max) => {
    const num = Math.floor(Math.random() * ((max - min) + 1)) + min
    // console.log(num)
    setSelected(num)
  }
  const incrementVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    // console.log(selected)
    // console.log('After increment', newVotes, mostVoted)
    // console.log('Before set -> most voted: anecdote num-%s with %s votes', mostVoted, newVotes[mostVoted])
    if (newVotes[selected] > newVotes[mostVoted]) {
      setMostVoted(selected)
    }
    // console.log('current: anecdote num-%s with %s votes', selected, newVotes[selected])
    // console.log('After set -> most voted: anecdote num-%s with %s votes', mostVoted, newVotes[mostVoted])
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} />
      <p>has {votes[selected]} votes</p>
      <Button onClick={() => incrementVote()} text={'vote'} />
      <Button onClick={() => nextRandomAnecdote(0, anecdotes.length - 1)} text={'next anecdote'} />
    
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[mostVoted]} />
      <p>has {votes[mostVoted]} votes</p>
      </div>
  )
}

export default App