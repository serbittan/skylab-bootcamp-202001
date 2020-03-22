import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import React from 'react';
import Step1 from './step1';
import Step2 from './step2';

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
};

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
                // TODO
                break;
            case 'step4':
                // TODO
                break;
            case 'step5':
                // TODO
                break;
        };

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
        </Fragment>
    )
}

export default Register;