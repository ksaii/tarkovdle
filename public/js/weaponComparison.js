import {
    saveState,
    guessesArray
} from './main.js'

import {
    arraysEqual,
    compareArray
} from './utility.js'


/**
 * This function compares the hints of each guess and then creates the hintlist divs based off the results which
 * can be green,yellow or red. 
 * At the end of the function it saves the page state and triggers some transitions.
 * 
 * @param {Weapon} correctWeapon - An Array containing the object of the CorrectWeapon
 * @param {Weapon} guessedWeapon - An Array containing the object of the guessedWeapon
 */
export function weaponFeaturesComparison(correctWeapon , guessedWeapon) {
    const ul = document.getElementById("hintList");
  
    const li = document.createElement("li");
    const img = document.createElement("img");
    
  
    const hintDetailContainer = document.querySelector('.hintDetailContainer');
    const details = document.createElement("div");
  
    const weaponImage = document.createElement("div");
    img.src = guessedWeapon.image;
    img.alt = "Weapon img";
    weaponImage.appendChild(img);
    weaponImage.id = "imageBox";
    weaponImage.title = (`${guessedWeapon.name}`);
    details.appendChild(weaponImage);
  
  
    
  
    // Compare hints
  
  
    //weapon ammo_type divs
  
    if (correctWeapon.ammo_type !== guessedWeapon.ammo_type) {
      const ammoType = document.createElement("div");
      ammoType.id = "nullMatch";
      ammoType.classList.add()
      ammoType.textContent = `${guessedWeapon.ammo_type}`;
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
  
     if (correctWeapon.type !== guessedWeapon.type) {
      const type = document.createElement("div");
      type.id = "nullMatch";
      type.textContent = `${guessedWeapon.type}`;
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
  
    if (correctWeapon.price_range !== guessedWeapon.price_range) {
      const priceRange = document.createElement("div");
      priceRange.style.backgroundPosition = "center";
      priceRange.style.backgroundSize = "cover";
      priceRange.style.backgroundRepeat = "no-repeat";
      priceRange.id = "nullMatch";
      priceRange.textContent = `${guessedWeapon.price_range}₽`;
      priceRange.style.backgroundColor = "red";
  

      if(correctWeapon.price_range > guessedWeapon.price_range){
      priceRange.style.backgroundImage = "url(images/arrow-up.svg)";
      }else{
      priceRange.style.backgroundImage = "url(images/arrow-down.svg)";
      }
      details.appendChild(priceRange);
    } else {
      const priceRange = document.createElement("div");
      priceRange.id = "correctMatch";
      priceRange.textContent = `${correctWeapon.price_range}₽`;
      priceRange.style.backgroundColor = "green";
      details.appendChild(priceRange);
    }
  
  
  
   
  
  
    //weapon weight divs
  
    if (correctWeapon.weight !== guessedWeapon.weight) {
      const weaponWeight = document.createElement("div");
      weaponWeight.style.backgroundSize = "cover";
      weaponWeight.style.backgroundRepeat = "no-repeat";
      weaponWeight.style.backgroundPosition = "center";
      weaponWeight.id = "nullMatch";
      weaponWeight.textContent = `${guessedWeapon.weight}kg`;
      weaponWeight.style.backgroundColor = "red";
  

      if(correctWeapon.weight > guessedWeapon.weight){
        weaponWeight.style.backgroundImage = "url(images/arrow-up.svg)";
      }else{
        weaponWeight.style.backgroundImage = "url(images/arrow-down.svg)";
      }
      details.appendChild(weaponWeight);
    } else {
      const weaponWeight = document.createElement("div");
      weaponWeight.id = "correctMatch";
      weaponWeight.textContent = `${correctWeapon.weight}kg`;
      weaponWeight.style.backgroundColor = "green";
      details.appendChild(weaponWeight);
    }
  
  
      //weapon fire_rate divs
  
      if (correctWeapon.fire_rate !== guessedWeapon.fire_rate) {
        const weaponFireRate = document.createElement("div");
        weaponFireRate.style.backgroundRepeat = "no-repeat";
        weaponFireRate.style.backgroundSize = "cover";
        weaponFireRate.style.backgroundPosition = "center";
        weaponFireRate.id = "nullMatch";
        weaponFireRate.textContent = `${guessedWeapon.fire_rate}RPM`;
    
        weaponFireRate.style.backgroundColor = "red";
  
        if(correctWeapon.fire_rate > guessedWeapon.fire_rate){
          weaponFireRate.style.backgroundImage = "url(images/arrow-up.svg)";
        }else{
          weaponFireRate.style.backgroundImage = "url(images/arrow-down.svg)";
        }
        
        details.appendChild(weaponFireRate);
      } else {
        const weaponFireRate = document.createElement("div");
        weaponFireRate.id = "correctMatch";
        weaponFireRate.textContent = `${correctWeapon.fire_rate}RPM`;
        weaponFireRate.style.backgroundColor = "green";
        details.appendChild(weaponFireRate);
      }
  
  
  
    //weapon fire_modes divs
  
    if (compareArray(correctWeapon.firing_modes, guessedWeapon.firing_modes) === 2 || 0) {
      const fmodes = document.createElement("div");
      fmodes.id = "nullMatch";

      fmodes.textContent = `${guessedWeapon.firing_modes.join(
        ", "
      )}`;

      if(compareArray(correctWeapon.firing_modes, guessedWeapon.firing_modes) === 2){
        fmodes.style.backgroundColor = "rgb(150, 150, 0)";
      }else{
        fmodes.style.backgroundColor = "red";
      }
      
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
    console.log("Vweapon Frate ",guessedWeapon.fire_rate);
  
  
  
    // Add more comparisons for other details as needed
  
   
  
    li.appendChild(details);
  
    
  
    ul.appendChild(li);
    
    
    guessesArray.push({
      imgSrc: guessedWeapon.image,
      detailsHTML: details.innerHTML
    });
    
    const tutorialContainer = document.getElementsByClassName("tutorialContainer");
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
        tutorialContainer[0].style.display = "flex";
      }, 100);
  
      
  
    saveState();
  
  }