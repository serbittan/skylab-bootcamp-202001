import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
// import './App.css'
import './App.sass'
import "./register.sass"
import  Register  from './register'

function App({ name }) {
  
  const [view, setView] = useState(undefined)
  
  
  return <Register></Register>

  

  
}

export default App
