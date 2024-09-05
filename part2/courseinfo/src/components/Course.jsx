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

export default Course