import React from 'react'

const FooterDetail = ({ diet, removeDiet, goHome }) => {
    const { _id } = diet
    debugger
    return (
        <div className="footer-detail">
            <a href="#" className="footer-detail__diet" alt="remove diet" onClick={event => {
                event.preventDefault()

                removeDiet(_id)

            }}><i class="fas fa-trash-alt"></i></a>

            <a href="#" className="footer-detail__diet" alt="go home" onClick={event => {
                event.preventDefault()

                goHome()

            }}><i class="fas fa-home"></i></a>
        </div>
    )
}

export default FooterDetail