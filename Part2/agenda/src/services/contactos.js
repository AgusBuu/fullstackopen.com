import axios from 'Axios'
const baseUrl = 'http://localhost:3001/persons/'

const getAll = () => {
    return axios.get(baseUrl)
  }
  
  const create = newObject => {
    return axios.post(baseUrl, newObject)
  }
  
  const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
  }
  const deletePerson = (id, reset) =>{
    const message= '¿Seguro desea eliminar el contacto?'
    confirm(message)
    axios.delete(`${baseUrl}${id}`).then(()=>reset)
    .then(reset)

  }
  
  export default {getAll, create, update, deletePerson}