import React from 'react'
import './Landing.sass'


const Landing = ({onMethod}) => {

    let method = ""

    return(
        <div className="main-landing">
            <h4>Choose your ideal Diet</h4>
            <div className={"main-landing__diet"} onClick={() => {
                method = 'mediterranean'
                onMethod(method)
                }}><h5>Mediterranean</h5>
            </div>
            <div className={"main-landing__diet"} onClick={() => {
                method = 'low carb'
                onMethod(method)
                }}><h5>Low Carb</h5>
            </div>
            <div className={"main-landing__diet"} onClick={() => {
                method = 'keto'
                onMethod(method)
                }}><h5>Keto</h5>
            </div>
            <div className={"main-landing__complicate"} onClick={() => {
                method = 'difficult day'
                onMethod(method)
                }}><h5>Difficult Day</h5>
            </div>
        </div>

    )
}

export default Landing





