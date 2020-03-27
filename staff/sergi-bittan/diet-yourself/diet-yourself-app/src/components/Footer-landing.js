import React from 'react'
//import './Footer-landing.sass'

const FooterLanding = ({ goToFavs, currentDiet, goToLogout }) => {
    return (
        <div className="footer">
            <button type="button" className="footer__landing" onClick={() => {
                goToFavs()
            }}>Add Favorites</button>
            <button type="button" className="footer__landing" onClick={() => {
                currentDiet()
            }}>NEW</button>
            <button type="button" className="footer__landing" onClick={() => {
                goToLogout()
            }}>Profile</button>
        </div>
    )
}

export default  FooterLanding