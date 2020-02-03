"use strict"

// props tiene 2 propiedades: data y onClick
function Item(props){

    var item = document.createElement("article");
    Component.call(this,item);
    item.classList.add("article");

    var name = document.createElement("h2");
    name.innerText = props.data.name;
    name.classList.add("article__tittle");

    item.append(name);

    var image = document.createElement("img");
    image.src = props.data.thumbnail;
    image.classList.add("article__photo");

    item.append(image);

    var price = document.createElement("span");
    price.innerText = props.data.price + " €";
    price.classList.add("article__price")

    item.append(price);

    image.addEventListener("click", function(event){
        event.preventDefault();
        props.onClick(props.data.id);
    });
    
}

Item.prototype = Object.create(Component.prototype);
Item.prototype.constructor = Item;



























// function Item (prop){
//     var item = document.createElement("article");
//     Component.call(this, item);

//     var list = document.createElement("ul");
//     list.classList.add("list")

//     var itemList = document.createElement("li");
//     var name = document.createElement("h3");
//     name.innerText = prop.name;

//     var image = document.createElement("figure");
    
//     var imagePhoto = document.createElement("img");
//     var price = document.createElement("span");

//     imagePhoto.src = prop.thumbnail;
//     price.innerText = prop.price + " €";
    
    
//     image.append(imagePhoto);

//     itemList.append(name, image, price);
//     list.append(itemList);
//     item.appendChild(list);

//     var id = prop.id;
//     image.addEventListener("click", function(event){
//         event.preventDefault();

//         retrieveVehicle(id, function(itemResult){
//             //console.log(itemResult);
//             var _detail = new Detail(itemResult);
//             var ul = document.querySelector("ul");

//             ul.replaceWith(_detail.container)
//         });
        


//     })

//     return itemList;

// }

// Item.prototype = Object.create(Component.prototype);
// Item.prototype.constructor = Item;