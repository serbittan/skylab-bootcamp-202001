import React from 'react'
import './Footer-diet.sass'

const FooterDiet = ({ addToFavs, newDiet, updateData }) => {

   
    return (
        <div className="footer-diet">
            <a href="!#"  onClick={event => {
                event.preventDefault()

                addToFavs()

            }}><i className=" footer-diet__f far fa-star"></i></a>
         <a href="#!"  onClick={() => {
                newDiet()

            }}><i className="footer-diet__r fas fa-redo"></i></a>
            <a href="!#" onClick={event => {
                event.preventDefault()

                updateData()

            }}><i className="footer-diet__p fas fa-user"></i></a>
        </div>
    )
}

export default  FooterDiet