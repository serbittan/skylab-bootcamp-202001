import React, { useState, useEffect, useContext } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { Login, Register, Landing, Page, ItemFood, ResultsFood, Header, FooterDiet, FooterLanding } from '../components'
import { register, login, isLoggedIn, retrieveUser, retrieveDiet, retrieveDiets, addFavDiet, updateUser } from '../logic'
import { Context } from './ContextProvider'
import './App.sass'
import createDiet from '../logic/create-diet'



export default withRouter(function ({ history }) {
    //const [state, setState] = useState()
    const [state, setState] = useContext(Context)
    const [diet, setDiet] = useState()
    const [user, setUser] = useState()
    //const [user, setUser] = useState([])


    // useEffect(() => {
    //     if (isLoggedIn()) {
    //       setState({ page: 'landing' })
    
    //       history.push('/landing')
    //     } else {
    //       setState({ page: 'login' })
    
    //       history.push('/login')
    //     }
    //   }, [])

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
            history.push('./landing')

        } catch ({ message }) {
            setState({...state, error: message })
        }
      })()
    }

    async function handleMethod (method) {
        try{
            await createDiet(method)

            const user = await retrieveUser()
            const { diet } = user
            setDiet(diet)
            history.push('/diet')
            
        } catch ({ message }) {
            setState({ error: message })
        }
    }

    async function handleAddFavs () {
      try{
          await addFavDiet()
          
      } catch({ message }) {
        setState({ error: message })
      }
    }

    async function handleNewDiet() {
      try{
          let user = await retrieveUser()
          const { diet: { method } } = user
          await createDiet(method)
          user = await retrieveUser()
          const { diet } = user
          setDiet(diet)
          history.push('/diet')

      }catch({ message }) {
        setState({ error: message })
      }
    }

    async function handleGoToProfile () {
      try{
          await updateUser()
      }catch({ message }) {
        setState({ error: message })
      }
    }

    async function handleGoToFavs() {
      try{
        const diets = await retrieveDiets()
          //TODO results fav diets compos + detail diet
      }catch({ message }) {
        setState({ error: message})
      }
    }
     //TODO handleToday handleGoToLogout

    //console.log(isLoggedIn());
    const { error } = state
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/landing" /> : <Redirect to="/register"  />} />
                <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/landing" /> : <Register  error={error} />} />
                <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/landing" /> : <Login onLogin={handleLogin} error={error} />} />
                <Route path="/landing" render={() => isLoggedIn() ? <><Landing onMethod={handleMethod} error={error} /><FooterLanding goToFavs={handleGoToFavs} currentDiet={handleToday} goToLogout={handleGoToLogout} /></> : <Redirect to="/login" />} /> 
                <Route path="/diet" render={()=> isLoggedIn() ? <><ResultsFood diet={diet} user={user} /><FooterDiet addToFavs={handleAddFavs} newDiet={handleNewDiet} goToProfile={handleGoToProfile} /></> : <Redirect to="/login"  />} />               
                <p>Route not found</p>
            </Switch>
        </div>
    );
})


// return <div className="app">
//     <Page name={page}>
//       <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Redirect to="/login" />} />
//       {/* <Route path="/" render={() => <h1>Hello, All</h1>} /> */}
//       {/* <Route path="/login" render={() => <h1>Hello, Login</h1>} /> */}
//       <Route path="/home/:id" render={props => <h1>{props.match.params.id}</h1>} />
//       <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Register onSubmit={handleRegister} error={error} onGoToLogin={handleGoToLogin} onMount={handleMountRegister} />} />
//       <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/home" /> : <Login onSubmit={handleLogin} error={error} onGoToRegister={handleGoToRegister} onMount={handleMountLogin} />} />
//       <Route path="/home" render={() => isLoggedIn() ? <Home /> : <Redirect to="/login" />} />
//     </Page>
//   </div>