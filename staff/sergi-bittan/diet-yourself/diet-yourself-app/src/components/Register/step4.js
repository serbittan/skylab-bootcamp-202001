import React from 'react'
import './Step4.sass'
import Feedback from '../Feedback'


const Step4 = ({ onSaveData, data, error }) => {
    const { height, weight, finalWeight } = data
    return (
    <div className="height">
        <h5>How Tall are you?</h5>
        <input type="text" autoComplete="off" className="height__h" name="height" placeholder="cms" autoFocus="autofocus" onBlur={event => onSaveData(3, {height: event.target.value})}/>
        <h5>What's your current weight?</h5>
        <input type="text" autoComplete="off" className="height__h" name="weight" placeholder="kg"  onBlur={event => onSaveData(3, {weight: event.target.value})}/>
        <h5>your desired weight?</h5>
        <input type="text" autoComplete="off" className="height__h" name="final_weight" placeholder="kg"  onBlur={event => onSaveData(3, {finalWeight: event.target.value})}/>
        {error && <Feedback message={error} level={'error'} />}
    </div>
    )
}

export default Step4

