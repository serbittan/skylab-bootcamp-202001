import React from 'react'
import PopupUser from './Popup-user'
import './Footer-diet.sass'

const FooterDiet = ({ addToFavs, newDiet, onDataUpdate }) => {

   
    return (
        <div className="footer-diet">
            <a href="#" className="footer__diet" onClick={event => {
                event.preventDefault()

                addToFavs()
            }}><i class="far fa-star"></i></a>
         <button type="button" className="footer__diet" onClick={() => {
                newDiet()
            }}>NEW</button>
            <PopupUser updateData={onDataUpdate}/>
        </div>
    )
}

export default  FooterDiet