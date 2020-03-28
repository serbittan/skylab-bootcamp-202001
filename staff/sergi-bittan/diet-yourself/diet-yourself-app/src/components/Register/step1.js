import React from 'react'
import './Step1.sass'
import  Logo from '../../images/diet-yourself.png'

const Step1 = ({ onSaveData, data, onGoToLogin}) => {
    console.log(data);

    return (
        <div className="contenedor">
            <figure className="logo">
                <img className="logo__image" src={Logo} alt="" />
            </figure>

            <div className="logo-goal">
                <button className="logo-goal__opciones" onClick={() => onSaveData( 0, { goal: 'gain muscle mass' })}>Gain Muscle Mass"</button>
                <button className="logo-goal__opciones" onClick={() => onSaveData( 0, { goal: 'maintain weight' })}>Maintain Weight</button>
                <button className="logo-goal__opciones" onClick={() => onSaveData( 0, { goal: 'lose weight' })}>Lose Weight</button>
            </div>
            <footer className="footer">
                <h4 className="footer__p">Are you an account?</h4>
                <a href="#" className="footer__p" href="" onClick={event => {
                    event.preventDefault()
                    onGoToLogin()
                    }}>Login</a>
            </footer>
        </div>
    );
}

export default Step1

