const Title = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => {
  return (
    <p><b>total of {sum} exercises</b></p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((pa) => {
        return (
          <Part 
            key={pa.id}
            part={pa}
          />
        )
      })}   
    </div>
  )
}

const Course = ({ curriculum, course }) => {
  const total = (parts) => {
    return (
      parts.reduce((sum, part) => {
        return sum + part.exercises
      }, 0)
    )
  }

  return (
    <div>
      <h1>{curriculum}</h1>
      {course.map((co) => {
        return (
          <div key={co.id}>
            <Title course={co.name} />
            <Content parts={co.parts} />
            <Total sum={total(co.parts)} />
          </div>
        )
      })}
    </div>
  )

}

const App = () => {
  const course = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    },
    {
      name: 'Test Course',
      id: 3,
      parts: [
        {
          name: 'Test Course Part 1',
          exercises: 10,
          id: 1
        }
      ]
    }
  ]

  return <Course curriculum='Web development curriculum' course={course} />
}

export default App