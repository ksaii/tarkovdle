function filterList() {
  let input = document.getElementById("searchBox");
  let filter = input.value.toLowerCase();
  let ul = document.getElementById("weaponList");
  let li = ul.getElementsByTagName("li");

  // Show the list if there's input
  ul.style.display = filter ? "block" : "none";

  for (let i = 0; i < li.length; i++) {
    let text = li[i].textContent || li[i].innerText;
    if (text.toLowerCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}


document.getElementById("reset").addEventListener("click",function (event) {
  clearAll=true;
  handleBeforeUnload();
})
var clearAll = false;

// Optionally, add event listener to close the dropdown when clicking outside
document.addEventListener("click", function (event) {
  let ul = document.getElementById("weaponList");
  let input = document.getElementById("searchBox");
  if (!input.contains(event.target) && !ul.contains(event.target)) {
    ul.style.display = "none";
  }
});

document.getElementById("submitGuess").addEventListener("click", handleSubmit);

document.getElementById("searchBox").addEventListener("keydown", function(event){
  if(event.key === "Enter"){
    handleSubmit();
    console.log("entered");
  }
})

let verifiedWeapon = [];

// Function to handle submitting a guess
function handleSubmit() {
  let guess = document.getElementById("searchBox").value.toUpperCase();
  if (!checkWeaponReal(guess)) {
    console.log("Not a real weapon:", guess);
    document.getElementById("result").innerText = "";
    clearInput();
  } else {
    fetch(`http://localhost:3000/api/validate-guess?guess=${guess}`)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("result").innerText = data.message;
        firstGuess = false;
        verifiedWeapon = data.filteredGuess;
        console.log("VArray:", verifiedWeapon);
        compareHints();
        removeWeaponFromDropdown(guess);
        correctPop(data.correct);
        clearInput();
        guessCountAdd();

        if (guessCount > 3) {
          revealHintOne();
        }

        // Save game state
        saveState();
      })
      .catch((error) => console.error("Error validating guess:", error));
  }
}


// Array of weapon objects
let weapons = [];


document.addEventListener("DOMContentLoaded", () => {
  
  loadState();
  loadWeapons();

  fetch("http://localhost:3000/api/weapon-data")
    .then((response) => response.json())
    .then((data) => {
      if (weapons.length === 0) {
        weapons = data;
        saveWeapons();
      }
      
      
      populateDropdown();
    })
    .catch((error) => console.error("Error fetching weapon names:", error));
  
});


function loadWeapons() {
  const storedWeapons = localStorage.getItem('weapons');
  if (storedWeapons) {
    weapons = JSON.parse(storedWeapons);
  }
}

function saveWeapons() {
  localStorage.setItem('weapons', JSON.stringify(weapons));
}

function populateDropdown() {
  const ul = document.getElementById("weaponList");
  ul.innerHTML = ""; // Clear existing list items

  weapons.forEach((weapon) => {
    const li = document.createElement("li");
    const img = document.createElement("img");

    img.src = weapon.image;
    img.alt = "Weapon image";

    const text = document.createTextNode(weapon.name);

    li.appendChild(img);
    li.appendChild(text);

    ul.appendChild(li);

    // Add click event listener to each list item
    li.addEventListener("click", function () {
      document.getElementById("searchBox").value = weapon.name;
      ul.style.display = "none";
      handleSubmit();
    });

    console.log("Weapon Array Contents: ", weapon);
  });
}


let correctWeapon = [];

fetch("http://localhost:3000/api/daily-weapon")
  .then((response) => response.json())
  .then((data) => {
    correctWeapon = data;

    const hintsDiv = document.getElementById("hints");
    hintsDiv.innerHTML = `
    <p>Ammo Types: ${data.ammo_type}</p>
    <p>Price Range: ${data.price_range}</p>
    <p>Barter Level: ${data.barter_level}</p>
    <p>Type: ${data.type}</p>
    <p>Firing Modes: ${data.firing_modes}</p>
  `;
  })
  .catch((error) => console.error("Error fetching daily weapon:", error));

function compareHints() {
  const ul = document.getElementById("hintList");

  const li = document.createElement("li");
  const img = document.createElement("img");
  const subli = document.createElement("div");

  const hintDetailContainer = document.querySelector('.hintDetailContainer');


  img.src = verifiedWeapon.image;
  img.alt = "Weapon img";
  subli.appendChild(img);
  

  const details = document.createElement("div");

  // Compare hints
  if (correctWeapon.ammo_type !== verifiedWeapon.ammo_type) {
    const ammoType = document.createElement("div");
    ammoType.textContent = `${verifiedWeapon.ammo_type}`;
    ammoType.style.backgroundColor = "red";
    details.appendChild(ammoType);
  } else {
    const ammoType = document.createElement("div");
    ammoType.textContent = `${correctWeapon.ammo_type}`;
    ammoType.style.backgroundColor = "green";
    details.appendChild(ammoType);
  }

  if (correctWeapon.price_range !== verifiedWeapon.price_range) {
    if(correctWeapon.price_range > verifiedWeapon.price_range){
    const priceRange = document.createElement("div");
    priceRange.textContent = `${verifiedWeapon.price_range}`;
    priceRange.style.backgroundColor = "red";
    details.appendChild(priceRange);
    }else{
    const priceRange = document.createElement("div");
    priceRange.textContent = `${verifiedWeapon.price_range}`;
    priceRange.style.backgroundColor = "red";
    details.appendChild(priceRange);
    }
  } else {
    const priceRange = document.createElement("div");
    priceRange.textContent = `${correctWeapon.price_range}`;
    priceRange.style.backgroundColor = "green";
    details.appendChild(priceRange);
  }

  if (correctWeapon.type !== verifiedWeapon.type) {
    const type = document.createElement("div");
    type.textContent = `${verifiedWeapon.type}`;
    type.style.backgroundColor = "red";
    details.appendChild(type);
  } else {
    const type = document.createElement("div");
    type.textContent = `${correctWeapon.type}`;
    type.style.backgroundColor = "green";
    details.appendChild(type);
  }

  if (correctWeapon.fire_rate !== verifiedWeapon.fire_rate) {
    const frate = document.createElement("div");
    frate.textContent = `${verifiedWeapon.fire_rate}`;
    frate.style.backgroundColor = "red";
    details.appendChild(frate);
  } else {
    const frate = document.createElement("div");
    frate.textContent = `${correctWeapon.fire_rate}`;
    frate.style.backgroundColor = "green";
    details.appendChild(frate);
  }

  

  if (!arraysEqual(correctWeapon.firing_modes, verifiedWeapon.firing_modes)) {
    const fmodes = document.createElement("div");
    fmodes.textContent = `${verifiedWeapon.firing_modes.join(
      ", "
    )}`;
    fmodes.style.backgroundColor = "red";
    details.appendChild(fmodes);
  } else {
    const fmodes = document.createElement("div");
    fmodes.textContent = `${correctWeapon.firing_modes.join(
      ", "
    )}`;
    fmodes.style.backgroundColor = "green";
    details.appendChild(fmodes);
  }
  console.log("CorWeapon Frate ",correctWeapon.fire_rate);
  console.log("Vweapon Frate ",verifiedWeapon.fire_rate);



  // Add more comparisons for other details as needed

  subli.appendChild(details);

  li.appendChild(subli);

  guessesArray.push({
    imgSrc: verifiedWeapon.image,
    detailsHTML: details.innerHTML
  });

  ul.appendChild(li);
  saveState();

    // Trigger the transition
    setTimeout(() => {
      li.classList.add('visible'); 
      hintDetailContainer.classList.add('visible');
    }, 100);
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function removeWeaponFromDropdown(weaponName) {
  const ul = document.getElementById("weaponList");
  const li = ul.getElementsByTagName("li");

  console.log("Removing ", weaponName, "from Dropdown");
  
  for (let i = 0; i < li.length; i++) {
    if ((li[i].textContent.toUpperCase()).includes(weaponName)) {
      ul.removeChild(li[i]);
      // Remove the weapon from the weapons array
      weapons = weapons.filter(weapon => weapon.name !== weaponName);
      saveWeapons(); // Save the updated weapons array to localStorage
      console.log("Array after removal: ", weapons);
      break;
    }
  }
}


function checkWeaponReal(weaponName) {
  console.log("checking weapon valid");
  const ul = document.getElementById("weaponList");
  const li = ul.getElementsByTagName("li");

  for (let i = 0; i < li.length; i++) {
    console.log("li text content is: ", li[i]);
    if (li[i].textContent.trim().toUpperCase()===(weaponName.toUpperCase())) {
      console.log("weapon valid return true");
      return true;
      break;
    }
  }
  console.log("weapon valid return false");
  return false;
}

let savedBool = false;

function correctPop(win) {
  if (win) {
    savedBool = true;
    document.getElementById("popup").innerText = "You finished";
    document.getElementById("result").innerText = "Correct! You guessed the daily weapon.";
    setTimeout(() =>{
      document.getElementById("winHolder").scrollIntoView({behavior: 'smooth'});
    },100);
    
    updateCountdown();  
    numWinners();
    saveState();
  }
}

function clearInput() {
  var clearBox = document.getElementById("searchBox");
  clearBox.value = "";
}

document
  .getElementById("audioListenButton")
  .addEventListener("click", function () {
    const newAudioPath = correctWeapon.sound;

    const audioElement = document.getElementById("audioIn");

    audioElement.src = newAudioPath;
    
    audioElement.load();
  });

function revealHintOne() {
  let aButton = document.getElementById("showOne");

  aButton.style.display = "block";
}

  let hintShow = true;

document.getElementById("showOne").addEventListener("click", function(){
  let audioHint = document.getElementById("audioHint");
  if(hintShow===true){
  audioHint.style.display = "block";
  hintShow = false;
  }else{
    audioHint.style.display = "none";
    hintShow = true;
  }
})

let guessCount = 0;

function guessCountAdd() {
  guessCount++;

  console.log("GC:", guessCount);
  localStorage.setItem('guessCount', guessCount);



}



function updateCountdown() {
  const now = new Date();
  const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  
  const timeDifference = nextDay - now;

  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  document.getElementById('countdown').innerHTML =
      ('0' + hours).slice(-2) + ':' +
      ('0' + minutes).slice(-2) + ':' +
      ('0' + seconds).slice(-2);

  setTimeout(updateCountdown, 1000);
}

let firstGuess = true;

function saveState() {
  const state = {
    guessCount: guessCount,
    verifiedWeapon: verifiedWeapon,
    correctWeapon: correctWeapon,
    guesses: guessesArray,
    stateBool: savedBool,
    firstG: firstGuess
  };
  localStorage.setItem('pageState', JSON.stringify(state));
}


let guessesArray = [];




function loadState() {
  const state = localStorage.getItem('pageState');
  const hintDetailContainer = document.querySelector('.hintDetailContainer');
  if (state) {
  
    const parsedState = JSON.parse(state);
    firstGuess = parsedState.firstG;
    if(!firstGuess){
      hintDetailContainer.classList.add('visible');
    }
    savedBool = parsedState.stateBool;
    correctPop(savedBool);
    guessCount = parsedState.guessCount;
    verifiedWeapon = parsedState.verifiedWeapon;
    correctWeapon = parsedState.correctWeapon;
    guessesArray = parsedState.guesses;

    const hintList = document.getElementById("hintList");
    hintList.innerHTML = "";
    parsedState.guesses.forEach(guess => {
      const subli = document.createElement("div");
      const li = document.createElement("li");
      const img = document.createElement("img");
      img.src = guess.imgSrc;
      img.alt = "Weapon img";
      subli.appendChild(img);

      const details = document.createElement("div");
      details.innerHTML = guess.detailsHTML;
      subli.appendChild(details);

      li.appendChild(subli);

      li.classList.add('visible');
      hintList.appendChild(li);
    });

    if (guessCount > 3) {
      revealHintOne();
    }
  }
}


window.addEventListener('beforeunload', handleBeforeUnload);

// Function to handle state save and clear local storage on page unload
function handleBeforeUnload() {
  saveState();
  if(clearAll){
    clearLocalStorage();
  }
  
}
// Event listeners for search box to save state on input
document.getElementById("searchBox").addEventListener("input", saveState);

function clearLocalStorage() {
  localStorage.clear();
}




function numWinners(){

}


// Helper function to check if arrays are equal
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

