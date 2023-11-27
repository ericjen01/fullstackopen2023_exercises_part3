/* eslint-disable react/prop-types */

const NewPersonForm = ({submitAddition, managePersonChange, manageNumberChange}) => {
  
  return (
    <div>
      <form onSubmit={submitAddition}>
        <div>
          name: <input onChange={(e) => managePersonChange(e)}/>
        </div>
        <div>
          number: <input onChange={(e) => manageNumberChange(e)}/>
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default NewPersonForm