
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PersonInfoPage from './components/PersonInfoPage'
import PhonebookPage from './components/PhonebookPage'

const App = () => {

  return (
    <div>
      <button>
        <a href={'/'} style={{ textDecoration: 'none' }}>Home</a>
      </button> <p />
      <Router>
        <Routes>
          <Route path='/' element={<PhonebookPage />} />
          <Route path='api/persons/:id' element={<PersonInfoPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App