import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import personsService from '../../services/persons'

const PersonInfoPage = () => {

  const [person, setPerson] = useState([])
  const params = useParams()
  const id = params.id;


  useEffect(() => {
    const effectHook = () => {
      personsService.getPersonById(id)
        .then(response => {
          setPerson(response)
        })
    }
    effectHook()
  }, [id])

  return (
    <>
      <span>Name: {person.name}</span><br />
      <span>Number: {person.number}</span><br />
      <span>id: {person.id}</span>
    </>
  )
}

export default PersonInfoPage