import React from 'react'
import ItemDiet from './Item-diet'


const ResultsFavs = ({diets}) => {
    return (
        <div className="diet-favs">
            {diets.map((diet, index) => <ItemDiet diets={diet} key={index}/>)}
        </div>
    )
}

export default ResultsFavs