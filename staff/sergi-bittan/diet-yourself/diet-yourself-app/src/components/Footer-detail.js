import React from 'react'
import './Footer-detail.sass'

const FooterDetail = ({ diet, removeDiet, goHome }) => {
    const { _id } = diet
    debugger
    return (
        <div className="footer-detail">
            <a href="#"  alt="remove diet" onClick={event => {
                event.preventDefault()

                removeDiet(_id)

            }}><i className="footer-detail__clean fas fa-trash-alt"></i></a>

            <a href="#"  alt="go home" onClick={event => {
                event.preventDefault()

                goHome()

            }}><i className="footer-detail__home fas fa-home"></i></a>
        </div>
    )
}

export default FooterDetail