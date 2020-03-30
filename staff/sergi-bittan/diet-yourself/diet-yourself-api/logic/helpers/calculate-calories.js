module.exports = (age, weight, height, genre, activity) => {
    let calories = 0
    let tmb = 0
    let act = 0

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

    calories = tmb * act

    return calories

}