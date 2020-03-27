import React from 'react'

const ItemDiet = ({ diet }) => {
    const { method, points } = diet
    return(
        <div className="list-favs">
            <p>{method}</p>
            <p>{points}</p>

        </div>
    )
}

export default ItemDiet