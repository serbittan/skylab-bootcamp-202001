import React from 'react'
//import './Item-food.sass'

const ItemFood = ({ foods }) => {
    const {name, quantity } = foods

    return(
        <div>
            <section className="foods">
                <h3>{name}</h3>
                <h3>{quantity}</h3>
            </section>
        </div>
    )
}

export default ItemFood