
const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
const inputField = document.getElementById("input-field");
const searchButton = document.getElementById("search-btn");
const detailsArea = document.getElementById("details-area");
const displayArea = document.getElementById("display");

searchButton.addEventListener("click", () => {
    searchFoodByName(inputField.value);
})

// search part
const searchFoodByName = keydata => {
    if (keydata != "") {
        loader(displayArea, true);
        let url = `${baseUrl}search.php?s=${keydata}`;
        fetch(encodeURI(url))
            .then(res => res.json())
            .then(data => {
                loader(displayArea, false);
                displayFood(data);
            });
    }
}

const loader = (parent, argument) => {
    argument ? parent.innerHTML = `<div class="loader"></div>` : "";
}

const displayFood = data => {
    if (data.meals === null) {
        foodNotFound();
    } else {
        displayArea.innerHTML = foodFound(data)
    }
}

const foodNotFound = () => {
    displayArea.innerHTML = `<h1 class ="warning">Please enter valid food name.</h1>`;
}

const foodFound = data => {
    let meals = data.meals;
    let foodElements = "";
    meals.forEach(data => {
        foodElements = foodElements + `<div class="food-items" onclick="showFoodDetails(${data.idMeal})">
                <div class="thumbnail">
                    <img src="${data.strMealThumb}"/>
                </div>
                <div class="food-name">
                    <h3>${data.strMeal}</h3>
                </div>
            </div>`;
    });
    return foodElements;
}

// details part
const showFoodDetails = id => {
    let url = `${baseUrl}lookup.php?i=${id}`;
    fetch(encodeURI(url))
        .then(res => res.json())
        .then(data => {
            let item = data.meals[0];
            let items = "";
            for (let i = 1; i <= 6; i++) {
                items = items + `<li><i class="material-icons">check_box</i> ${item["strIngredient" + i]}</li>`;
            }
            detailsArea.innerHTML = `<section id="detail">
            <div class="detail-content">
                <div class="detail-body">
                  <div class="food-details">
                    <button id="detail-btn" onclick="hideDetails()">X</button>
                    <img src="${item.strMealThumb}" />
                    <div class="details">
                      <h1>${item.strMeal}</h1>
                      <h4>Ingredients</h4>
                      <ul>${items}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>`;
        });
}

const hideDetails = () => {
    detailsArea.innerHTML = "";
}

