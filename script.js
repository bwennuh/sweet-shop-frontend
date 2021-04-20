// --- Write the code for the Sweet Shop below! ---

const dessertsURL = "http://localhost:3000/desserts/"

const recURL = "http://localhost:3000/recommendations/"


//* Functions to run at start
getDesserts();

//TODO Functions we'll want to include

function getDesserts() {
  fetch(dessertsURL)
  .then(resp => resp.json())
  // .then(data => console.log(data))
  .then(data => data.forEach(renderDesserts))
}

// function sortDesserts() {
//   const cardBody = document.querySelector(".card-body");
//   const cardFooter = document.querySelector(".card-footer");

// }

function renderDesserts(dessert) {
  const name = document.getElementById("dessert-name");
  name.innerText = dessert.name;
  
  // console.log(dessert.name);

  const image = document.getElementById("dessert-img");
  image.src = dessert.image;

  // console.log(dessert.image);

  const cost = document.getElementById("dessert-cost");
  cost.innerText = `Dessert cost: $${dessert.cost}`;

  // const flavors;
}
