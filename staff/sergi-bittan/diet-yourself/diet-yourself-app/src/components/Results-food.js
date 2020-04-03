import React from 'react'
import ItemFood from './Item-food'
import './Results-food.sass'


const ResultsFood = ({ diet }) => {

    
    const { method, foods } = diet
    return (
        <div className="results">
            {method && <h2>{method}</h2>}
            <section className="results_results">
                {foods && foods.map((food, index) => <ItemFood key={index} foods={food} />)}
            </section>
            
        </div>
    )

}

export default ResultsFood