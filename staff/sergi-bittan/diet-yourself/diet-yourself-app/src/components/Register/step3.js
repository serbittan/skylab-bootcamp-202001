import React from 'react'
//import './step3.sass'

const Step3 = ({ onSaveData, data }) => {
    console.log(data)
    const { genre, age, city } = data

    return (
        <div>
            <div class="genre">
                <button type="button" className={`genre__m" ${genre === 'women' ? 'genre_selected' : ''}`} onClick={() => onSaveData('step3', { genre: 'women'})}>WOMEN</button>
                <button type="button" className={`genre__m" ${genre === 'men' ? 'genre_selected' : ''}`} onClick={() => onSaveData('step3', { genre: 'men'})}>MEN</button>
            </div>

            <form class="age-antrop" onSubmit={event => {
                event.preventDefault()

                const age = event.target.age.value
                const city = event.target.city.value

                //onStep4(age, city)  //???
            }}>
            <h4>Age</h4>
            <input type="text" class="age-antrop__age" name="age" placeholder="age"/>
            <h4>City</h4>
            <input type="text" class="age-antrop__city" name="city" placeholder="city"/>
            </form>
        </div>
    )
}

export default Step3