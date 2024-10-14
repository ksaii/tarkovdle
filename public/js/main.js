/**
 * @typedef {Object} Weapon
 * @property {string} name - The name of the weapon.
 * @property {string} type - The type of the weapon (e.g., Assault Rifle).
 * @property {string} ammo_type - The type of ammunition used by the weapon.
 * @property {Array<string>} firing_modes - An array of available firing modes (e.g., Single, Full-Auto).
 * @property {number} price_range - The price range of the weapon in the game currency.
 * @property {number} weight - The weight of the weapon in kilograms.
 * @property {number} fire_rate - The fire rate of the weapon in rounds per minute (RPM).
 * @property {string} image - The URL of the weapon's image.
 * @property {string} sound - The file path for the weapon's sound effect.
 */


/*imports*/

import { 
    initializeEventListeners
  
   } from './buttonEvents.js';
  
  import {
    Api
  } from './api.js'
  
  import{
    weaponFeaturesComparison
  } from './weaponComparison.js'
  
  import{
    revealHints,
    blurHints
  } from './hints.js'
  
  import{
    checkWeaponReal,
    clearInput,
    initializeAudioHint
  } from './utility.js'
  
  import{
    removeWeaponFromDropdown,
    populateDropdown
  } from './dropdown.js'

  /*Core Logic*/
  
  initializeEventListeners(); // Delete this and above to work also delete type module to work. But to fix forever remove one of the arrayEquals functions 
  
  let guessedWeapon = []; // Array for storing JSON info of Users Guessed Weapon
  
  let currentWeaponPool = []; // Array of weapon objects(This only contains the names and images of every weapon)
  
  export let correctWeapon = []; // This array contains the object of the Correct Daily Weapon
  
  let winnerStateBool = false; // This Bool when false allows the user to keep playing the game until they win. When they win its set to true and the page is locked till daily reset
  
  export let guessesArray = []; // This contains an array of objects which contain the image and html/css for the weaponComparison divs tiles
  
  export let guessCount = 0; //Variable stores amount of guesses user has made so far today 
  
  
  // This object a bool that dicatates if the page will clear local storage on refresh
  export const state = {
    localClear: false,
  } 
  
  
  
  // Function to handle submitting a guess
  export function handleSubmit() {
    let guess = document.getElementById("searchBox").value.toUpperCase();
    
    if (!checkWeaponReal(guess)) {
      console.log("Not a real weapon:", guess);
      document.getElementById("result").innerText = "";
      clearInput();
    } else {
      // Call the API to validate the guess
      Api.validateGuess(guess)  // Pass the guess to the API function
        .then((data) => {  // Handle the resolved promise
          document.getElementById("result").innerText = data.message; //Shows user a message if their guess was true or false
          guessedWeapon = data.filteredGuess; // Passes json Users guessed weapon object to guessedWeapon Variable
          weaponFeaturesComparison(correctWeapon, guessedWeapon); // Calls compare Hints to generate hintList Divs
          currentWeaponPool = removeWeaponFromDropdown(guess, currentWeaponPool); 
          correctPop(data.correct);
          clearInput();
          guessCount++;
          revealHints();
  
          // Save game state
          saveState();
        })
        .catch((error) => console.error("Error validating guess: ", error));  // Catch any errors
    }
  }
  
  
  
  
  //Event Listener for when the DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    loadState();
    blurHints();
    initializeAudioHint();
    Api.fetchCorrectWeapon()
    .then((data) => {
      correctWeapon = data;
      console.log("Fetching Correct Weapon");
    }).catch((error) => {
      console.error("Error fetching daily weapon:", error);
    })
  
      Api.fetchWeaponData()
      .then((data) => {
        if (currentWeaponPool.length === 0) {
          currentWeaponPool = data;
          saveState();
        }
  
        populateDropdown(currentWeaponPool);
  
      })
      .catch((error) => console.error("Error fetching weapon names/images:", error));
    
  });
  
  
  
  

  //This function executes when user guessed Correct weapon and ends game till reset
  function correctPop(win) {
    if (win) {
      console.log("correct pop called");
      winnerStateBool = true;
      const searchBar = document.getElementsByClassName("autocomplete-container");
      searchBar[0].style.display = "none";
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
  
      document.getElementById("attempts").innerHTML = (`It took you took ${guessCount} Attempts!`);
      updateCountdown();  
      numWinners();
      saveState();
    }
  }
  
  
  
  
  function updateCountdown() {
    const now = new Date();
    const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    
    const timeDifference = nextDay - now;
  
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
    document.getElementById('countdown').innerHTML = 
        'New Weapon in: \n' +
        ('0' + hours).slice(-2) + ':' +
        ('0' + minutes).slice(-2) + ':' +
        ('0' + seconds).slice(-2);
  
    setTimeout(updateCountdown, 1000);
  }
  
  
  
  //This function is called whenever the state of the page needs to be saved in the local storage
  export function saveState() {
    const state = {
      savedGuessCount: guessCount,
      savedGuessedWeapon: guessedWeapon,
      savedCorrectWeapon: correctWeapon,
      savedGuessesArray: guessesArray,
      savedWinnerStateBool: winnerStateBool,
      savedCurrentWeaponPool: currentWeaponPool
    };
    localStorage.setItem('pageState', JSON.stringify(state));
  }
  
  
  
  
  
  //This function is called whenever the DOM is loaded to set the page to the state the user left it in
  function loadState() {
    const state = localStorage.getItem('pageState');
    const hintDetailContainer = document.querySelector('.hintDetailContainer');
    const tutorialContainer = document.getElementsByClassName("tutorialContainer");
  
  
    if (state) {
      
      const parsedState = JSON.parse(state);
      guessCount = parsedState.savedGuessCount; //Parses savedGuessCount which is the locally saved number to determine if the user has guessed already
      
      if(guessCount>0){ // This checks if its the users first time guessing if it isnt it displays info
        hintDetailContainer.classList.add('visible');
        tutorialContainer[0].style.display = "flex";
      }
      currentWeaponPool = parsedState.savedCurrentWeaponPool
      winnerStateBool = parsedState.savedWinnerStateBool;
      
      guessCount = parsedState.savedGuessCount;
      guessedWeapon = parsedState.savedGuessedWeapon;
      correctWeapon = parsedState.savedCorrectWeapon;
      guessesArray = parsedState.savedGuessesArray;
  
      //Create,load and append all the hintList divs
      const hintList = document.getElementById("hintList");
      hintList.innerHTML = "";
      parsedState.savedGuessesArray.forEach(guess => {
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
      correctPop(winnerStateBool);
    }
  }
  
  
  
  
  window.addEventListener('beforeunload', handleBeforeUnload); //Event Listener to Handle Page unloading
  
  // Function to handle state save and clear local storage on page unload
  export function handleBeforeUnload() {
    saveState();
    console.log("Saving State");
    if(state.localClear){
      clearLocalStorage();
      location.reload();
    }
    
  }
  
  //Function when called clears Local Storage
  export function clearLocalStorage() {
    localStorage.clear();
    console.log("Clearing Local Storage");
  }
  
  // Event listeners for search box to save state on input
  document.getElementById("searchBox").addEventListener("input", saveState);
  
  
  //This async function just waits for the .fetchNumberWinnders call the assigns the number of daily winners retrieved from the backend to 'winnerCount'
  async function numWinners() {
  
      Api.fetchNumberWinners()
      .then((data) => {
  
        // Log the response data to the console (for debugging purposes)
        console.log("numWinners run", data);
  
        // Update the HTML element with the count of winners
        document.getElementById('winnerCount').innerText = `${data.count} people have guessed the weapon today!`;
        document.getElementById('')
      }).catch((error) => {
      // Handle any errors that occur during the fetch or processing
      console.error('Failed to fetch data:', error);
      document.getElementById('winnerCount').innerText = 'Failed to load data';
    })
  }
  
