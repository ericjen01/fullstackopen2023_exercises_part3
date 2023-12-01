const Persons = ({ personsToShow, removePerson }) => (
    <ul>
        {
            personsToShow.map((p, i) => (
                <li key={i}>
                    <a href={`api/persons/${p.id}`}
                        style={{
                            textDecoration: "none",
                            color: "darkmagenta"
                        }}
                    >
                        {`${p.name} ${p.number}`}
                    </a>
                    <button onClick={() => removePerson(p.id)}>Delete</button>
                </li>
            )

            )
        }
    </ul>
)

export default Persons