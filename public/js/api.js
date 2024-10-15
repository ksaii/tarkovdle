import { handleSubmit } from "./main.js";
/* Code for making API Calls */
export const Api = {
  // Namespace for API Functions
  /**
   * Compares the user's guess with the correct weapon and returns a detailed result.
   *
   * @param {string} guess - The weapon name guessed by the user.
   * @returns {{ correct: boolean, message: string, filteredGuess: Weapon}} 
   * 
   */



  validateGuess: function (guess) {
    // Accept guess as parameter
    return fetch(`http://localhost:3000/api/validate-guess?guess=${guess}`)
      .then((response) => response.json()) // Convert the response to JSON
      .catch((error) => {
        console.error("Error Validating Guess: ", error);
        throw error; // Re-throw the error to be caught in handleSubmit
      });
  },
  /**
   * Fetches all images and names for weapons 
   * @returns {{name: string, image: string}}
   * An object containing the name of the weapons and image url strings
   */
  fetchWeaponData: function () {
    return fetch("http://localhost:3000/api/weapon-data")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error Fetching Weapon Data", error);
      });
  },
  /**
   * Fetches the object of the Daily Weapon 
   * @returns {Array<Weapon>} 
   * An object containing the daily weapon
   */
  fetchCorrectWeapon: function (){
    return fetch("http://localhost:3000/api/daily-weapon")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching daily weapon:", error)
    });
  },
  /**
   * Fetches data about the site like how many people have won today etc...
   * 
   * @returns {{count: number}} returns.count - the total number of winners logged today
   */
  fetchNumberWinners: function (){
    return fetch("http://localhost:3000/api/site-data")
    .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json()})
    .catch((error) => {
      console.error("Error fetching Number of Winners:",error);
    })
  }
};
