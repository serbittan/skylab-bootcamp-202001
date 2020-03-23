import React from 'react'
import './Step1.sass'
import '../../images/diet-yourself.png'

const Step1 = ({ onSaveData, data }) => {
    console.log(data);

    return (
        <div className="contenedor">
            <figure className="logo">
                <img className="logo__image" src="../../images/Diet-yourself.png" alt="" />
            </figure>

            <div className="logo-goal">
                <button className="logo-goal__opciones" onClick={() => onSaveData( 0, { goal: 'gain_muscle_mass' })}>Gain Muscle Mass"</button>
                <button className="logo-goal__opciones" onClick={() => onSaveData( 0, { goal: 'maintain_weight' })}>Maintain Weight</button>
                <button className="logo-goal__opciones" onClick={() => onSaveData( 0, { goal: 'lose_weight' })}>Lose Weight</button>
            </div>
            <footer className="footer">
                <h4 className="footer__p">Are you an account?</h4>
                <a href="" className="footer__p">Login</a>
            </footer>
        </div>
    );
}

export default Step1
