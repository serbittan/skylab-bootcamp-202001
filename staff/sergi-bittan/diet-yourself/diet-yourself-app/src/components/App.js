import React, { useState, useEffect, useContext } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { Login, Register, Landing, ResultsFood, ResultsFavs, Header, FooterDiet, FooterLanding, FooterDetail, UpdateUser } from '.'
import { register, login, isLoggedIn, retrieveUser, retrieveDiet, retrieveDiets, retrieveUserDiet, addFavDiet, updateUser, removeFavDiet, logout } from '../logic'
import { Context } from './ContextProvider'
import './App.sass'
//import context from '../logic'
import createDiet from '../logic/create-diet'
//import ResultsFavs from './Results-favs'



export default withRouter(function ({ history }) {
  //const [state, setState] = useState()
  const [state, setState] = useContext(Context)
  const [diet, setDiet] = useState()
  const [diets, setDiets] = useState()
  const [user, setUser] = useState([])
  

  useEffect(() => {
    if (isLoggedIn()) {
      (async () => {
        try {
          const user = await retrieveUser()
          setUser(user)
        } catch (error) {
          history.push('/login')
        }
      })()
    } else {
      history.push('/register')
    }
  }, [])

  const handleLogin = (email, password) => {
    (async () => {
      try {
        await login(email, password)

        let user = await retrieveUser()
        setUser(user)

        history.push('/landing')

      } catch ({ message }) {
        setState({ ...state, error: message })
      }
    })()
  }

  async function handleMethod(method) {
    try {
      await createDiet(method)
      const user = await retrieveUser()
      const { diet } = user

      setDiet(diet)

      history.push('/diet')

    } catch ({ message }) {
     
      setState({ error: message })
    }
  }

  async function handleAddFavs() {
    try {
      await addFavDiet()

    } catch ({ message }) {
      setState({ error: message })
    }
  }

  async function handleNewDiet() {
    try {
      let user = await retrieveUser()
      const { diet: { method } } = user
      await createDiet(method)
      user = await retrieveUser()
      const { diet } = user
      setDiet(diet)

      history.push('/diet')

    } catch ({ message }) {
      setState({ error: message })
    }
  }

  async function handleDataUser(newUser) {
    try {
      await updateUser(newUser) 
       const user = await retrieveUser()
      setUser(user)

      history.push('/landing')

    } catch ({ message }) {
      debugger
      setState({ error: message })
    }
  }

  async function handleGoToFavs() {
    try {
      const diets = await retrieveDiets()
      setDiets(diets)

      history.push('/diets')
      //TODO results fav diets compos + detail diet
    } catch ({ message }) {

      setState({ error: message })
    }
  }

  async function handleToday() {
    try {
      const diet = await retrieveUserDiet()
      setDiet(diet)

      history.push('/diet')

    } catch ({ message }) {
      setState({ error: message })
    }
  }

  async function handleGoToDetail(idDiet) {
    try {
      const diet = await retrieveDiet(idDiet)
      setDiet(diet)

      history.push('/detail')

    } catch ({ message }) {

      setState({ error: message })
    }
  }

  async function handleRemove (idDiet) {
    try{
          await removeFavDiet(idDiet)
          const diets = await retrieveDiets()
          setDiets(diets)
          history.push('/diets')

    }catch({ message }) {
     
      setState({ error: message })
    }
  }

  const handleLogout = function () {
    logout()

    history.push('/register')
  }

  const handleGoToRegister = function () {
    history.push('/register')
  }

  const handleGoToBack = function () {
    history.push('/landing')
  }

  const handleGoHome = function () {
    history.push('/landing')
  }

  const handleDataUpdate = function () {
    history.push('/profile')
  }

  const handleDietUpdate = function(data) {
    console.log(data)
  }

  //TODO handleToday handleGoToLogout

  //console.log(isLoggedIn());
  const { error } = state
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/landing" /> : <Redirect to="/register" />} />
        <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/landing" /> : <Register error={error}  />} />
        <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/landing" /> : <Login onLogin={handleLogin} goToRegister={handleGoToRegister} error={error} />} />
        <Route path="/landing" render={() => isLoggedIn() ? <><Header goBack={handleGoToBack} user={user} /><Landing onMethod={handleMethod} error={error} /><FooterLanding goToFavs={handleGoToFavs} currentDiet={handleToday} goToLogout={handleLogout} /></> : <Redirect to="/login" />} />
        <Route path="/diet" render={() => isLoggedIn() ? <><Header goBack={handleGoToBack} user={user} /><ResultsFood diet={diet} user={user} /><FooterDiet addToFavs={handleAddFavs} newDiet={handleNewDiet} updateData={handleDataUpdate} /></> : <Redirect to="/login" />} />
        <Route path="/diets" render={() => isLoggedIn() ? <><Header goBack={handleGoToBack} user={user} /><ResultsFavs goToDetail={handleGoToDetail} diets={diets} user={user} /></> : <Redirect to="/landing" />} />
        <Route path="/detail" render={() => isLoggedIn() ? <><Header goBack={handleGoToBack} user={user} /><ResultsFood diet={diet} diets={diets} user={user} /><FooterDetail removeDiet={handleRemove} goHome={handleGoHome} diet={diet} /></> : <Redirect to="/register" />} />
  <Route path="/profile" render={() => isLoggedIn() ? <><Header goBack={handleGoToBack} user={user} /><UpdateUser dataUser={handleDataUser} /></> : <Redirect to='/register'/> } />
        <p>Route not found</p>
      </Switch>
    </div>
  );
})

