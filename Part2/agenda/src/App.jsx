import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'Axios'
import Perdonform from './components/Personform'
import Filtro from './components/Filtro'
import Persona from './components/Persona'
import Personform from './components/Personform'
import agendaHandle from './services/contactos'

const App = () => {
  
  const [entradaName, setEntradaName] = useState('') //esta entrada levanta el input de NOMBRE
  const [entradaPhone, setEntradaPhone] = useState(0) //levanta el input teléfono
  const [contactos, setContactos] = useState([])
 
  useEffect(() => {
    console.log('effect')
    agendaHandle
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setContactos(response.data)
      })
  }, [])

  const [search, setSearch] = useState('')//levanta los términos de búsqueda
  let existeName = false //variables para verificar si el contacto existe en la agenda
  let existePhone = false
  const verificarExistentes = () =>{
  
    contactos.map (contacto => {
      existeName= contacto.name == entradaName ? true : existeName 
      existePhone = contacto.phone == entradaPhone ? true : existePhone              
  })}

  const addContacto = (event) => {
    event.preventDefault()
    verificarExistentes()
    console.log('existe?', existeName, entradaName, entradaPhone); // verificación en consola para ver si existe el nombre y/o numero

    if (existeName==false && existePhone==false){
        const nuevoContacto = {
        name: entradaName,
        phone: entradaPhone,
        
      }
      setContactos(contactos.concat(nuevoContacto))
      //enviamos el nuevo contacto al json-server
      agendaHandle
      .create(nuevoContacto)
      setEntradaName('')  
      setEntradaPhone('') 
    } else{

    }
    if (existeName){
      alert ('el contacto '+entradaName+' ya existe en la agenda') 
      setEntradaName('')  
      setEntradaPhone('')  
      
      
    } if(existePhone){
      alert ('el número de teléfono '+entradaPhone+' ya existe en la agenda')
      setEntradaName('')  
      setEntradaPhone('')  
      

    }
    }
    
  return (
    <div>
      <h1>Mi Agenda retro</h1>

      <h2>Buscar contacto</h2>
      <Filtro search={search} setSearch={setSearch} contactos={contactos} />

      <h2>Agregar nuevo contacto</h2>
      <Personform addContacto={addContacto} entradaName={entradaName} entradaPhone={entradaPhone} setEntradaName={setEntradaName} setEntradaPhone={setEntradaPhone} />
      
    
    <ul>          
    {contactos.map(contacto => <Persona key={contacto.name} contacto={contacto} />  )}
    </ul>
    </div>
  )
}

export default App
