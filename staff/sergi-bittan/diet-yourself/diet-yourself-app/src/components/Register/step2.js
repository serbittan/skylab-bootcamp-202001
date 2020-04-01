import React from 'react'
import './Step2.sass'

const Step2 = ({ onSaveData, data }) => {
    console.log(data);
    const { activityLevel } = data;

    return (
        <div className="activity">
            <h4>How active are you?</h4>
            <button type="button" className={`activity__mmm ${activityLevel === 'sedentary' ? 'activity__selected' : ''}`} onClick={() => onSaveData(1, { activityLevel: 'sedentary' })}><h5>Sedentary<br/>Do not do sport</h5></button>
            <button type="button" className={`activity__mmm ${activityLevel === 'mild_activity' ? 'activity__selected' : ''}`} onClick={() => onSaveData(1, { activityLevel: 'mild activity' })}><h5>Mild Activity<br/>Train 2 days a week</h5></button>
            <button type="button" className={`activity__mmm ${activityLevel === 'moderate_activity' ? 'activity__selected' : ''}`} onClick={() => onSaveData(1, { activityLevel: 'moderate activity' })}><h5>Moderate Activity<br/>Train 3-4 days a week</h5></button>
            <button type="button" className={`activity__mmm ${activityLevel === 'heavy_activity' ? 'activity__selected' : ''}`} onClick={() => onSaveData(1, { activityLevel: 'heavy activity' })}><h5>Heavy Activity<br/>Train 5 o more days a week</h5></button>
        </div>
    );
}

export default Step2;
