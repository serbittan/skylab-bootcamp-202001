import { Fragment, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import React from 'react'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Step4 from './step4'
import Step5 from './step5'

const registerData = {
    step1: {
        goal: ''
    },
    step2: {
        activityLevel: ''
    },
    step3: {
        genre: '',
        age: 0,
        city: ''
    },
    step4: {
        height: 0,
        weight: 0,
        finalWeight: 0
    },
    step5: {
        email: '',
        password: '',
        userName: ''
    }
}

const Register = () => {
    const [step, setStep] = useState(1);
    const { goal } = useLocation();

    useEffect(() => {
        if(goal) {
            registerData.step0.goal = goal;
        }

        console.log(registerData.step0);
    }, [])

    const handleGoNextStep = () => {
        // "step" del estado es el actual
        // TODO: setStep
    }

    const handleGoPrevStep = () => {
        // TODO: setStep
    }

    const handleChangeData = (step, data) => {
        switch (step) {
            case 'step1':
                registerData.step1.goal = data;

                setStep(2);
                break;
            case 'step2':
                registerData.step2.activityLevel = data;

                setStep(3);
                break;
            case 'step3':
                registerData.step3.genre = data
                registerData.step3.age = data
                registerData.step3.city = data

                setStep(4)
                break;
            case 'step4':
                registerData.step4.height = data
                registerData.step4.weight = data
                registerData.step4.finalWeight = data

                setStep(5)
                break;
            case 'step5':
                registerData.step5.email = data
                registerData.step5.password = data
                registerData.step5.userName = data

                setStep() //??
                break;
        }

        console.log(registerData);
    };
    
    return (
        <Fragment>
            <header>
                {step < 5 && <button onClick={handleGoNextStep}>Next step</button>}
                {step >=1 && <button onClick={handleGoPrevStep}>Prev step</button>}
            </header>

            
            {step === 1 && <Step1 onSaveData={handleChangeData} data={registerData.step1} />}
            {step === 2 && <Step2 onSaveData={handleChangeData} data={registerData.step2} />}
            {step === 3 && <Step3 onSaveData={handleChangeData} data={registerData.step3} />}
            {step === 4 && <Step4 onSaveData={handleChangeData} data={registerData.step4} />}
            {step === 5 && <Step5 onSaveData={handleChangeData} data={registerData.step5} />}
        </Fragment>
    )
}

export default Register