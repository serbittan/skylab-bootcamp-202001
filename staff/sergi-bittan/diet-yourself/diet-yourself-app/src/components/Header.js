import React from 'react'
//import './Header.sass'


const Header = ({user}) => {
    const { username, diet:{ points } } = user
    return(
    <div class="main">
        <header class="header">
            <p class="header__landing">Objetivo :</p>
    <p class="header__landing">{points}</p>
            <h3>{username}</h3>
        </header>
    </div>

    )
}

export default Header