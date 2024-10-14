import { setupButtonClickListener } from './utility.js';
import { filterList } from './filter.js';
import { 
    handleBeforeUnload, //Function for handling page unload 
    state,   //Bool Variables to determine whether to clear local storage when refreshing or not
    handleSubmit, //Function for handling submitted textbox info
} from './main.js'

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
    
    //Reset Button Temporary
    const resetButton = document.getElementById("reset");
    
        if(resetButton){    
            resetButton.addEventListener("click",function(){
            state.localClear = true;
            handleBeforeUnload();    
            })      
        }else{
            console.error("reset element not found");
        }

    //Dropdown event listener to close dropdown when clicking outside of it
    document.addEventListener("click", function (event) {
    let ul = document.getElementById("weaponList");
    let ulContainer = document.getElementsByClassName("weapon-list-container");
    let input = document.getElementById("searchBox");
    if (!input.contains(event.target) && !ul.contains(event.target)) {
      ul.style.display = "none";
    }
    });
      
      

    //Submit Button Listener
    document.getElementById("submitGuess").addEventListener("click", handleSubmit);

    //Searchbox Enter KeyListener 
    document.getElementById("searchBox").addEventListener("keydown", function(event){
        if(event.key === "Enter"){
          handleSubmit();
          console.log("entered");
        }
      })

    
    
    
    
  }


