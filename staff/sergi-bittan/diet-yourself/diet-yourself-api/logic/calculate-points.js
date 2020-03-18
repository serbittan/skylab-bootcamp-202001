


module.exports = (weight, height, age, gender, activity) => {
    // TODO apply the formula


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


    switch (age) {
        case (age >17 && age <= 26):
            points += 4;
            break;
        case ( age <= 37):
            points += 3;
            break;
        case (age <= 47):
            points += 2;
            break;
        case (age <= 58):
            points += 1;
            break;
        case (age > 58):
            points += 0;
            break;
    }


    switch (weight) {
        case (40 <= weight <= 45):
            points += 9;
            break;
        case (46 <= weight <= 49):
            points += 10;
            break;
        case (50 <= weight <= 54):
            points += 11;
            break;
        case (55 <= weight <= 59):
            points += 12;
            break;
        case (60 <= weight <= 63):
            points += 13;
            break;
        case (64 <= weight <= 67):
            points += 14;
            break;
        case (68 <= weight <= 72):
            points += 15;
            break;
        case (73 <= weight <= 76):
            points += 16;
            break;
        case (77 <= weight <= 81):
            points += 17;
            break;
        case (82 <= weight <= 85):
            points += 18;
            break;

    }




    if (height > 178) points += 2
    else points += 1

    if (gender === "male") points += 8
    else points += 2

    let totalPointsOfDay = points

    switch (method) {
        case "Mediterranea":// 50C-15P-35G
            totalPointsOfDay
        case "Low Carb": //15h-55P-30G
            totalPointsOfDay
        case "Keto": // 5H-25P-70G
            totalPointsOfDay
        case "Vegetariana"://!!! 
            totalPointsOfDay
        case "Día Dificil": //grasas y proteinas
            totalPointsOfDay
    }


    return 10
}