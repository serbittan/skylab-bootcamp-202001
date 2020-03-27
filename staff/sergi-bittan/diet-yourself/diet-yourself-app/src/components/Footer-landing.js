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
            <button type="button" className="footer__landing" onClick={() => {
                goToLogout()
            }}>Logout</button>
        </div>
    )
}

export default  FooterLanding