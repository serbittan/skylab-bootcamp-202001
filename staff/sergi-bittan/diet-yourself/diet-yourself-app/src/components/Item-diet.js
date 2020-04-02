import React from 'react'
import './Item-diet.sass'

const ItemDiet = ({ diets, goToDetail }) => {
const { method, calories, idDiet } = diets

    return(
        <div className="item-favs">
            <a href="#" onClick={event => {
                event.preventDefault()

                goToDetail(idDiet)

            }}><i className="item-favs__l fas fa-carrot"></i></a><p>{method}</p>
            <p>{calories} Kcal</p>

        </div>
    )
}

export default ItemDiet