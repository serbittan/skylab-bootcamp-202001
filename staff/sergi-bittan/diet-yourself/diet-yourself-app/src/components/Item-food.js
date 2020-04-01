import React from 'react'
import './Item-food.sass'

const ItemFood = ({ foods }) => {
    const { name, quantity }  = foods

    return(
        <div>
            <section className="foods">
                <p className="foods__n">{name}</p>
                <p className="foods__q">{quantity} gr</p>
            </section>
        </div>
    )
}

export default ItemFood