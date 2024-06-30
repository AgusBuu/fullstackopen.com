
const Persona = ({contacto}) =>{
    console.log(contacto.name)
    return(
        <>
        <li> Nombre: {contacto.name} || Teléfono: {contacto.phone}</li>
        </>
    )

}
export default Persona