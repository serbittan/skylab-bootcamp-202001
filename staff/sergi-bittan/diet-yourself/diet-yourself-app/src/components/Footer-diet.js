import React from 'react'
import PopupUser from './Popup-user'
import './Footer-diet.sass'

const FooterDiet = ({ addToFavs, newDiet, onDataUpdate }) => {

   
    return (
        <div className="footer-diet">
            <a href="#"  onClick={event => {
                event.preventDefault()

                addToFavs()
            }}><i className=" footer-diet__f far fa-star"></i></a>
         <a href="#"  onClick={() => {
                newDiet()
            }}><i className="footer-diet__r fas fa-redo"></i></a>
            <PopupUser updateData={onDataUpdate}/>
        </div>
    )
}

export default  FooterDiet