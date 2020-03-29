import React from 'react'
//import './Header.sass'

const Header = ({ user, goBack }) => {
    const { username, diet } = user
    return (

        <header className="header">
            <a href="#" onClick={event => {
                event.preventDefault()
                goBack()
            }}><span className="header__landing"><i className="fas fa-angle-left"></i></span></a>
            <p className="header__landing">Objetivo :</p>
            <p className="header__landing">{diet.points}</p>
            <p>{username}</p>
        </header>
    )
}

export default Header