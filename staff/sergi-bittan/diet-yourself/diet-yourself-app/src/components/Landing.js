import React from 'react'
import './Landing.sass'


const Landing = ({onSaveDiet, method}) => {
    //const method = [ "mediterranean", "low carb", "keto", "difficult day" ] 
    return(
        <div className="main-landing">
                <h4>Choose your ideal Diet</h4>
            <button className={`main-landing__diet ${method === "mediterranean" ? "method_selected" : ""}`} onClick={() => onSaveDiet({ method: 'mediterranean' })}><h5>Mediterranean</h5></button>
            <button className={`main-landing__diet ${method === "low carb" ? "method_selected" : ""}`} onClick={() => onSaveDiet({ method: 'low carb' })}><h5>Low Carb</h5></button>
            <button className={`main-landing__diet ${method === "keto" ? "method_selected" : ""}`} onClick={() => onSaveDiet({ method: 'keto' })}><h5>Keto</h5></button>
            <button className={`main-landing__complicate ${method === "difficult day" ? "method_selected" : ""}`} onClick={() => onSaveDiet({ method: 'difficult day' })}><h5>Difficult Day</h5></button>
        </div>
    )
}

export default Landing





{/* <div class="main">
        <header class="header">
            <p class="header__landing">Objetivo :</p>
            <p class="header__landing">1800 Kcal</p>
        </header>
            
        
        
            
       
       
        <div class="main-landing">
                <h4>Elige tu dieta ideal</h4>
            <button class="main-landing__diet"><h5>Mediterranea</h5></button>
            <button class="main-landing__diet"><h5>Low Carb</h5></button>
            <button class="main-landing__diet"><h5>Keto</h5></button>
            <button class="main-landing__diet"><h5>Vegetariana</h5></button>
            <button class="main-landing__complicate"><h5>Día Complicado</h5></button>
        </div>
        <footer class="footer-landing">
            <i class="far fa-star large-icon-size"></i>
            <!-- <p class="footer-landing__favs">Mis Dietas</p> -->
            <button class="footer-landing__today"><h5>Hoy</h5></button>
            <i class="fas fa-power-off large-icon-size"></i>
        </footer>

  </div> */}