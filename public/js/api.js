import { handleSubmit } from "./script.js";
/* Code for making API Calls */
export const Api = {
  // Namespace for API Functions
  /**
   * Compares the user's guess with the correct weapon and returns a detailed result.
   *
   * @param {string} guess - The weapon name guessed by the user.
   * @returns {{ correct: boolean, message: string, filteredGuess: { name: string, type: string, ammo_type: string, firing_modes: string[], price_range: number, weight: number, fire_rate: number, image: string, sound: string } }} -
   * An object containing the result of the guess:
   * - `correct`: true if the guess is correct, false otherwise.
   * - `message`: feedback message (e.g., "Incorrect. Try again!" or "Correct!").
   * - `filteredGuess`: an object containing detailed information about the guessed weapon:
   *    - `name`: the name of the weapon (e.g., "Mk47").
   *    - `type`: the type of the weapon (e.g., "Assault Rifle").
   *    - `ammo_type`: the type of ammunition (e.g., "7.62x39mm").
   *    - `firing_modes`: an array of available firing modes (e.g., ["Single", "Full-Auto"]).
   *    - `price_range`: the price of the weapon (e.g., 106051).
   *    - `weight`: the weight of the weapon (e.g., 2.322).
   *    - `fire_rate`: the fire rate of the weapon (e.g., 650).
   *    - `image`: a URL to an image of the weapon.
   *    - `sound`: a URL to a sound file for the weapon.
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
};
