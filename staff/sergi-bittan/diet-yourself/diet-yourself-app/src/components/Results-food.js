import React from 'react'
import ItemFood from './Item-food'
import './Results-food.sass'

const ResultsFood = ({foods}) => {
    return (
        <section className="results">
            {foods.map((food, index) => <ItemFood key={index} foods={food} />)})}
        </section>
    )

}

export default ResultsFood