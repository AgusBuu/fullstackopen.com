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
  const [search, setSearch] = useState('')//levanta los términos de búsqueda
 //carga localmente la agenda desde el servidor
const recargar = ()=>{
  agendaHandle.getAll()
  .then(response => {
    setContactos(response.data);
  })
  .catch(error => {
    console.error('Error fetching contacts:', error);
  }) 
  console.log('recargado...')
}

    useEffect(() => {
    console.log('effect')
    recargar()  }, [])

  
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
      const reset= () => recargar()
      //enviamos el nuevo contacto al json-server
      agendaHandle
      .create(nuevoContacto, reset)
      setEntradaName('')  
      setEntradaPhone('') 
      
    } else{

    }
    if (existeName){
      const mensaje = 'el contacto '+entradaName+' ya existe en la agenda desea reemplazar su número por uno nuevo?'
      if(confirm(mensaje)){
        const reset= () => recargar()
        const contactoFind = contactos.find(contacto=>contacto.name==entradaName)
        console.log('encontró el contacto: ', contactoFind.id)
        const contactoUpdate = {...contactoFind, phone:entradaPhone}
        console.log('contacto update quedó así: ', contactoUpdate)
        agendaHandle.update(contactoFind.id, contactoUpdate, reset)
        setEntradaName('')  
        setEntradaPhone('') 
      
      }else{
        alert('El contacto no fue actualizado')
        setEntradaName('')  
        setEntradaPhone('') 
      }
      
      
    } if(existePhone){
      alert ('el número de teléfono '+entradaPhone+' ya existe en la agenda')
      setEntradaName('')  
      setEntradaPhone('')  
      

    }
    }

    const deleteContacto = (id) => {
      
      const reset= () => recargar()
      agendaHandle.deletePerson(id, reset)
        
    }

  return (
    <div>
      <h1>Mi Agenda retro</h1>

      <h2>Buscar contacto</h2>
      <Filtro search={search} setSearch={setSearch} contactos={contactos} />

      <h2>Agregar nuevo contacto</h2>
      <Personform addContacto={addContacto} entradaName={entradaName} entradaPhone={entradaPhone} setEntradaName={setEntradaName} setEntradaPhone={setEntradaPhone} />
      
    
    <ul>          
    {contactos.map(contacto => <Persona key={contacto.name} contacto={contacto} deleteP={()=>deleteContacto(contacto.id)} />  )}
    </ul>
    </div>
  )
}

export default App
