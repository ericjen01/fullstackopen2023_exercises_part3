import '../../index.css'
import { useState, useEffect } from 'react'
import { warning } from '../Icons'
import personsService from '../../services/persons'
import Persons from '../Persons'
import Notification from '../Notification'
import Search from '../Search'
import NewPersonForm from '../NewPersonForm'

const PhonebookPage = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [message, setMessage] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    const timeout = () => (setTimeout(() => { setMessage(null) }, 3000))

    const personsToShow = searchTerm.length > 0
        ? persons.filter(p => p.name.search(new RegExp(searchTerm, 'ig')) >= 0)
        : persons

    useEffect(() => {
        const effectHook = () => {
            personsService
                .getPersons()
                .then(response => {
                    setPersons(response)
                })
        }
        effectHook()
    }, [])

    const submitAddition = (e) => {
        e.preventDefault();

        const newPersonToAdd = { name: newName, number: newNumber }
        const msg = `${warning} "${newName}" already exists. update phone # to "${newNumber}" ?`
        const hasName = newName !== ''
        const hasNumber = newNumber !== ''
        const dupoName = hasName && hasNumber && persons.find(p => p.name === newPersonToAdd.name)
        const fieldsEmpty = newName === '' || newNumber === ''
        const feildsFilled = newName !== '' && newNumber !== ''

        if (fieldsEmpty) {
            setMessage({ content: `${warning} name or number can't be empty`, type: "error" })
            timeout()
            return
        }

        if (feildsFilled && !dupoName) {
            personsService
                .createPerson(newPersonToAdd)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setMessage({ content: `'${newName}' has been added to phonebook`, type: "notification" })
                }).catch(err => {
                    setMessage({
                        content: err.response.data
                            .match(new RegExp('Required: ' + '(.*)' + '... <br>'))[0],
                        type: "error"
                    })
                })
            timeout()
            return
        }

        const okByUser = window.confirm(msg)

        if (dupoName && !okByUser) {
            setMessage({ content: "action cancelled", type: "notification" })
            timeout()
            return
        }

        if (dupoName && okByUser) {
            personsService
                .updatePerson(dupoName.id, newPersonToAdd)
                .then(returnedPerson => {
                    setPersons(persons.map(p => p.name === returnedPerson.name ? returnedPerson : p))
                    setMessage({ content: `number '${returnedPerson.number}' updated for ${newName}`, type: "notification" })
                    timeout()
                    return
                })
        }
    }

    const removePerson = (id) => {
        const name = (persons.filter(p => p.id === id)).name
        const number = (persons.filter(p => p.id === id)).number
        const message = `delete ${name} ${number}?`

        if (window.confirm(message) === true) {
            personsService
                .removePerson(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id))
                    setMessage({ content: "person removed", type: "notification" })
                })
                .catch(err => {
                    console.log(err)
                    setMessage({ content: `${name} (${number}) has already been removed`, type: "error" })
                })
            timeout()
        }
        setMessage({ content: "aborted", type: "notification" })

    }

    const managePersonChange = (e) => setNewName(e.target.value)
    const manageNumberChange = (e) => setNewNumber(e.target.value)
    const manageSearchChange = (e) => setSearchTerm(e.target.value)

    return (
        <div>

            <h2>Phonebook</h2>

            <Notification message={message} />

            <Search manageSearchChange={(e) => manageSearchChange(e)} />

            <h3>Add a New Contact</h3>

            <NewPersonForm
                submitAddition={(e) => submitAddition(e)}
                managePersonChange={(e) => managePersonChange(e)}
                manageNumberChange={(e) => manageNumberChange(e)}
            />

            <h3>Numbers</h3>

            <Persons personsToShow={personsToShow} removePerson={removePerson} />

        </div>
    )
}

export default PhonebookPage