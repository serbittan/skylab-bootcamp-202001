import React from 'react'
//import './Footer-diet.sass'

const FooterDiet = ({ addToFavs, newDiet, goToProfile }) => {
    return (
        <div className="footer">
            <button type="button" className="footer__diet" onClick={() => {
                addToFavs()
            }}>Add Favorites</button>
            <button type="button" className="footer__diet" onClick={() => {
                newDiet()
            }}>NEW</button>
            <button type="button" className="footer__diet" onClick={() => {
                goToProfile()
            }}>Profile</button>
        </div>
    )
}

export default  FooterDiet