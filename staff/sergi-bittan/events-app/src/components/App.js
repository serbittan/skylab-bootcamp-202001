import React, { useState, useEffect, Fragment } from 'react'
import logo from './logo.svg'
// import './App.css'
import './App.sass'
import "./register.sass"
import { Register, Login, Home } from './'
import { authenticateUser, registerUser, retrieveUser } from '../logic';


function App({ name }) {

  const [view, setView] = useState("register")
  const [ user, setUser ] = useState()
  const [error, setError ] = useState()


  function __handleError__(error) {
    setError({ error: error.message })
    setTimeout(() => {
        setError({ error: undefined })
    }, 3000)
}
  

  function handleToRegister(name, surname, email, password) {

    (async () => {
      try {
        await registerUser(name, surname, email, password)
        setView('login')
    
      } catch (error) {
        __handleError__(error)
      }

    })()
  }

  const handleToGoLogin = () => {
    setView("login")
  }


  const handleToGoRegister = () => {
    setView("register")
  }


  function handleToLogin (email, password) {
    (async () => {
      try{
        debugger
        const token = await authenticateUser(email, password)
        sessionStorage.token = token
        const _user = await retrieveUser(token)
        debugger
        setUser(_user.name)
        setView("home")

      } catch(error) {
        __handleError__(error)
      }
    })()
  }
  





//handleToGoRegister=
//const {token} = sessionStorage


return <Fragment>

  {view === "register" && <Register onRegister={handleToRegister} onToLogin={handleToGoLogin}/>}  />}
  {view === "login" && <Login onLogin={handleToLogin} onToRegister={handleToGoRegister} />}
  {view === "home" && <Home userName={user}/>}
</Fragment>
  

  

  
}

export default App
