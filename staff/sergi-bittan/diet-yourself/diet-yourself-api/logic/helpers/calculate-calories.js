module.exports = (goal, weight, height, age, gender, activity) => {
    let tmbAct = 0
    let tmb = 0
    let act = 0
    let challenge = 0

    switch (gender) {
        case 'male':
            tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            break;
        case 'female':
            tmb = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            break;
    }//male, 21años, 180h, 84w   2075

    switch (activity) {
        case 'sedentary':
            act = 1.2 ;
            break;
        case 'mild activity':
            act = 1.37 ;
            break;
        case 'moderate activity':
            act = 1.55 ;
            break;
        case 'heavy activity':
            act = 1.72 ;
            break;
    }

    switch (goal) {
        case 'gain muscle mass':
            challenge = 1.25;
            break;
        case 'maintain weight':
            challenge = 1
        case 'lose weight':
            challenge = 0.75
    }

    tmbAct = tmb * act
    calories = tmbAct * challenge

    return calories

}