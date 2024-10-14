import{
    handleSubmit
} from "./main.js"


//This Function Removes guessed Weapon from dropdown to prevent user from entering it twice
export function removeWeaponFromDropdown(weaponName, currentWeaponPool) {
    const ul = document.getElementById("weaponList");
    const li = ul.getElementsByTagName("li");
  
    console.log("Removing ", weaponName, "from Dropdown");
    
    
    for (let i = 0; i < li.length; i++) {
      if ((li[i].textContent.toUpperCase()).includes(weaponName.toUpperCase())) {
        ul.removeChild(li[i]);
        // Remove the weapon from the weapons array and return result 
        return currentWeaponPool = currentWeaponPool.filter(weapon => weapon.name.toUpperCase() !== weaponName.toUpperCase());

      }
    }
  }

  //This Function populates the dropdown with li elements containing the weapon names and images and returns the edited object array
  export function populateDropdown(currentWeaponPool) {
    const ul = document.getElementById("weaponList");
    ul.innerHTML = ""; // Clear existing list items
  
    currentWeaponPool.forEach((weapon) => {
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
  
      
    });
  }