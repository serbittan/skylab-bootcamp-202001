import React from 'react'
import './Step3.sass'
import Feedback from '../Feedback'
import  Mujer from '../../images/001-wink.png'
import Hombre from '../../images/002-straight.png'

const Step3 = ({ onSaveData, data, error }) => {
    console.log(data)
    const { genre, age, city } = data

    return (
        <div className="step3">
            <div className="genre">
                <a href="#" className={`genre__m ${genre === 'women' ? 'genre_selected' : ''}`} onClick={() => onSaveData(2, { genre: 'female' })}><img className="genre__image" src={Mujer} alt="" /></a>
                <a href="#" className={`genre__m ${genre === 'men' ? 'genre_selected' : ''}`} onClick={() => onSaveData(2, { genre: 'male' })}><img className="genre__image" src={Hombre} alt="" /></a>
            </div>
           {error && <Feedback message={error} level={'error'}/>}
            <input type="text" autoComplete="off" className="genre__age" name="age" placeholder="age" autoFocus="autofocus" onBlur={event => onSaveData(2, { age: event.target.value})}/>
            <input type="text" autoComplete="off" className="genre__age" name="city" placeholder="city" onBlur={event => onSaveData(2, { city: event.target.value})}/>
            
            
        </div>
    )
}

export default Step3