function filterList() {
  let input = document.getElementById("searchBox");
  let filter = input.value.toLowerCase();
  let ulContainer = document.getElementsByClassName("weapon-list-container");
  let ul = document.getElementById("weaponList");
  let li = ul.getElementsByTagName("li");

  // Show the list if there's input
  ul.style.display = filter ? "flex" : "none";

  for (let i = 0; i < li.length; i++) {
    let text = li[i].textContent || li[i].innerText;
    if (text.toLowerCase().indexOf(filter) > -1) {
      li[i].style.display = ""; 
    } else {
      li[i].style.display = "none";
    }
  }
}

document.getElementById("searchBox").addEventListener("click",function (event){
  filterList();
})

document.getElementById("reset").addEventListener("click",function (event) {
  clearAll=true;
  handleBeforeUnload();
})
var clearAll = false;

// Optionally, add event listener to close the dropdown when clicking outside
document.addEventListener("click", function (event) {
  let ul = document.getElementById("weaponList");
  let ulContainer = document.getElementsByClassName("weapon-list-container");
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
        revealHints();

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
  blurHints();
 

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
  

  const hintDetailContainer = document.querySelector('.hintDetailContainer');
  const details = document.createElement("div");

  const weaponImage = document.createElement("div");
  img.src = verifiedWeapon.image;
  img.alt = "Weapon img";
  weaponImage.appendChild(img);
  weaponImage.id = "imageBox";
  details.appendChild(weaponImage);


  

  // Compare hints


  //weapon ammo_type divs

  if (correctWeapon.ammo_type !== verifiedWeapon.ammo_type) {
    const ammoType = document.createElement("div");
    ammoType.id = "nullMatch";
    ammoType.classList.add()
    ammoType.textContent = `${verifiedWeapon.ammo_type}`;
    ammoType.style.backgroundColor = "red";
    details.appendChild(ammoType);
  } else {
    const ammoType = document.createElement("div");
    ammoType.id = "correctMatch";
    ammoType.textContent = `${correctWeapon.ammo_type}`;
    ammoType.style.backgroundColor = "green";
    details.appendChild(ammoType);
  }


   //weapon type divs

   if (correctWeapon.type !== verifiedWeapon.type) {
    const type = document.createElement("div");
    type.id = "nullMatch";
    type.textContent = `${verifiedWeapon.type}`;
    type.style.backgroundColor = "red";
    details.appendChild(type);
  } else {
    const type = document.createElement("div");
    type.id = "correctMatch";
    type.textContent = `${correctWeapon.type}`;
    type.style.backgroundColor = "green";
    details.appendChild(type);
  }


  //weapon price_range divs

  if (correctWeapon.price_range !== verifiedWeapon.price_range) {

    if(correctWeapon.price_range > verifiedWeapon.price_range){
    const priceRange = document.createElement("div");
    priceRange.id = "nullMatch";
    priceRange.textContent = `${verifiedWeapon.price_range}₽`;

    priceRange.style.backgroundColor = "red";
    details.appendChild(priceRange);
    }else{
    const priceRange = document.createElement("div");
    priceRange.id = "nullMatch";
    priceRange.textContent = `${verifiedWeapon.price_range}₽`;

    priceRange.style.backgroundColor = "red";
    details.appendChild(priceRange);
    }

  } else {
    const priceRange = document.createElement("div");
    priceRange.id = "correctMatch";
    priceRange.textContent = `${correctWeapon.price_range}₽`;
    priceRange.style.backgroundColor = "green";
    details.appendChild(priceRange);
  }



 


  //weapon weight divs

  if (correctWeapon.weight !== verifiedWeapon.weight) {

    if(correctWeapon.weight > verifiedWeapon.weight){
    const weaponWeight = document.createElement("div");
    weaponWeight.id = "nullMatch";
    weaponWeight.textContent = `${verifiedWeapon.weight}kg`;

    weaponWeight.style.backgroundColor = "red";
    details.appendChild(weaponWeight);
    }else{
    const weaponWeight = document.createElement("div");
    weaponWeight.id = "nullMatch";
    weaponWeight.textContent = `${verifiedWeapon.weight}kg`;

    weaponWeight.style.backgroundColor = "red";
    details.appendChild(weaponWeight);
    }

  } else {
    const weaponWeight = document.createElement("div");
    weaponWeight.id = "correctMatch";
    weaponWeight.textContent = `${correctWeapon.weight}kg`;
    weaponWeight.style.backgroundColor = "green";
    details.appendChild(weaponWeight);
  }


    //weapon fire_rate divs

    if (correctWeapon.fire_rate !== verifiedWeapon.fire_rate) {

      if(correctWeapon.fire_rate > verifiedWeapon.fire_rate){
      const weaponFireRate = document.createElement("div");
      weaponFireRate.id = "nullMatch";
      weaponFireRate.textContent = `${verifiedWeapon.fire_rate}RPM`;
  
      weaponFireRate.style.backgroundColor = "red";
      details.appendChild(weaponFireRate);
      }else{
      const weaponFireRate = document.createElement("div");
      weaponFireRate.id = "nullMatch";
      weaponFireRate.textContent = `${verifiedWeapon.fire_rate}RPM`;
  
      weaponFireRate.style.backgroundColor = "red";
      details.appendChild(weaponFireRate);
      }

    } else {
      const weaponFireRate = document.createElement("div");
      weaponFireRate.id = "correctMatch";
      weaponFireRate.textContent = `${correctWeapon.fire_rate}RPM`;
      weaponFireRate.style.backgroundColor = "green";
      details.appendChild(weaponFireRate);
    }



  //weapon fire_modes divs

  if (!arraysEqual(correctWeapon.firing_modes, verifiedWeapon.firing_modes)) {
    const fmodes = document.createElement("div");
    fmodes.id = "nullMatch";
    fmodes.textContent = `${verifiedWeapon.firing_modes.join(
      ", "
    )}`;
    fmodes.style.backgroundColor = "red";
    details.appendChild(fmodes);
  } else {
    const fmodes = document.createElement("div");
    fmodes.id = "correctMatch";
    fmodes.textContent = `${correctWeapon.firing_modes.join(
      ", "
    )}`;
    fmodes.style.backgroundColor = "green";
    details.appendChild(fmodes);
  }






  console.log("CorWeapon Frate ",correctWeapon.fire_rate);
  console.log("Vweapon Frate ",verifiedWeapon.fire_rate);



  // Add more comparisons for other details as needed

 

  li.appendChild(details);

  

  ul.appendChild(li);
  

  guessesArray.push({
    imgSrc: verifiedWeapon.image,
    detailsHTML: details.innerHTML
  });
  

    // Trigger the transition
    setTimeout(() => {
      document.querySelectorAll('#correctMatch').forEach((div, index) => {
        div.classList.add('correctMatch');
      });
      document.querySelectorAll('#nullMatch').forEach((div, index) => {
        div.classList.add('nullMatch');
      });
       document.querySelectorAll('#imageBox').forEach((imageBox, index) => {
        imageBox.classList.add('visible');;
        saveState();
      });
  
      
      
      hintDetailContainer.classList.add('visible');
    }, 100);

    

  saveState();

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
    if ((li[i].textContent.toUpperCase()).includes(weaponName.toUpperCase())) {
      ul.removeChild(li[i]);
      // Remove the weapon from the weapons array
      weapons = weapons.filter(weapon => weapon.name.toUpperCase() !== weaponName.toUpperCase());
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
    console.log("correct pop called");
    savedBool = true;
    document.getElementById("popup").innerText = "You finished";
    document.getElementById("result").innerText = "Correct! You guessed the daily weapon.";
    document.getElementById("winHolder").style.display = "flex";
    setTimeout(() =>{
      document.getElementById("winHolder").scrollIntoView({behavior: 'smooth'});
    },1400);
    
    const correctIcon = document.createElement("img");
    correctIcon.src = correctWeapon.image;
    correctIcon.alt = "Correct Weapon Icon";
    document.getElementById("correctImage").appendChild(correctIcon);

    document.getElementById("attempts").innerHTML = (`Total Attempts: ${guessCount}`);
    updateCountdown();  
    numWinners();
    saveState();
  }
}

function clearInput() {
  var clearBox = document.getElementById("searchBox");
  clearBox.value = "";
}

function revealHintButtons() {
  var welcomeTitle = document.getElementsByClassName("welcometitle");
  welcomeTitle[0].style.display = "none";
  var hintButtons = document.getElementsByClassName("hintButtons");
  
  hintButtons[0].style.display = "flex";
  setTimeout(() => {
    hintButtons[0].classList.add('transition-effect');
  }, 100);
}

document.getElementById("hintOne").addEventListener("click", function () {
  if(guessCount >= hintsReqArray[0]){
    console.log("h1 clicked");

    const newAudioPath = correctWeapon.sound;

    const audioElement = document.getElementById("audioIn");

    audioElement.src = newAudioPath;

    audioElement.load();

    let audioHint = document.getElementsByClassName("audioHint");
    let imageHint = document.getElementsByClassName("iconHint");

    if(hintShow[0]===true){
    imageHint[0].style.display = "none";
    hintShow[1] = true;
    audioHint[0].style.display = "flex";
    hintShow[0] = false;
    }else{
    audioHint[0].style.display = "none";
    hintShow[0] = true;
  }
}
  });

function revealHintOne() {
  let aButton = document.querySelector(".hintButtons #hintOne img");
  let aTxt = document.querySelector(".hintButtons #hintOne p");
  aTxt.classList.add("smallFont");
  aTxt.textContent = 'Audio Hint';
  aButton.classList.remove("blur");
  aButton.classList.add("hover-effect");
}

document.getElementById("hintTwo").addEventListener("click",function() {
  if(guessCount >= hintsReqArray[1]){
  console.log("h2 clicked");


  const hintImg = document.getElementById("hintImage");

  console.log(correctWeapon.image);

  hintImg.src = correctWeapon.image;

  let audioHint = document.getElementsByClassName("audioHint");
  let imageHint = document.getElementsByClassName("iconHint");


  if(hintShow[1]===true){
    audioHint[0].style.display = "none";
    hintShow[0] = true;
    
    imageHint[0].style.display = "flex";
    hintShow[1] = false;
    }else{
    imageHint[0].style.display = "none";
    hintShow[1] = true;
  }
}
})

function revealHintTwo() {
  let bButton = document.querySelector(".hintButtons #hintTwo img");
  let bTxt = document.querySelector(".hintButtons #hintTwo p");
  bTxt.classList.add("smallFont");
  bTxt.textContent = 'Icon Hint';

  bButton.classList.remove("blur");
  bButton.classList.add("hover-effect");
}

document.getElementById("hintThree").addEventListener("click",function() {
  if(guessCount >= hintsReqArray[2]){
  console.log("h3 clicked");


  const hintImg = document.getElementById("hintImage");

  console.log(correctWeapon.image);

  hintImg.src = correctWeapon.image;

  let audioHint = document.getElementsByClassName("audioHint");
  let imageHint = document.getElementsByClassName("iconHint");
   

  if(hintShow[1]===true){
    audioHint[0].style.display = "none";
    hintShow[0] = true;
    
    imageHint[0].style.display = "flex";
    hintShow[1] = false;
    }else{
    imageHint[0].style.display = "none";
    hintShow[1] = true;
  }
}
})

function revealHintThree() {
  let cButton = document.querySelector(".hintButtons #hintThree img");
  let cTxt = document.querySelector(".hintButtons #hintThree p");
  cTxt.classList.add("smallFont");
  cTxt.textContent = 'Name Hint';

  cButton.classList.remove("blur");
  cButton.classList.add("hover-effect");
}


  







let hintShow = [true,true,true];

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
    
    guessCount = parsedState.guessCount;
    verifiedWeapon = parsedState.verifiedWeapon;
    correctWeapon = parsedState.correctWeapon;
    guessesArray = parsedState.guesses;

    const hintList = document.getElementById("hintList");
    hintList.innerHTML = "";
    parsedState.guesses.forEach(guess => {
      const li = document.createElement("li");
      const img = document.createElement("img");
  

      const details = document.createElement("div");
      details.innerHTML = guess.detailsHTML;
      li.appendChild(details);

    
      li.classList.add('visible');
      hintList.appendChild(li);

    
    });

    document.querySelectorAll(".hints-list li div div").forEach((div, index) => {
      div.classList.add('visible');
      div.removeAttribute('id');
    });
    revealHints();
    correctPop(savedBool);
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




async function numWinners() {
  try {
    // Fetch data from the server
    const response = await fetch('http://localhost:3000/api/site-data');

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response as JSON
    const stats = await response.json();

    // Log the response data to the console (for debugging purposes)
    console.log("numWinners run", stats);

    // Update the HTML element with the count of winners
    document.getElementById('winnerCount').innerText = `${stats.count} people have guessed the weapon today!`;
    document.getElementById('')
  } catch (error) {
    // Handle any errors that occur during the fetch or processing
    console.error('Failed to fetch data:', error);
    document.getElementById('winnerCount').innerText = 'Failed to load data';
  }
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



const audio = document.getElementById('audioIn');
const playButton = document.getElementById('audioListenButton');

playButton.addEventListener('click', () => {
  if (audio.paused || audio.ended) {
    audio.play();
    playButton.innerHTML = '<img src="images/pausebutton.png" alt="pausebutton">';
  } else {
    audio.pause();
    playButton.innerHTML = '<img src="images/playbutton.png" alt="playbutton">';
  }
});

document.getElementById('volumeSlider').addEventListener('input', function() {
  var audio = document.getElementById('audioIn');
  audio.volume = this.value;
});

const hintsReqArray =[5,7,9] // This Array Contains 3 ints which determine the minimum attempts for the hints 


function revealHints (){
  if (guessCount <= hintsReqArray[0]) {
    let aTxt = document.querySelector(".hintButtons #hintOne p");
    aTxt.textContent = `Audio Hint in \n${hintsReqArray[0]-guessCount} attempts`;
  }if (guessCount <= hintsReqArray[1]) {
    let bTxt = document.querySelector(".hintButtons #hintTwo p");
    bTxt.textContent = `Icon Hint in \n${hintsReqArray[1]-guessCount} attempts`;
  }if (guessCount <= hintsReqArray[2]) {
    let cTxt = document.querySelector(".hintButtons #hintThree p");
    cTxt.textContent = `Name Hint in \n${hintsReqArray[2]-guessCount} attempts`;
  }


  if (guessCount >= 2) {
    revealHintButtons();
  }if (guessCount >= hintsReqArray[0]) {
    revealHintOne();
  }if (guessCount >= hintsReqArray[1]) {
    revealHintTwo();
  }if (guessCount >= hintsReqArray[2]) {
    revealHintThree();
  }
}

function blurHints(){
  let hintOne = document.querySelector(".hintButtons #hintOne img");
  let hintTwo = document.querySelector(".hintButtons #hintTwo img");
  let hintThree = document.querySelector(".hintButtons #hintThree img");


  if (guessCount <  hintsReqArray[0]) {
    hintOne.classList.add("blur");
  }
  if (guessCount < hintsReqArray[1]) {
    hintTwo.classList.add("blur");
  }
  if (guessCount < hintsReqArray[2]) {
    hintThree.classList.add("blur");
  }


}


