import React from 'react'

const ItemDiet = ({ diets, goToDetail }) => {
const { method, points, idDiet } = diets
debugger
    return(
        <div className="list-favs">
            <a href="#" onClick={event => {
                event.preventDefault()

                goToDetail(idDiet)

            }}><i class="fas fa-carrot"></i></a><p>{method}</p>
            <p>{points}</p>

        </div>
    )
}

export default ItemDiet