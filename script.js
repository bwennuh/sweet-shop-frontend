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

function renderDesserts(dessert) {
  


}
