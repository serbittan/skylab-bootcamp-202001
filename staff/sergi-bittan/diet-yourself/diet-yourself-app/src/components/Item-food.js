import React from 'react'
//import './Item-food.sass'

const ItemFood = ({ foods }) => {
    const { name, quantity }  = foods

    return(
        <div>
            <section className="foods">
                <p>{name}</p>
                <p>{quantity} gr</p>
            </section>
        </div>
    )
}

export default ItemFood