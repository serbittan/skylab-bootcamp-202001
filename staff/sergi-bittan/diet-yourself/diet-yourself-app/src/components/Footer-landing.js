import React from 'react'
import './Footer-landing.sass'

const FooterLanding = ({ goToFavs, currentDiet, goToLogout }) => {
    return (
        <div className="footer">
            <button type="button" className="footer__diets" onClick={() => {
                goToFavs()
            }}>My Diets</button>
            <button type="button" className="footer__today" onClick={() => {
                currentDiet()
            }}>Today</button>
            <a href="!#" className="footer__landing" onClick={event => {
                event.preventDefault()
                goToLogout()
            }}><i className="footer__logout fas fa-power-off"></i></a>
        </div>
    )
}

export default  FooterLanding