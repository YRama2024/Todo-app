import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import { Appbar } from './components/appbar/Appbar';
import { Signup } from './components/signup/Signup';
import { Login } from './components/login/Login';
import { Me } from './components/me/Me'

function App() {
  return (
    <>
      <Router>
        <Appbar/>
        <Routes>
          <Route path='/signup' element = {<Signup/>} />
          <Route path='/login' element = {<Login/>} />
          <Route path='/me' element = {<Me/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App