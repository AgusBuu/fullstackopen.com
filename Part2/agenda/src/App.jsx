import { useState } from 'react'
const App = () => {
  
  const [entrada, setEntrada] = useState('') 
  const [contactos, setContactos] = useState([])
  console.log(entrada);
  let existe = false;
  const verificarExistentes = () =>{
    contactos.map (contacto => {
      existe= contacto.name == entrada ? true : existe          
  })}

  const addContacto = (event) => {
    event.preventDefault()
    verificarExistentes()
    console.log('existe?', existe);
    if (existe){
      alert ('el contacto '+entrada+' ya existe en la agenda')

    }else{
          const nuevoContacto = {
        name: entrada,
        id: contactos.length + 1,
      } 
      setContactos(contactos.concat(nuevoContacto))
      setEntrada('')   
    }
    }
    
  return (
    <div>
      <h1>Mi Agenda retro</h1>

      <form onSubmit={addContacto}>
        <label>Nombre</label>
        <input type='text' name='search' value={entrada} onChange={event => setEntrada(event.target.value)}></input>
        <button type='submit'>Guardar</button>
      </form>

      
    <ul>
    {contactos.map(contacto => <li key={contacto.id}>{contacto.name}</li>)}
    </ul>
   
    </div>
  )
}

export default App
