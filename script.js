// TODO --- Write the code for the Sweet Shop below! ---

//Local server URL for dessert data from backend db.json file
const dessertsURL = "http://localhost:3000/desserts/"

//Local server URL for dessert recommendations data from backend db.json file
const recURL = "http://localhost:3000/recommendations/"


//* Functions to run at start
getDesserts();
formsubmit();
getRecommendations();


// Get dessert data from backend db.json file
function getDesserts() {
    const button = document.querySelector("#dessert-button");

    button.addEventListener("click", ()=>{
        fetch(dessertsURL)
        .then(resp => resp.json())
        .then(data => data.forEach(renderDesserts))
    })
}

// Render dessert data in order to populate the associated HTML elements for the dessert div card
function renderDesserts(dessert) {

  // Make dessert option list
  const dessertList = document.getElementById("list-group");
  const dessertOption = document.createElement("li");
  dessertOption.className = "list-group-item";
  dessertOption.innerText = dessert.name;
  dessertList.appendChild(dessertOption);

  // Add click event to list options to then show the associated dessert data
  dessertOption.addEventListener("click", () => {

    // Grab + update dessert name element
    const name = document.getElementById("dessert-name");
    name.innerText = dessert.name;
    name.className = "dessert-name"
  
    // Grab + update dessert image element
    const image = document.getElementById("dessert-img");
    image.className = "dessert-image";
    image.src = dessert.image;
  
    // Grab + update dessert cost element
    const cost = document.getElementById("dessert-cost");
    cost.className = "dessert-cost";
    cost.innerText = `Dessert cost: $${dessert.cost}`;

    // Grab + update dessert likes element
    const likeCount = document.querySelector("span.likes");
    likeCount.innerText = dessert.likes;
    likeCount.id = dessert.id;
    console.log(likeCount.id);
    
    // Grab like button
    const likeButton = document.getElementById("like-button");

    // Grab dislike button
    const dislikeButton = document.getElementById("dislike-button");
  
    // Add likes to dessert like counter
    function likeDessert() {

      // Add click event on the like button to add 1 like each time it's clicked
      likeButton.addEventListener("click", (event) => {

        dessert.likes = parseInt(dessert.likes) + 1;
        console.log(dessert.likes)

        // Make a PATCH request to update like count for the associated dessert object
        const newLikes = {
          likes: dessert.likes 
        }
        
        const likeReqObj = {
          headers: {"Content-Type": "application/json"},
          method: "PATCH",
          body: JSON.stringify(newLikes)
        }

        fetch(dessertsURL+likeCount.id, likeReqObj)
          .then(resp => resp.json())
          .then((dessertLikes) => likeCount.innerText = dessertLikes.likes)
      })

      // Add click event on the dislike button to remove 1 like each time it's clicked
      dislikeButton.addEventListener("click", (event) => {
      
        dessert.likes = parseInt(dessert.likes) - 1;

        // Make a PATCH request to update like count for the associated dessert object
        const removeLikes = {
          likes: dessert.likes 
        }
        
        const dislikeReqObj = {
          headers: {"Content-Type": "application/json"},
          method: "PATCH",
          body: JSON.stringify(removeLikes)
        }
        
        fetch(dessertsURL+likeCount.id, dislikeReqObj)
          .then(resp => resp.json())
          .then((dessertDislikes) => likeCount.innerText = dessertDislikes.likes)
      })
    
    }
    // Invoke the like dessert function to initiate the like + dislike button click events
    likeDessert();
  })
}

// Create a submit event for the form input data (dessert name, flavor, and comments)
function formsubmit() {

  // Grab the form element
  const form = document.querySelector("#dessert-form")

  // Add a submit event listener to the form
  form.addEventListener("submit", (event) => {

    event.preventDefault();

    // Grab data from the form input fields and associate them to a new dessert recommendation object
    const newDessertRec ={
      name: event.target[0].value,
      flavor: event.target[1].value,
      comments: event.target[2].value
    }
    
    // Make a POST request to update the db.json file with each new recommendation object
    const newSubmit = {
      headers: {"Content-Type": "application/json"},
      method: "POST",
      body: JSON.stringify(newDessertRec)
    }

    event.target.reset();

    // Grab ordered list element to make recommendations list
    const ol = document.querySelector("ol");

    // Add new dessert recommendation name to recommendations list after POST request
    fetch(recURL, newSubmit)
      .then(resp => resp.json())
      .then(recData => {
        const newDessertItem = document.createElement("li")
        newDessertItem.className = "rec-list-item"
        newDessertItem.innerText = recData.name
      
        ol.appendChild(newDessertItem);
      })
  })
}

// Get dessert reommendations data from backend db.json file
function getRecommendations() {
    fetch(recURL)
      .then(resp => resp.json())
      .then(data => data.forEach(renderRecommendations))
}

// Render all dessert recommendation names and place into recommendations list
function renderRecommendations(data){
  const newDataName = document.createElement("li")
  newDataName.innerText = data.name
  document.querySelector("#rec-list").appendChild(newDataName)
}

