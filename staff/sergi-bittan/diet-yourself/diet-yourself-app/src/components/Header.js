import React from 'react'
import './Header.sass'
import { useLocation } from 'react-router-dom'

const Header = ({ user, goBack }) => {

    const { username, calories } = user

    let location = useLocation()

    return (

        <header className="header">

            {location.pathname !== '/landing' &&
                <a href="!#" onClick={event => {
                    event.preventDefault()
                    goBack()
                }}><i className="header__prev fas fa-angle-left"></i></a> 
            }
            {location.pathname === '/landing' && <p><i className="fas fa-utensils"></i></p>}

            <p className="header__landing">Objetivo:</p>
            {calories && <p className="header__kcl">{calories} Kcal</p>}
            {username && <p className="header__name">{username}</p>}
        </header>
    )
}

export default Header