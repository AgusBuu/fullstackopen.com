//el header es el encargado de imprimir el título del curso
const Header= (props) =>{
  return(
    <>
    <h1>{props.name}</h1>
    </>
  )
}
//Part renderizará el nombre de la parte y la cantidad de ejercicios a partit del dato recibido por el props ingresado en content
const Part = (props) =>{
  return(
    <>
    <p>
        {props.p} {props.e}
      </p>     

    </>
  )
}
//content recibe los datos de los nombres de las partes y su respectiva cantidad de ejercicios y los pasa a cada parte. 
const Content = (props) =>{
  return(
    <>
    <Part p={props.p1} e={props.e1}/>
    <Part p={props.p2} e={props.e2}/>
    <Part p={props.p3} e={props.e3}/>
     
    </>
  )
}
//total toma los números de ejercicios y los suma para mostrar el total
const Total = (props) =>{
  return(
    <>
    <p>Number of exercises {props.e1 + props.e2 + props.e3}</p>
    </>

  )
}

//app es el componente raiz donde se llama al resto de los componentes. 
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content p1={part1} p2={part2} p3={part3} e1={exercises1} e2={exercises2} e3={exercises3} />
      <Total e1={exercises1} e2={exercises2} e3={exercises3} />
      
    </div>
  )

  
}
//exportar app es muy importante para el funcionamiento de la aplicación
export default App

//prometo solemnemente utilizar la consola del navegador durante todo el desarrollo de este curso ;)


