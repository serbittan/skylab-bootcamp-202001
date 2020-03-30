import React from "react"
import Popup from "reactjs-popup"
import Feedback from "./Feedback"
import './Popup-user.sass'


const PopupUser = ({ updateData, error }) => (
  <Popup trigger={<button>Profile</button>} position="left bottom">
    <form className="popup" onSubmit={event => {
        event.preventDefault()

        const username = event.target.username.value
        const age = event.target.age.value
        const weight = event.target.weight.value
        const height = event.target.height.value
        const goal = event.target.goal.value
        const activity = event.target.activity.value
        const city = event.target.city.value
        const finalWeight = event.target.finalWeight.value
        const password = event.target.password.value
        const oldPassword = event.target.oldPassword.value

        updateData({username, age, weight, height, goal , activity, city, finalWeight, password, oldPassword})

    }}>

        <input type="text" className="popup__input" name="username" placeholder="enter username" autoFocus="autofocus" />
        <input type="text" className="popup__input" name="age" placeholder="enter age" />
        <input type="text" className="popup__input" name="weight" placeholder="enter weight" />
        <input type="text" className="popup__input" name="height" placeholder="enter height" />
        <select name="goal">
          <option value="gain muscle mass">Gain muscle Mass</option> 
          <option value="maintain weight">Maintain Weight</option> 
          <option value="lose weight">Lose Weight</option>
        </select>
        <select name="activity">
          <option value="sedentary">Sedentary</option> 
          <option value="mild activity">Mild Activity</option> 
          <option value="moderate activity">Moderate Activity</option>
          <option value="heavy activity">Heavy Activity</option>
        </select>
        <input type="text" className="popup__input" name="city" placeholder="enter city" />
        <input type="text" className="popup__input" name="finalWeight" placeholder="enter finalWeight" />
        <input type="password" className="popup__input" name="password" placeholder="enter password" />
        <input type="password" className="popup__input" name="oldPassword" placeholder="enter old password" />
        <button type="submit" className="popup__bottom">Update</button>
        
    </form>
    {error && <Feedback message={error} level="error" />}
  </Popup>
)

export default PopupUser