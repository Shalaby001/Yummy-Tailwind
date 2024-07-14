let row = document.getElementById("rowMeal");
let rowSearch = document.getElementById("rowSearch");
let allCategories = [];
let allMeals = [];
let allArea = [];
let allMealsByArea = [];
let allIngredients = [];
let searchResults = [];
let rowMealDetail = document.getElementById("rowMealDetail");
let rowContact = document.getElementById("rowContact");


//////////////////////////////////  first Page  ///////////////////////////////////

window.addEventListener("load", function() {
  load()
});

function load() {
  $("body").css("overflow", "hidden"); 
  $(".loading").fadeIn(1200, function() {
    $(".loading").fadeOut(1200, function() {
      $("body").css("overflow", "visible"); 
    });
  });
}

NameSearch("")

//////////////////////////////////  Display Meals  ///////////////////////////////////

function displayMeals(meals) {
  rowContact.innerHTML = ""
  rowMealDetail.innerHTML = ""
  row.innerHTML = "";
  for (let i = 0; i < 20; i++) {
    row.innerHTML  += `
<div class="Meal inner">
        <div class="relative cursor-pointer" onclick="getMealDetails('${meals[i].idMeal}')">
            <div>
                <img src="${meals[i].strMealThumb}" class="w-full rounded-lg" alt="">
            </div>
            <div class="absolute layer  flex items-center  rounded-lg">
                <h3 class="ml-3 text-3xl fw-bold" id="${meals[i].strMeal}">${meals[i].strMeal}</h3>
            </div>
        </div>
    </div>

`;  
  }
  
}

//////////////////////////////////  Categories  ///////////////////////////////////

async function getCategories() {
  close()
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  let Categories = await response.json();
  allCategories = Categories.categories;
  displayCategories();
  load();
}

displayCategories()
function displayCategories() {
  rowContact.innerHTML = ""
  rowMealDetail.innerHTML = ""
  rowSearch.innerHTML = "";
  row.innerHTML  = "";
  for (let i = 0; i < allCategories.length; i++) {
    row.innerHTML += `
<div class="">
  <div class="inner cursor-pointer overflow-hidden relative" onclick="getMealsByCategory('${allCategories[i].strCategory}')">
    <div>
      <img src="${allCategories[i].strCategoryThumb}" class="w-full rounded bg-white" alt="">
    </div>
    <div class="layer rounded text-center">
      <h3 class="mt-2 text-3xl fw-bold" id="${allCategories[i].strCategory}">${allCategories[i].strCategory}</h3>
      <p class="text-lg mt-2">${allCategories[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
    </div>
  </div>
</div>
    `; 
  }
  
}

async function getMealsByCategory(category) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  let meals = await response.json();
  allMeals = meals.meals;
  load()
  displayMeals(allMeals);
}

//////////////////////////////////  Areas  ///////////////////////////////////

async function getArea() {
  load()
  rowSearch.innerHTML = "";
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  let Areas = await response.json();
  allArea = Areas.meals;
  displayArea();
}

function displayArea() {
  rowContact.innerHTML = ""
  rowMealDetail.innerHTML = ""
  close()
  row.innerHTML = "";
  for (let i = 0; i < allArea.length; i++) {
    row.innerHTML += `
<div class="">
    <div onclick="getAreaMeals('${allArea[i].strArea}')" class="text-30xl rounded-md text-center text-white cursor-pointer">
        <i class="fas fa-house-laptop text-6xl fw-bold""></i>
        <h3 class="mt-2 text-2xl fw-bold">${allArea[i].strArea}</h3>
    </div>
</div>
    `
  }
}

async function getAreaMeals(area) {
  row.innerHTML = '';
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  let meals = await response.json();
  allMealsByArea = meals.meals;
  load()
  displayMeals(allMealsByArea);
}

//////////////////////////////////  Ingredients  ///////////////////////////////////

async function getIngredients() {
  load()
  row.innerHTML
  row.innerHTML = '';
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  let Ingredients = await response.json();
  allIngredients = Ingredients.meals;
  displayIngredients();
  close()
}



function displayIngredients() {
  rowContact.innerHTML = ""
  rowMealDetail.innerHTML = ""
  rowSearch.innerHTML = "";
  row.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    row.innerHTML += `
    <div class="">
                <div onclick="getIngredientsMeals('${allIngredients[i].strIngredient}')" class="rounded-2 text-center cursor-pointer text-white">
                        <i class="fa-solid fa-drumstick-bite text-6xl fw-bold"></i>
                        <h3 class="mt-2 text-2xl fw-bold">${allIngredients[i].strIngredient}</h3>
                        <p>${allIngredients[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
    `
  }
}

async function getIngredientsMeals(ingredient) {
  row.innerHTML = '';
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  let meals = await response.json();
  allMealsByIngredients = meals.meals;
  load()
  displayMeals(allMealsByIngredients);
}

//////////////////////////////////  Meal Details  ///////////////////////////////////

async function getMealDetails(mealID) {
  load()
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  let meal = await response.json();
  mealDetails = meal.meals[0];
  displayMealDetails();
  close()
}

function displayMealDetails() {
  rowContact.innerHTML = "";
  row.innerHTML = "";
  let Cards = "";

  let allMealIngredients = [];

  for (let i = 1; i <= 20; i++) {
    if (mealDetails[`strIngredient${i}`]) {
      allMealIngredients.push({
        ingredient: mealDetails[`strIngredient${i}`],
        measure: mealDetails[`strMeasure${i}`],
      });
    }
  }

  Cards += `
    <div class="flex flex-col md:flex-row gap-4">
      <div class="md:w-1/3 w-full">
        <img class="w-full rounded-lg" src="${mealDetails.strMealThumb}" alt="${mealDetails.strMeal}" />
        <h1 class="mt-3 text-lg font-bold">${mealDetails.strMeal}</h1>
      </div>
      <div class="md:w-2/3 w-full">
        <h2 class="text-lg font-bold">Instructions</h2>
        <p>${mealDetails.strInstructions}</p>
        <h2><span class="font-bold">Area: </span>${mealDetails.strArea}</h2>
        <h2><span class="font-bold">Category: </span>${mealDetails.strCategory}</h2>
        <h3 class="font-bold mt-2">Ingredients:</h3>
        <ul class="list-none flex flex-wrap gap-3" id="ingredients-list">
  `;

  allMealIngredients.forEach((ingredient) => {
    Cards += `
      <li class="bg-blue-200 rounded-lg m-1 p-1">${ingredient.measure} ${ingredient.ingredient}</li>
    `;
  });

  Cards += `
      </ul>
  `;
  
  if (mealDetails.strTags) {
    const tagsArray = mealDetails.strTags.split(",").map(tag => tag.trim());
    
    Cards += `
      <div class="mt-4">
        <h3 class="text-lg font-bold">Tags</h3>
        <ul class="list-none flex gap-3">
    `;

    tagsArray.forEach((tag) => {
      Cards += `
        <li class="bg-blue-200 rounded-lg m-1 p-1">${tag}</li>
      `;
    });

    Cards += `
        </ul>
      </div>
    `;
  }
  
  Cards += `
      <div class="mt-4 space-x-2">
        <a target="_blank" href="${mealDetails.strSource}" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">Source</a>
        <a target="_blank" href="${mealDetails.strYoutube}" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">Youtube</a>
      </div>
    </div>
  </div>
  `;

  rowMealDetail.innerHTML = Cards;
}




//////////////////////////////////  Meal Search  ///////////////////////////////////

function displaySearch() {
  rowContact.innerHTML = ""
  row.innerHTML = ''
  rowMealDetail.innerHTML = ""
  load()
  close()
  row.innerHTML = ""
  rowSearch.innerHTML = `
  
<div class="w-full">
    <input onkeyup="NameSearch(this.value)" class="w-full bg-white border  text-black  border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500" type="text" placeholder="Search By Name">
</div>
<div class="w-full ">
    <input onkeyup="letterSearch(this.value)" class="w-full text-black bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500" maxlength="1" type="text" placeholder="Search By First Letter">
</div>

  `

 
}

async function NameSearch(mealName) {
  
  
  row.innerHTML = ""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
  let data = await response.json()
  let searchResults = data.meals
  displayMeals(searchResults)
}

async function letterSearch(letter) {
  load()
  row.innerHTML = ""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  let data = await response.json()
  let searchResults = data.meals
  displayMeals(searchResults)
}





//////////////////////////////////  Contact us  ///////////////////////////////////


function displayContacts() {
  rowSearch.innerHTML = ""
  rowMealDetail.innerHTML = ""
  row.innerHTML = ""
  load()
  close()
    rowContact.innerHTML = `
    
            <div class="container mx-auto sm:px-4 w-3/4 text-center">
                <div class="grid grid-rows-3 grid-flow-col gap-4">
                    <div class="pr-4 pl-4">
                        <input id="nameInput" onkeyup="nameValidation()" type="text" class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" placeholder="Enter Your Name">
                        <div id="nameAlert" class="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800 w-full mt-2 hidden">
                            Special characters and numbers not allowed
                        </div>
                    </div>
                    <div class="pr-4 pl-4">
                        <input id="emailInput" onkeyup="emailValidation()" type="email" class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" placeholder="Enter Your Email">
                        <div id="emailAlert" class="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800 w-full mt-2 hidden">
                            Email not valid (example@yyy.zzz)
                        </div>
                    </div>
                    <div class="pr-4 pl-4">
                        <input id="phoneInput" onkeyup="phoneValidation()" type="text" class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" placeholder="Enter Your Phone">
                        <div id="phoneAlert" class="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800 w-full mt-2 hidden">
                            Enter valid Phone Number
                        </div>
                    </div>
                    <div class="pr-4 pl-4">
                        <input id="ageInput" onkeyup="ageValidation()" type="number" class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" placeholder="Enter Your Age">
                        <div id="ageAlert" class="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800 w-full mt-2 hidden">
                            Enter valid age
                        </div>
                    </div>
                    <div class="pr-4 pl-4">
                        <input id="passwordInput" onkeyup="passValidation()" type="password" class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" placeholder="Enter Your Password">
                        <div id="passwordAlert" class="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800 w-full mt-2 hidden">
                            Enter valid password (Minimum eight characters, at least one letter and one number)
                        </div>
                    </div>
                    <div class="pr-4 pl-4">
                        <input id="repasswordInput" onkeyup="pass2Validation()" type="password" class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" placeholder="Re-enter Your Password">
                        <div id="repasswordAlert" class="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800 w-full mt-2 hidden">
                            Passwords do not match
                        </div>
                    </div>
                </div>
                <button id="submitBtn"  class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1  leading-normal no-underline text-red-600 border-red-600 hover:bg-white-600 hover:bg-red-700 cursor-pointer px-2 mt-3">Submit</button>
  
  
    `;
  }
  
  let inputTouched = {
    name: false,
    email: false,
    phone: false,
    age: false,
    password: false,
    repassword: false
  };
  
  
  function nameValidation() {
    var pattern = new RegExp(/^[a-zA-Z\s]+$/);
    if (!pattern.test(document.getElementById("nameInput").value)) {
      document.getElementById("nameAlert").classList.remove("d-none");
      return true;
    } else {
      document.getElementById("nameAlert").classList.add("d-none");
      return false;
    }
  }
  
  function emailValidation() {
    var pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (!pattern.test(document.getElementById("emailInput").value)) {
    document.getElementById("emailAlert").classList.remove("d-none");
    return true;
  } else {
    document.getElementById("emailAlert").classList.add("d-none");
    return false;
  }
}

function phoneValidation() {
  var pattern = new RegExp(/^01[0-2,5]{1}[0-9]{8}$/);
  if (!pattern.test(document.getElementById("phoneInput").value)) {
    document.getElementById("phoneAlert").classList.remove("d-none");
    return true;
  } else {
    document.getElementById("phoneAlert").classList.add("d-none");
    return false;
  }
}

function ageValidation() {
  var pattern = new RegExp(/^[0-9]+$/);
  if (!pattern.test(document.getElementById("ageInput").value)) {
    document.getElementById("ageAlert").classList.remove("d-none");
    return true;
  } else {
    document.getElementById("ageAlert").classList.add("d-none");
    return false;
  }
}

function passValidation() {
  var pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/);
  if (!pattern.test(document.getElementById("passwordInput").value)) {
    document.getElementById("passwordAlert").classList.remove("d-none");
    return true;
  } else {
    document.getElementById("passwordAlert").classList.add("d-none");
    return false;
  } 
}

function pass2Validation() {
  if (document.getElementById("passwordInput").value !== document.getElementById("repasswordInput").value) {
    document.getElementById("repasswordAlert").classList.remove("d-none");
    return true;
  } else {
    document.getElementById("repasswordAlert").classList.add("d-none");
    return false;
  }
}




//////////////////////////////////  SiteBar a  ///////////////////////////////////

document.getElementById("activeSearch").addEventListener("click", displaySearch );
document.getElementById("activeCategories").addEventListener("click", getCategories );
document.getElementById("activeArea").addEventListener("click", getArea ); 
document.getElementById("activeIngredients").addEventListener("click", getIngredients );
document.getElementById("activeContact").addEventListener("click", displayContacts);

//////////////////////////////////  SiteBar   ///////////////////////////////////

$(document).ready(function() {
  let leftWidth = $("#leftSide").innerWidth();
  $("#sideBar").css('left', -leftWidth);
  function openSideNav() {
    $("#sideBar").animate({ left: 0 }, 650);
    $(".Buttn").attr("class", "fas fa-xmark fs-2 Buttn click");
  }


  function closeSideNav() {
    $("#sideBar").animate({ left: -leftWidth }, 650);
    $(".Buttn").attr("class", "fas fa-align-justify fs-2 Buttn click");
  }


  closeSideNav();

 
  $("#rightSide .Buttn").on("click", function() {
    let offset = $("#sideBar").offset().left;
    if (offset === 0) {
      closeSideNav();
    } else {
      openSideNav();
    }
  });

});


function close() {
  $(".Buttn").attr("class", "fas fa-align-justify text-2xl cursor-pointer mt-2");
  let leftWidth = $("#leftSide").innerWidth();
  $("#sideBar").animate({ left: -leftWidth }, 500);
}


