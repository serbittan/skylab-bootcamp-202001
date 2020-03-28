import React from 'react'
import ItemDiet from './Item-diet'


const ResultsFavs = ({diets}) => {
    debugger
    return (
        <div className="diet-favs">
            {diets.map((diet, index) => <ItemDiet diets={diet} key={index}/>).reverse()}
        </div>
    )
}

export default ResultsFavs