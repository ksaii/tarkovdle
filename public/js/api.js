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



  validateGuess: async function (guess) {
    try{
    // Accept guess as parameter
    const response = await fetch(`/api/validate-guess?guess=${guess}`);
    return await response.json(); // Convert the response to JSON
    } catch(error) {
    console.error("Error Validating Guess: ", error);
    throw error;
    }
      
  },
  /**
   * Fetches all images and names for weapons 
   * @returns {{name: string, image: string}}
   * An object containing the name of the weapons and image url strings
   */
  fetchWeaponData: async function () {
    try {
      const response = await fetch("/api/weapon-data");
      return await response.json();
    } catch (error) {
      console.error("Error Fetching Weapon Data", error);
    }
  },
  /**
   * Fetches the object of the Daily Weapon 
   * @returns {Array<Weapon>} 
   * An object containing the daily weapon
   */
  fetchCorrectWeapon: async function () {
    try {
      const response = await fetch("/api/daily-weapon");
      return await response.json();
    } catch (error) {
      console.error("Error fetching daily weapon:", error);
    }
  },
  /**
   * Fetches data about the site like how many people have won today etc...
   * 
   * @returns {{count: number}} returns.count - the total number of winners logged today
   */
  fetchNumberWinners: async function () {
    try {
      const response = await fetch("/api/site-data");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching Number of Winners:", error);
    }
  }

  
}
