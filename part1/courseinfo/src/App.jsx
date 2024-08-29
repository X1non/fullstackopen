const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.numberOfExercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0]} numberOfExercises={props.exercises[0]}/>
      <Part name={props.parts[1]} numberOfExercises={props.exercises[1]}/>
      <Part name={props.parts[2]} numberOfExercises={props.exercises[2]}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }

  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course} />
      <Content parts={[part1.name, part2.name, part3.name]} 
        exercises={[part1.exercises, part2.exercises, part3.exercises]} 
      />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App