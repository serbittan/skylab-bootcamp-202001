import React from 'react'

const ItemDiet = ({ diets, goToDetail }) => {
const { method, calories, idDiet } = diets

    return(
        <div className="list-favs">
            <a href="#" onClick={event => {
                event.preventDefault()

                goToDetail(idDiet)

            }}><i className="fas fa-carrot"></i></a><p>{method}</p>
            <p>{calories}</p>

        </div>
    )
}

export default ItemDiet