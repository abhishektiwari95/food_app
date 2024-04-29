const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipeContainer");
const recipeDetailContent = document.querySelector(".recipe-detail-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

const fetchRecipe = async (quary) => {
  recipeContainer.innerHTML = "<h2>Loading recipe...</h2>";

  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${quary}`
  );
  const response = await data.json();

  recipeContainer.innerHTML = "";
  response.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <h3>${meal.strMeal}</h3>
    <p>${meal.strArea}</p>
     <p>${meal.strCategory}</p>
    `;
    const button = document.createElement("button");
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);
    // adding event-listener
    button.addEventListener("click", () => {
      openRecipePopup(meal);
    });

    recipeContainer.appendChild(recipeDiv);
  });
};
//fetch-Ingredient
const fetchIngredient = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};
const openRecipePopup = (meal) => {
  recipeDetailContent.innerHTML = `
 <h2 className="recipeName">${meal.strMeal}</h2>
 <h3 >Ingredients:</h3>
 <ul className="ingredientList">${fetchIngredient(meal)}</ul>
  
 <div>
  <h3>Instruction:</h3>
  <p className="recipeInstructions">${meal.strInstructions}</p>
 </div>`;
  recipeDetailContent.parentElement.style.display = "none";
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  fetchRecipe(searchInput);
  //console.log("buttons clicked");
});
