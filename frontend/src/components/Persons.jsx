const Persons = ({personsToShow, removePerson}) =>(
    <ul>
        {
            personsToShow.map((p,i) => (
                <li key={i}>
                    {`${p.name} ${p.number} `}
                    <button onClick={() => removePerson(p.id)}>Delete</button>
                </li>
            )            
           
            )
        }
    </ul>
)

export default Persons