/* eslint-disable react/prop-types */
import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getPersons = () => {
    const respns = axios.get(baseUrl)
    return respns.then(response => {
        //console.log("data getting retrived from server...")
        return response.data
    })
}

const createPerson = (newInput) => {
    const respns = axios.post(baseUrl, newInput)
    return respns.then(response =>{        
        //console.log("new input getting posted to server...")
        return response.data
    })
}

const updatePerson = (id, newInput) => {
    const respns = axios.put(`${baseUrl}/${id}`, newInput)
    return respns.then(response =>{   
        //console.log("updating phone number...")
    return response.data
    })
}

const removePerson = (id) =>{
    const respns = axios.delete(`${baseUrl}/${id}`)
        //console.log("url: ", `${baseUrl}/${id}`)
    return respns
}

export default { 
    getPersons, 
    createPerson, 
    removePerson,
    updatePerson,
}