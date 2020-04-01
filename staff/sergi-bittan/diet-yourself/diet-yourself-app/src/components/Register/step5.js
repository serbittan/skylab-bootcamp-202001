import React from 'react'
import './Step5.sass'
// import Feedback from './Feedback'



const Step5 = ({ onSaveData, data, onRegister, goToLogin }) => {
    console.log(data)
    
    return(
        <div className="register">
            <input type="text" className="register__m" name="mail" placeholder="exemple@mail.com" autoFocus="autofocus" onBlur={event => onSaveData(4, { email: event.target.value })}/>
            <input type="text" className="register__m" name="password" placeholder="password" onBlur={event => onSaveData(4, { password: event.target.value })}/>
            <input type="text" className="register__m" name="username" placeholder="username" onBlur={event => onSaveData(4, { username: event.target.value })}/>
            <button className="register__acces" onClick ={event => {
                event.preventDefault();
                onRegister()
            }}>Sign Up</button>
            <a href="#" className="register__anchor" onClick={event => {
                event.preventDefault()

                goToLogin()
            }}>Sign In</a>
        </div>

    )

}

export default Step5
