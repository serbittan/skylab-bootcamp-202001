import React from 'react'

const ItemDiet = ({ diets,goDetail }) => {
    debugger
    const { method, points } = diets
    return(
        <div className="list-favs">
            <a href="#" onClick={event => {
                event.preventDefault()
                goDetail()
            }}><i class="fas fa-carrot"></i></a><p>{method}</p>
            <p>{points}</p>

        </div>
    )
}

export default ItemDiet