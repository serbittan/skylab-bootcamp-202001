import React from 'react'
//import './Header.sass'

// className={active === "g" ? "control-icon active" : "control-icon"}
// 👍
// 1
// [3:22 PM]
// const [active, setActive] = useState('g’)

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