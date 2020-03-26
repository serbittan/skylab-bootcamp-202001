import React, { useState, useEffect, useContext } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { Login, Register, Landing, Page, ItemFood, ResultsFood, Header } from '../components'
import { register, login, isLoggedIn, addMethod, retrieveUser, retrieveDiet } from '../logic'
import { Context } from './ContextProvider'
import './App.sass'



export default withRouter(function ({ history }) {
    //const [state, setState] = useState()
    const [state, setState] = useContext(Context)
    const [foods, setFoods] = useState()
    const [user, setUser] = useState([])


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
              // logout()
              history.push('/login')
            }
          })()
        } else {
          history.push('/register')
        }
      }, [])

    async function handleLogin (email, password) {
        try {
            await login(email, password)

            let user = await retrieveUser()
            setUser(user)
            history.push('./landing')

        } catch ({message}) {
            setState({ error: message })
        }
    }

    async function handleMethod (method) {
        try{
            await addMethod(method)

            const foods = retrieveDiet()
            setFoods(foods)
            history.push('/diet')
            
        } catch ({message}) {
            setState({ error: message })
        }
    }

    //console.log(isLoggedIn());

    return (
        <div className="App">
            <Switch>
                <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/landing" /> : <Redirect to="/register"  />} />
                <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/landing" /> : <Register  /*error={error}*/ />} />
                <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/landing" /> : <Login onLogin={handleLogin} error={'error-test'} />} />
                <Route path="/landing" render={() => isLoggedIn() ? <Landing onMethod={handleMethod} /> : <Redirect to="/login" /*error={'error-test'}*/ />} /> 
                <Route path="/diet" render={()=> isLoggedIn() ? <ResultsFood foods={foods} user={user}/> : <Redirect to="/login"  />} />               
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