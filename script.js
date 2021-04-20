// --- Write the code for the Sweet Shop below! ---

const dessertsURL = "http://localhost:3000/desserts/"

const recURL = "http://localhost:3000/recommendations/"


//* Functions to run at start
getDesserts();

//TODO Functions we'll want to include

function getDesserts() {
    const button = document.querySelector("#dessert-button");

    button.addEventListener("click", ()=>{
        fetch(dessertsURL)
        .then(resp => resp.json())
        // .then(data => console.log(data))
        .then(data => data.forEach(renderDesserts))
    })
}

function renderDesserts(dessert) {
  // Make dessert list
  const dessertList = document.getElementById("list-group");
  const dessertOption = document.createElement("li");
  dessertOption.className = "list-group-item";
  dessertOption.innerText = dessert.name;
  dessertList.appendChild(dessertOption);

  dessertOption.addEventListener("click", () => {
    const name = document.getElementById("dessert-name");
    // const name = document.createElement("h3");
    name.innerText = dessert.name;
    name.className = "dessert-name"
    // dessertOption.appendChild(name);
  
    console.log(name);
    console.log(name.innerText);
  
    const image = document.getElementById("dessert-img");
    // const image = document.createElement("image");
    image.className = "dessert-image";
    image.src = dessert.image;
    // dessertOption.appendChild(image);
  
    const cost = document.getElementById("dessert-cost");
    // const cost = documennt.createElement("p");
    cost.className = "dessert-cost";
    cost.innerText = `Dessert cost: $${dessert.cost}`;
  })


  // function likeDessert() {
  //   likeButton.addEventListener("click", (event) => {
  //     const likeCount = document.getElementById("like-counter");
  
  //     likeCount.innerText = parseInt(likeCount.innerText) + 1;
  
  //   })
  // }



}


