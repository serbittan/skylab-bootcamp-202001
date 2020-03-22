import React from 'react'
//import Feedback from './Feedback'
//import './step4.sass'

const Step4 = ({ onSaveData, data }) => {
    console.log(data)
    const { height, weight, finalWeight } = data
    return (
        
    <form class="height" onSubmit={event => {
        event.preventDefault()

        const height = event.target.height.value
        const weight = event.target.weight.value
        const finalWeight = event.target.finalWeight.value

        //onStep5(height, weight, finalWeight) //???
    }}>
        <h5>How Tall are you?</h5>
        <input type="text" class="height__height" name="height" placeholder="cms"/>
        <h5>Current Weight</h5>
        <input type="text" class="height__weight" name="weight" placeholder="kg"/>
        <h5>Desired Weight</h5>
        <input type="text" class="height__desire" name="weight" placeholder="kg"/>
    </form>
        
    )
}

export default Step4




































































































