import React from 'react';

const Step1 = ({ onSaveData, data }) => {
    console.log(data);

    return (
        <div className="contenedor">
            <figure className="logo">
                <img className="logo__image" src="./images/Diet-yourself.png" alt="" />
            </figure>
            <h1>DIET YOURSELF</h1>
            <div className="logo-goal">
                <button className="logo-goal__opciones" onClick={() => onSaveData('step1', 'aumentar_masa_muscular')}>Aumentar Masa Muscular</button>
                <button className="logo-goal__opciones" onClick={() => onSaveData('step1', 'mantener_peso')}>Mantener Peso</button>
                <button className="logo-goal__opciones" onClick={() => onSaveData('step1', 'perder_peso')}>Perder Peso</button>
            </div>
            <footer className="footer">
                <h4 className="footer__p">¿Ya tienes cuenta?</h4>
                <a href="" className="footer__p">Inicia Sesion</a>
            </footer>
        </div>
    );
};

export default Step1;
