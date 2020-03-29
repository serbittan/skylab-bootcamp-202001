import React from 'react'
import PopupUser from './Popup-user'
//import './Footer-diet.sass'

const FooterDiet = ({ addToFavs, newDiet, goToPopup }) => {

    function handleGoToPopup () {
        PopupUser()
    }
    return (
        <div className="footer">
            <button type="button" className="footer__diet" onClick={() => {
                addToFavs()
            }}>Add Favorites</button>
            <button type="button" className="footer__diet" onClick={() => {
                newDiet()
            }}>NEW</button>
            <button type="button" className="footer__diet" onClick={() => {
                goToPopup = {handleGoToPopup}
            }}>Profile</button>
        </div>
    )
}

export default  FooterDiet