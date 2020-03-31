module.exports = (goal, age, weight, height, genre, activity) => {
    let tmbAct = 0
    let tmb = 0
    let act = 0
    let challenge = 0

    switch (genre) {
        case 'male':
            tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            break;
        case 'female':
            tmb = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            break;
    }

    switch (activity) {
        case 'sedentary':
            act = 1.2 ;
            break;
        case 'mild activity':
            act = 1.37 ;
            break;
        case 'moderate activity':
            activity = 1.55 ;
            break;
        case 'heavy activity':
            act = 1.72 ;
            break;
    }

    switch (goal) {
        case 'gain mucle mass':
            challenge = 15 / 100;
            break;
        case 'maintain weight':
            challenge = 0
        case 'lose weight':
            challenge = (-15 / 100)
    }

    tmbAct = tmb * act
    calories = tmbAct + (tmbAct * challenge)

    return calories

}