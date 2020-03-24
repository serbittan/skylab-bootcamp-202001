import React from 'react'
import './Step4.sass'


const Step4 = ({ onSaveData, data}) => {
    const { height, weight, finalWeight } = data
    return (
    <div className="height">
        <h5>How Tall are you?</h5>
        <input type="text" className="height__height" name="height" placeholder="cms" autoFocus="autofocus" onBlur={event => onSaveData(3, {height: event.target.value})}/>
        <h5>What's your current weight?</h5>
        <input type="text" className="height__weight" name="weight" placeholder="kg"  onBlur={event => onSaveData(3, {weight: event.target.value})}/>
        <h5>your desired weight?</h5>
        <input type="text" className="height__desired" name="final_weight" placeholder="kg"  onBlur={event => onSaveData(3, {finalWeight: event.target.value})}/>
    </div>
    )
}

export default Step4

