import React from 'react'
import ItemDiet from './Item-diet'


const ResultsFavs = ({diets, goToDetail }) => {
    
    return (
        <div className="diet-favs">
            {diets.map((diet, index) => <ItemDiet diets={diet} goToDetail={goToDetail} key={index}/>).reverse()}
        </div>
    )
}

export default ResultsFavs