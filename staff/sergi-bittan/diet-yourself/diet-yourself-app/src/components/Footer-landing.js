import React from 'react'
//import './Footer-landing.sass'

const FooterLanding = ({ goToFavs, currentDiet, goToLogout }) => {
    return (
        <div className="footer">
            <button type="button" className="footer__landing" onClick={() => {
                goToFavs()
            }}>My Diets</button>
            <button type="button" className="footer__landing" onClick={() => {
                currentDiet()
            }}>Today</button>
            <a href="#" className="footer__landing" onClick={event => {
                event.preventDefault()
                goToLogout()
            }}><i class="fas fa-power-off"></i></a>
        </div>
    )
}

export default  FooterLanding