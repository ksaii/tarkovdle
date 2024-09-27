import { setupButtonClickListener } from './utility.js';
import { 
    filterList,
    
 } from './script.js';

/*Button Event Logic*/


export function initializeEventListeners() {

    //Searchbox Click Listener
    const searchBox = document.getElementById("searchBox");

    if (searchBox) {
        searchBox.addEventListener("keyup", filterList);
        searchBox.addEventListener("click", filterList);  // Attach the event listener
    } else {
        console.error("SearchBox element not found");
    }


    //Site Info Icon Listener
    const infoIcon = document.getElementById("siteInfo");

    if(infoIcon){
        infoIcon.addEventListener("click", function() {
            const paragraph = document.querySelector(".creditContainer p");
            paragraph.style.display = (paragraph.style.display === "flex") ? "none" :"flex";
        }
    )
    }else {
        console.error(".creditConainer p element not found");
    }


    //gitIcon Listener
    const gitIcon = document.getElementById("gitInfo");

    if(gitIcon){
        gitIcon.addEventListener("click", function() {
            window.open('https://github.com/ksaii', '_blank');
        })
    }else{
        console.error("gitinfo element not found");
    }
 

    
    
    
  }


