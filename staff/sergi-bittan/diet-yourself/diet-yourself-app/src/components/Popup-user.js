import React from "react"
import Popup from "reactjs-popup"
import Feedback from "./Feedback"

const PopupUser = ({ goToProfile, error }) => (
  <Popup trigger={<button> Trigger</button>} position="right center">
    <form className="popup" onClick={event => {
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

        goToProfile(username, age, weight, height, goal , activity, city, finalWeight, password, oldPassword)

    }}>Popup content here !!

        <input type="text" className="popup_input" name="username" placeholder="enter username" autoFocus="autofocus" />
        <input type="text" className="popup_input" name="age" placeholder="enter age" />
        <input type="text" className="popup_input" name="weight" placeholder="enter weight" />
        <input type="text" className="popup_input" name="height" placeholder="enter height" />
        <input type="text" className="popup_input" name="goal" placeholder="enter goal" />
        <input type="text" className="popup_input" name="activity" placeholder="enter activity" />
        <input type="text" className="popup_input" name="city" placeholder="enter city" />
        <input type="text" className="popup_input" name="finalWeight" placeholder="enter finalWeight" />
        <input type="password" className="popup_input" name="password" placeholder="enter password" />
        <input type="password" className="popup_input" name="old password" placeholder="enter old password" />
        <button type="button" className="popup_input">Update</button>
        
    </form>
    {error && <Feedback message={error} level="error" />}
  </Popup>
)

export default PopupUser