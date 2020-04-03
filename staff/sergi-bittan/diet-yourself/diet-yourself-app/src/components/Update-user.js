import React from 'react'
import Feedback from './Feedback'
import './Update-user.sass'

const UpdateUser = ({ dataUser, error }) => {
    return (
        <form className="update" onSubmit={event => {
            event.preventDefault()

            const username = event.target.username.value
            const age = parseFloat(event.target.age.value)
            const weight = parseFloat(event.target.weight.value)
            const height = parseFloat(event.target.height.value)
            const goal = event.target.goal.value
            const activity = event.target.activity.value
            const city = event.target.city.value
            const finalWeight = parseFloat(event.target.finalWeight.value)
            const password = event.target.password.value
            const oldPassword = event.target.oldPassword.value

            const newUser = { username, age, weight, height, goal, activity, city, finalWeight, password, oldPassword }

            dataUser(newUser)
        }}>
            <div className="update__goal"> 
               <p className="goal__p">Select goal:</p>
                <select className="goal__s" name="goal">
                    <option value="gain muscle mass">Gain muscle Mass</option>
                    <option value="maintain weight">Maintain Weight</option>
                    <option value="lose weight">Lose Weight</option>
                </select>
                
            </div>
            <div className="update__act">
                <p className="act__a">Select activity:</p>
            
                <select className="act__sa" name="activity">
                    <option value="sedentary">Sedentary</option>
                    <option value="mild activity">Mild Activity</option>
                    <option value="moderate activity">Moderate Activity</option>
                    <option value="heavy activity">Heavy Activity</option>
                </select>
            </div>

            <input type="text" className="update__input" autoComplete="off" name="username" placeholder="enter username" autoFocus="autofocus" />
            <input type="text" className="update__input" autoComplete="off"  name="age" placeholder="enter age" />
            <input type="text" className="update__input" autoComplete="off" name="weight" placeholder="enter weight" />
            <input type="text" className="update__input" autoComplete="off" name="height" placeholder="enter height" />
            <input type="text" className="update__input" autoComplete="off" name="city" placeholder="enter city" />
            <input type="text" className="update__input" autoComplete="off" name="finalWeight" placeholder="enter finalWeight" />
            <input type="password" className="update__input" autoComplete="off" name="password" placeholder="enter password" />
            <input type="password" className="update__input" autoComplete="off" name="oldPassword" placeholder="enter old password" />
            <button type="submit" className="update__bottom">Update</button>

            {error && <Feedback message={error} level="error" />}

        </form>
    )

}

export default UpdateUser