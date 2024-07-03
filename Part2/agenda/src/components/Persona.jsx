const Persona = ({contacto, deleteP}) =>{
    console.log(contacto.name)
    return(
        <>
        <li> 
            Nombre: {contacto.name} || Teléfono: {contacto.phone} 
            <button onClick={deleteP}>borrar</button>
        </li>

        </>
    )

}
export default Persona