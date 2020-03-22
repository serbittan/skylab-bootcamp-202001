import React from 'react';

const Step2 = ({ onSaveData, data }) => {
    console.log(data);
    const { activityLevel } = data;

    return (
        <div className="activity">
            <h4>Qué tan activo eres?</h4>
            <button type="button" className={`activity__mmm ${activityLevel === 'sedentary' ? 'activity__selected' : ''}`} onClick={() => onSaveData('step2', { activityLevel: 'sedentary' })}>No Muy Activo<br /><h5>pasas la mayor parte del día sentado. (ejemplo: cajero/trabajas en oficina..)<br />No practicas deporte</h5></button>
            <button type="button" className={`activity__mmm ${activityLevel === 'ligeramente_activo' ? 'activity__selected' : ''}`} onClick={() => onSaveData('step2', { activityLevel: 'ligeramente_activo' })}>Ligeramente Activo<br /><h5>pasas buena parte del día de pie. (ejemplo: profesor/vendedor)<br />Entrenas 2 dias a la semana</h5></button>
            <button type="button" className={`activity__mmm ${activityLevel === 'activo' ? 'activity__selected' : ''}`} onClick={() => onSaveData('step2', { activityLevel: 'activo' })}>Activo<br /><h5>pasas buena parte del día haciendo alguna actividad física. (ejemplo: camarero/cartero)<br />Entrenas 3-4 días a la semana</h5></button>
            <button type="button" className={`activity__mmm ${activityLevel === 'muy_activo' ? 'activity__selected' : ''}`} onClick={() => onSaveData('step2', { activityLevel: 'muy_activo' })}>Muy Activo<br /><h5>pasas la mayor parte del día haciendo actividad física intensa. (ejemplo: mensajero ciclista/carpintero)<br />Entrenas 5 o más días a la semana</h5></button>
        </div>
    );
}

export default Step2;
