import React from 'react'
// import Feedback from './Feedback'



const Step5 = ({ onSaveData, data, onRegister }) => {
    console.log(data)
    
    return(
        <div className="register">
            <input type="text" className="register__mail" name="mail" placeholder="exemple@mail.com" autoFocus="autofocus" onBlur={event => onSaveData(4, { email: event.target.value })}/>
            <input type="text" className="register__password" name="password" placeholder="password" onBlur={event => onSaveData(4, { password: event.target.value })}/>
            <input type="text" className="register__username" name="username" placeholder="username" onBlur={event => onSaveData(4, { username: event.target.value })}/>
            <button className="register__acces" onClick ={event => {
                event.preventDefault();
                onRegister()
            }}>Register</button>
        </div>

    )

}

export default Step5
