const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <div>
      <Part
        part={parts[0]} 
      />
      <Part
        part={parts[1]} 
      />
      <Part
        part={parts[2]} 
      />     
    </div>
  )
}

const Course = ({ course }) => {

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
    </div>
  )

}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
    ]
  }

  return <Course course={course} />
}

export default App