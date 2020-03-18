
module.exports = (goal, activity, gender, age, height, weight, method) => {

    let points = 0

    var foods = [

        { "description": "Cacahuete crudo", "quantity": "20gr", "points": 3 },
        { "description": "Aceite oliva virgen extra", "quantity": "12gr", "points": 3 },
        { "description": "Mantequilla", "quantity": "15gr", "points": 3 },
        { "description": "Aguacate", "quantity": "125gr", "points": 5 },
        { "description": "Almendras crudas", "quantity": "14gr", "points": 2 },
        { "description": "Anacardo crudo", "quantity": "30gr", "points": 5 },
        { "description": "Pipas Calabaza peladas", "quantity": "20gr", "points": 3 },
        { "description": "Pipas Girasol peladas", "quantity": "20gr", "points": 3 },
        { "description": "Avellanas crudas", "quantity": "14gr", "points": 3 },
        { "description": "Kéfir", "quantity": "100gr", "points": 2 },

        { "description": "Bistec Ternera", "quantity": "100gr", "points": 4 },
        { "description": "Carne Magra", "quantity": "100gr", "points": 3 },
        { "description": "Entrecot", "quantity": "190gr", "points": 10 },
        { "description": "Redindo Ternera", "quantity": "100gr", "points": 3 },
        { "description": "Solomillo Ternera", "quantity": "100gr", "points": 4 },
        { "description": "Butifarra Cerdo", "quantity": "75gr", "points": 5 },
        { "description": "Carne Picada Cerdo", "quantity": "100gr", "points": 7 },
        { "description": "Chuleta", "quantity": "100gr", "points": 6 },
        { "description": "Lomo Cerdo", "quantity": "100gr", "points": 4 },
        { "description": "Solomillo Cerdo", "quantity": "100gr", "points": 3 },
        { "description": "Paletilla Cerdo", "quantity": "100gr", "points": 8 },
        { "description": "Conejo", "quantity": "100gr", "points": 4 },
        { "description": "Cordero", "quantity": "100gr", "points": 6 },
        { "description": "Costillas Cordero", "quantity": "100gr", "points": 8 },
        { "description": "Hamburguesa de Ternera", "quantity": "100gr", "points": 5 },
        { "description": "Rosbif", "quantity": "100gr", "points": 3 },
        { "description": "Pavo sin piel", "quantity": "100gr", "points": 3 },
        { "description": "Pollo pechuga sin piel", "quantity": "100gr", "points": 3 },
        { "description": "Pollo muslo sin piel", "quantity": "100gr", "points": 3 },
        { "description": "Hamburguesas de pollo", "quantity": "100gr", "points": 5 },
        { "description": "Salchicha de pollo", "quantity": "40gr", "points": 2 },
        { "description": "Huevo de Gallina mediano", "quantity": "1", "points": 2 },
        { "description": "Clara de Huevo", "quantity": "100gr", "points": 1 },
        { "description": "Huevo de Pato", "quantity": "1", "points": 3 },
        { "description": "Pechuga Pavo Cocido", "quantity": "50gr", "points": 1 },
        { "description": "Lomo Embuchado", "quantity": "30gr", "points": 3 },
        { "description": "Jamon Serrano", "quantity": "50gr", "points": 5 },
        { "description": "Queso Cottage 20% MG", "quantity": "30gr", "points": 1 },
        { "description": "Queso Fresco de Burgos 0% MG", "quantity": "50gr", "points": 1 },
        { "description": "Queso Gouda", "quantity": "30gr", "points": 3 },
        { "description": "Queso de Cabra curado", "quantity": "30gr", "points": 4 },
        { "description": "Leche Entera", "quantity": "100ml", "points": 2 },
        { "description": "Yogurt Entero Natural", "quantity": "125gr", "points": 2 },
        { "description": "Yogurt Griego", "quantity": "125gr", "points": 5 },

        { "description": "Alubias en Conserva", "quantity": "120gr", "points": 3 },
        { "description": "Garbanzos Hervidos", "quantity": "120gr", "points": 3 },
        { "description": "Guisantes Hervidos", "quantity": "120gr", "points": 2 },
        { "description": "Lentejas Hervidas", "quantity": "120gr", "points": 3 },
        { "description": "Maíz en conserva", "quantity": "40gr", "points": 1 },
        { "description": "Biscottes", "quantity": "30gr", "points": 3 },
        { "description": "Pan Blanco Barra sin Sal", "quantity": "50gr", "points": 3 },
        { "description": "Pan Blanco de Molde", "quantity": "30gr", "points": 2 },
        { "description": "Pan de centeno", "quantity": "50gr", "points": 2 },
        { "description": "Pan Chapata", "quantity": "50gr", "points": 3 },
        { "description": "Pan Integral", "quantity": "50gr", "points": 3 },
        { "description": "Pasta Hervida", "quantity": "100gr", "points": 3 },
        { "description": "Pasta Integral Hervida", "quantity": "150gr", "points": 5 },
        { "descripttion": "Fideos Chinos de Arroz", "quantity": "30gr", "points": 3 },
        { "description": "Arroz Blanco Hervido", "quantity": "120gr", "points": 4 },
        { "description": "Arroz Integral Hervido", "quantity": "120gr", "points": 4 },
        { "description": "Quinoa Hervida", "quantity": "120gr", "points": 4 },
        { "description": "Sémola de Trigo Hervido", "quantity": "120gr", "points": 4 },
        { "description": "Boniato Hervido", "quantity": "150gr", "points": 4 },
        { "description": "Patata Hervida", "quantity": "150gr", "points": 4 },
        { "description": "Patata al Horno", "quantity": "150gr", "points": 4 },

        { "description": "Manzana", "quantity": "1", "points": 0 },
        { "description": "Naranja", "quantity": "1", "points": 0 },
        { "description": "Pera", "quantity": "1", "points": 0 },
        { "description": "Piña Natural", "quantity": "100", "points": 2 },
        { "description": "Plátano", "quantity": "1", "points": 0 },
        { "description": "Pómelo", "quantity": "1", "points": 0 },
        { "description": "Sandía", "quantity": "1", "points": 0 },
        { "description": "Uva Blanca", "quantity": "1", "points": 0 },
        { "description": "Uva Negra", "quantity": "1", "points": 0 },
        { "description": "Melocotón", "quantity": "1", "points": 0 },
        { "description": "Kiwi", "quantity": "1", "points": 0 },
        { "description": "Melón", "quantity": "1", "points": 0 },

        { "description": "Acelgas", "quantity": "100gr", "points": 0 },
        { "description": "Alcachofas", "quantity": "100gr", "points": 0 },
        { "description": "Brócoli", "quantity": "100gr", "points": 0 },
        { "description": "Espinacas", "quantity": "100gr", "points": 0 },
        { "description": "Soja en conserva", "quantity": "100gr", "points": 0 },
        { "description": "Algas Frescas", "quantity": "50gr", "points": 0 },
        { "description": "Calabacín", "quantity": "100gr", "points": 0 },
        { "description": "Espárragos", "quantity": "100gr", "points": 0 },
        { "description": "Coliflor", "quantity": "100gr", "points": 0 },
        { "description": "Champiñones", "quantity": "100gr", "points": 0 },
        { "description": "Judías Verdes", "quantity": "100gr", "points": 0 },
        { "description": "Lechuga", "quantity": "100gr", "points": 0 },
        { "description": "Pepino", "quantity": "100gr", "points": 0 },
        { "description": "Pimiento verde o rojo", "quantity": "100gr", "points": 0 },
        { "description": "Tomates", "quantity": "100gr", "points": 0 },
        { "description": "Zanahorias", "quantity": "100gr", "points": 0 },
        { "description": "Cebolla", "quantity": "50gr", "points": 0 },
        { "description": "Rúcula", "quantity": "100gr", "points": 0 },
        { "description": "Puerro", "quantity": "100gr", "points": 0 },

    ]


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
        case (17 <= age <= 26):
            points += 4;
            break;
        case (27 <= age <= 37):
            points += 3;
            break;
        case (38 <= age <= 47):
            points += 2;
            break;
        case (48 <= age <= 58):
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



    // TODO  LOGIC return randomFood
}
let protPointsTotalNeeded = 8

let protPointsCurrent = 0

while (protPointsCurrent < protPointsTotalNeeded) {
    randomIndex = Math.floor(Math.random() * proteinas.length)

    proteinas[randomIndex] =  obj.points 
    protPointsCurrent += obj.points


}

var foods = {

    proteinas: [
        { "description": "Aceite oliva virgen extra", "quantity": "12gr", "points": 3 },
        { "description": "Mantequilla", "quantity": "15gr", "points": 3 },
        { "description": "Aguacate", "quantity": "125gr", "points": 5 }
    ],
    hidratos: [
        { "description": "Aceite oliva virgen extra", "quantity": "12gr", "points": 3 },
        { "description": "Mantequilla", "quantity": "15gr", "points": 3 },
        { "description": "Aguacate", "quantity": "125gr", "points": 5 }
    ],
    grasas: [
        { "description": "Aceite oliva virgen extra", "quantity": "12gr", "points": 3 },
        { "description": "Mantequilla", "quantity": "15gr", "points": 3 },
        { "description": "Aguacate", "quantity": "125gr", "points": 5 }
    ],
    frutas: [
        { "description": "Aceite oliva virgen extra", "quantity": "12gr", "points": 3 },
        { "description": "Mantequilla", "quantity": "15gr", "points": 3 },
        { "description": "Aguacate", "quantity": "125gr", "points": 5 }
    ],
    verduras: [
        { "description": "Aceite oliva virgen extra", "quantity": "12gr", "points": 3 },
        { "description": "Mantequilla", "quantity": "15gr", "points": 3 },
        { "description": "Aguacate", "quantity": "125gr", "points": 5 }
    ]

}


