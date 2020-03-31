module.exports = (goal, weight, height, age, gender, activity) => {
    // TODO apply the formula
let points = 0
let challenge = 0

    switch (goal) {
        case 'gain mucle mass':
            challenge = 15 / 100;
            break;
        case 'maintain weight':
            challenge = 0;
            break;
        case 'lose weight':
            challenge = (-15 / 100);
            break;
    }

    switch (activity) {
        case "sedentary":
            points += 0;
            break;
        case "mild activity":
            points += 1;
            break;
        case "moderate activity":
            points += 4;
            break;
        case "heavy activity":
            points += 6;
            break;
    }


    if (age >= 17 && age <= 26) {
        points += 4
    } else if (age >= 27 && age <= 37) {
        points += 3
    } else if (age >= 38 && age <= 47) {
        points += 2
    } else if (age >= 48 && age <= 58) {

    } else if (age > 58) {
        points += 0
    }



    if (weight >= 40 && weight <= 45) {
        points += 9
    } else if (weight >= 46 && weight <= 49) {
        points += 10
    } else if (weight >= 50 && weight <= 54) {
        points += 11
    } else if (weight >= 55 && weight <= 59) {
        points += 12
    } else if (weight >= 60 && weight <= 63) {
        points += 13
    } else if (weight >= 64 && weight <= 67) {
        points += 14
    } else if (weight >= 68 && weight <= 72) {
        points += 15
    } else if (weight >= 73 && weight <= 76) {
        points += 16
    } else if (weight >= 77 && weight <= 81) {
        points += 17
    } else if (weight >= 82 && weight <= 85) {
        points += 18
    }


    if (height > 178) points += 2
    else points += 1

    if (gender === "male") points += 8
    else points += 2

    let totalPointsOfDay = points + (points * challenge)


    return totalPointsOfDay


}



