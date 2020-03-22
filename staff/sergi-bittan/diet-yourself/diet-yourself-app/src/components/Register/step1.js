import React from 'react'
import './step1.sass'

const Step1 = ({ onSaveData, data }) => {
    console.log(data);

    return (
        <div className="contenedor">
            <figure className="logo">
                <img className="logo__image" src="./images/Diet-yourself.png" alt="" />
            </figure>
            <h1>DIET YOURSELF</h1>
            <div className="logo-goal">
                <button className="logo-goal__opciones" onClick={() => onSaveData('step1', 'gain_muscle_mass')}>Gain Muscle Mass"</button>
                <button className="logo-goal__opciones" onClick={() => onSaveData('step1', 'maintain_weight')}>Maintain Weight</button>
                <button className="logo-goal__opciones" onClick={() => onSaveData('step1', 'lose_weight')}>Lose Weight</button>
            </div>
            <footer className="footer">
                <h4 className="footer__p">Are you an account?</h4>
                <a href="" className="footer__p">Login</a>
            </footer>
        </div>
    );
};

export default Step1;
