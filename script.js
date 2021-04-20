// --- Write the code for the Sweet Shop below! ---

const dessertsURL = "http://localhost:3000/desserts/"

const recURL = "http://localhost:3000/recommendations/"


//* Functions to run at start
getDesserts();
formsubmit();

//getRecommendations();


//TODO Functions we'll want to include

function getDesserts() {
    const button = document.querySelector("#dessert-button");

    button.addEventListener("click", ()=>{
        fetch(dessertsURL)
        .then(resp => resp.json())
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

    //dessertOption.id = dessert.id;
    //console.log(dessertOption.id)

    const name = document.getElementById("dessert-name");
    name.innerText = dessert.name;
    name.className = "dessert-name"
  
    const image = document.getElementById("dessert-img");
    image.className = "dessert-image";
    image.src = dessert.image;
  
    const cost = document.getElementById("dessert-cost");
    cost.className = "dessert-cost";
    cost.innerText = `Dessert cost: $${dessert.cost}`;

    const likeCount = document.querySelector("span.likes");
    likeCount.innerText = dessert.likes;
    likeCount.id = dessert.id;
    console.log(likeCount.id);

    const likeButton = document.getElementById("like-button");

    const dislikeButton = document.getElementById("dislike-button");
  
    function likeDessert() {
      likeButton.addEventListener("click", (event) => {


        // likeCount.innerText = parseInt(likeCount.innerText) + 1;
        dessert.likes = parseInt(dessert.likes) + 1;
        console.log(dessert.likes)

        const newLikes = {
          likes: dessert.likes 
        }
        
        const reqObj = {
          headers: {"Content-Type": "application/json"},
          method: "PATCH",
          body: JSON.stringify(newLikes)
        }
        //debugger;

        //console.log(dessertOption.id)

        fetch(dessertsURL+likeCount.id, reqObj)
        .then(resp => resp.json())
        .then((updatedDessert) => 
          likeCount.innerText = updatedDessert.likes)
      })

      dislikeButton.addEventListener("click", (event) => {
      
        dessert.likes = parseInt(dessert.likes) - 1;

        const removeLikes = {
          likes: dessert.likes 
        }
        
        const reqObjTwo = {
          headers: {"Content-Type": "application/json"},
          method: "PATCH",
          body: JSON.stringify(removeLikes)
        }
        fetch(dessertsURL+likeCount.id, reqObjTwo)
        .then(resp => resp.json())
        .then((updatedDessertDislikes) => 
          likeCount.innerText = updatedDessertDislikes.likes)
      })
      
    }

    likeDessert();
  })

}

function formsubmit (){
  const form = document.querySelector("#dessert-form")
  form.addEventListener("submit", (event)=>{
  event.preventDefault();
  // const dessertInput = document.querySelector("h3")
  //debugger;
  // dessertInput.innerText = event.target[o].value

    const newDessert ={
      name: event.target[0].value,
      flavor: event.target[1].value,
      comments: event.target[2].value
    }
    
    const newSubmit = {
      headers: {"Content-Type": "application/json"},
      method: "POST",
      body: JSON.stringify(newDessert)
    }
    event.target.reset();

    const ol = document.querySelector("ol");

    fetch(recURL, newSubmit)
        .then(resp => resp.json())
        //.then((newData) => console.log(newData))
        .then(recData => {
          const newDessertItem = document.createElement("li")
          newDessertItem.className = "rec-list-item"
          newDessertItem.innerText = recData.name
          console.log(newDessertItem);
      
          ol.appendChild(newDessertItem);
        })

    // const newDessertItem = document.createElement("li")
    // newDessertItem.className = "rec-list-item"
    // newDessertItem.innerText = newDessert.name
    // console.log(newDessertItem);

    // const ol = document.querySelector("ol")
    // ol.appendChild(newDessertItem);
  })
}

// function getRecommendations() {
//     fetch(recURL)
//       .then(resp => resp.json())
//       .then(data => data.forEach( () => {
//         const recItem = document.createElement("li")
//         recItem.className = "rec-test-item"
//         recItem.innerText = data.name
//         document.querySelector("ol").appendChild(recItem);
//       }))
// }


