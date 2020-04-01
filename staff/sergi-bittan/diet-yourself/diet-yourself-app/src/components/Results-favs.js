import React from 'react'
import ItemDiet from './Item-diet'
import './Results-favs.sass'


const ResultsFavs = ({diets, goToDetail }) => {
    
    return (
        <div className="diet-favs">
            {diets.map((diet, index) => <ItemDiet diets={diet} goToDetail={goToDetail} key={index}/>).reverse()}
        </div>
    )
}

export default ResultsFavs