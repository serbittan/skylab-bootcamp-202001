import { Fragment, useEffect, useState } from 'react'
import { useLocation, withRouter } from 'react-router-dom'
import { register } from '../../logic'
import React from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'

const registerData = {
    steps: [
        { // 0
            goal: ''
        },
        { // 1
            activityLevel: ''
        },
        { // 2
            genre: '',
            age: 0,
            city: ''
        },
        { // 3
            height: 0,
            weight: 0,
            finalWeight: 0
        },
        { // 4
            email: '',
            password: '',
            username: ''
        }
    ]
}

export default withRouter(function Register ({ history }) {


//const Register = () => {
    const [step, setStep] = useState(0);
    const { goal } = useLocation();
    const [ state, setState ] = useState()

    useEffect(() => {
        if (goal) {
            registerData.steps[0].goal = goal;
        }
    }, [])

    const handleGoNextStep = () => {
        switch (step) {
            case 0:
                registerData.steps[0].goal && setStep(1)
                break;
            case 1:
                registerData.steps[1].activityLevel && setStep(2)
                break;
            case 2:
                registerData.steps[2].genre && registerData.steps[2].age && registerData.steps[2].city && setStep(3)
                break;
            case 3:
                registerData.steps[3].height && registerData.steps[3].weight && registerData.steps[3].finalWeight && setStep(4)
                break;
            case 4:
                registerData.steps[4].email && registerData.steps[4].password && registerData.steps[4].username && setStep(5)
                break;
        }
    }

    const handleGoPrevStep = () => {
        (step > 0) && setStep(step - 1)
    }

    const handleSaveData = (step, data) => {
        switch (step) {
            case 0:
                registerData.steps[0].goal = data.goal;
                break;
            case 1:
                registerData.steps[1].activityLevel = data.activityLevel;
                break;
            case 2:
                data.genre && (registerData.steps[2].genre = data.genre)
                data.age && (registerData.steps[2].age = Number(data.age))
                data.city && (registerData.steps[2].city = data.city)
                break;
            case 3:
                data.height && (registerData.steps[3].height = Number(data.height))
                data.weight && (registerData.steps[3].weight = Number(data.weight))
                data.finalWeight && (registerData.steps[3].finalWeight = Number(data.finalWeight))
                break;
            case 4:
                data.email && (registerData.steps[4].email = data.email)
                data.password && (registerData.steps[4].password = data.password)
                data.username && (registerData.steps[4].username = data.username)
                break;
        }

        
        console.log(registerData);
    };
    
    async function handleRegister() {

        const { steps } = registerData
    
        const goal = steps[0].goal
        const activity = steps[1].activityLevel
        const gender = steps[2].genre
        const age = steps[2].age
        const city = steps[2].city
        const height = steps[3].height
        const weight = steps[3].weight
        const finalWeight = steps[3].finalWeight
        const email = steps[4].email
        const password = steps[4].password
        const username = steps[4].username

        try {
            await register(username, email, password, goal, activity, gender, age, height, weight, city, finalWeight)

            history.push('/login')
        } catch ({ message }) {
            setState({ error: message })
        }
    }

    return (
        <Fragment>
            <header class="header-activity">
                <h3>Activity Level</h3>
                {step > 0 && <button onClick={handleGoPrevStep}>Prev step <i class="fas fa-arrow-left"></i></button>}
                {step < 4 && <button onClick={handleGoNextStep}>Next step <i class="fas fa-arrow-right"></i></button>}
            </header>

            {step === 0 && <Step1 onSaveData={handleSaveData} data={registerData.steps[0]} />}
            {step === 1 && <Step2 onSaveData={handleSaveData} data={registerData.steps[1]} />}
            {step === 2 && <Step3 onSaveData={handleSaveData} data={registerData.steps[2]} />}
            {step === 3 && <Step4 onSaveData={handleSaveData} data={registerData.steps[3]} />}
            {step === 4 && <Step5 onSaveData={handleSaveData} data={registerData.steps[4]} onRegister={handleRegister}/>}
        </Fragment>
    )
})

//export default  Register