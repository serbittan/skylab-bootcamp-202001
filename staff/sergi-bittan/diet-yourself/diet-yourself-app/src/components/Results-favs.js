import React from 'react'
import ItemDiet from './Item-diet'
import './Results-favs.sass'
import Feedback from './Feedback'


const ResultsFavs = ({diets= [], goToDetail, error }) => {
    
    return (
        <div className="diet-favs">
            {diets && diets.map((diet, index) => <ItemDiet diets={diet} goToDetail={goToDetail} key={index}/>).reverse()}
            {!diets.length && <Feedback message='you have no favorites diets' level='warn' />}
            {/* {error && <Feedback message={error} level='warn' />} */}
        </div>
    )
}

export default ResultsFavs