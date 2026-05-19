import './App.css'
import Navbar from './Components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Profile from './Components/Profile'
import LoginForm from './Components/Login'
import { AuthContext } from './Components/AuthContext'
import { useState } from 'react'
function App() {
  const [user, setUser] = useState({ name: '', isAuth: false })
  function Login(name){
    setUser({
      name : name,
      isAuth: true,
    })

  }
  return (
    <>
    <AuthContext.Provider value= {{user, Login}}>

        <div>
            <Navbar />
        </div>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
