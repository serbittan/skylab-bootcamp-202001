import React from 'react'
import './Landing.sass'


const Landing = ({onMethod}) => {

    let method = ""

    return(
        // <div className="main-landing">
        //         <h4>Choose your ideal Diet</h4>
        //     <button className={`main-landing__diet ${name === "mediterranean" ? "method_selected" : ""}`} onClick={() => onSaveDiet({ name: 'mediterranean' })}><h5>Mediterranean</h5></button>
        //     <button className={`main-landing__diet ${name === "low carb" ? "method_selected" : ""}`} onClick={() => onSaveDiet({ name: 'low carb' })}><h5>Low Carb</h5></button>
        //     <button className={`main-landing__diet ${name === "keto" ? "method_selected" : ""}`} onClick={() => onSaveDiet({ name: 'keto' })}><h5>Keto</h5></button>
        //     <button className={`main-landing__complicate ${name === "difficult day" ? "method_selected" : ""}`} onClick={() => onSaveDiet({ name: 'difficult day' })}><h5>Difficult Day</h5></button>
        // </div>

        <div className="main-landing">
            <h4>Choose your ideal Diet</h4>
            <div className={"main-landing__diet"} onClick={() => {
                method = 'mediterranean'
                onMethod(method)}}><h5>Mediterranean</h5>
            </div>
            <div className={"main-landing__diet"} onClick={() => {
                method = 'low carb'
                onMethod(method)}}><h5>Low Carb</h5>
            </div>
            <div className={"main-landing__diet"} onClick={() => {
                method = 'keto'
                onMethod(method)}}><h5>Keto</h5>
            </div>
            <div className={"main-landing__complicate"} onClick={() => {
                method = 'difficult day'
                onMethod(method)}}><h5>Difficult Day</h5>
            </div>
        </div>

    )
}

export default Landing





