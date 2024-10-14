import{
    guessCount,
    saveState,
    correctWeapon
} from "./main.js"

const hintsReqArray =[5,7,9] // This Array Contains 3 ints which determine the minimum attempts needed to unlock the hints 

let hintHide = [true,true,true]; //Array that stores 3 bools that determine if a Hint div should be visible or not (True means hide div,False Means revealed)

//Function that Updates "Attempts required till Guess is unlocked" and also reveals the Guesses after x amount of Attempts
export function revealHints (){

    //this if if block updates string telling user how many attempts are needed to unlock hint 
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
  
    //if if block reveals the hintButtons after x attempts
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

//Function that simply reveals the buttons with a smooth transition
export function revealHintButtons() {
    var welcomeTitle = document.getElementsByClassName("welcometitle");
    welcomeTitle[0].style.display = "none";
    var hintButtons = document.getElementsByClassName("hintButtons");
    
    hintButtons[0].style.display = "flex";
    setTimeout(() => {
      hintButtons[0].classList.add('transition-effect');
    }, 100);
  }

//Function that blurs the hints 
export function blurHints(){
    let hintOne = document.querySelector(".hintButtons #hintOne img");
    let hintTwo = document.querySelector(".hintButtons #hintTwo img");
    let hintThree = document.querySelector(".hintButtons #hintThree img");
  
    //This if if block uses guessCount to track what guesses to blur if any so when the page refreshes the user keep their progress
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

  //This Event Listener waits for Hint to be unlocked after guessCount has been reached then provides hint to the user
  document.getElementById("hintOne").addEventListener("click", function () {
    if(guessCount >= hintsReqArray[0]){
      console.log("h1 clicked");
  
      const newAudioPath = correctWeapon.sound;
  
      const audioElement = document.getElementById("audioIn");
  
      audioElement.src = newAudioPath;
  
      audioElement.load();
  
      let audioHint = document.getElementsByClassName("audioHint");
      let imageHint = document.getElementsByClassName("iconHint");
      let nameHint = document.getElementsByClassName("nameHint");
  
      if(hintHide[0]===true){
      imageHint[0].style.display = "none";
      hintHide[1] = true;
  
      nameHint[0].style.display = "none";
      hintHide[2] = true;
  
      audioHint[0].style.display = "flex";
      hintHide[0] = false;
      }else{
      audioHint[0].style.display = "none";
      hintHide[0] = true;
    }
  }
    });

  //This function simply visually reveals the hint to the user by modifying css and html
  function revealHintOne() {
    let aButton = document.querySelector(".hintButtons #hintOne img");
    let aTxt = document.querySelector(".hintButtons #hintOne p");
    aTxt.classList.add("smallFont");
    aTxt.textContent = 'Audio Hint';
    aButton.classList.remove("blur");
    aButton.classList.add("hover-effect");
  }
  
  //This Event Listener waits for Hint to be unlocked after guessCount has been reached then provides hint to the user
  document.getElementById("hintTwo").addEventListener("click",function() {
    if(guessCount >= hintsReqArray[1]){
    console.log("h2 clicked");
  
  
    const hintImg = document.getElementById("hintImage");
  
    console.log(correctWeapon.image);
  
    hintImg.src = correctWeapon.image;
  
    let audioHint = document.getElementsByClassName("audioHint");
    let imageHint = document.getElementsByClassName("iconHint");
        let nameHint = document.getElementsByClassName("nameHint");
  
  
  
    if(hintHide[1]===true){
      imageHint[0].style.display = "flex";
      hintHide[1] = false;
  
      nameHint[0].style.display = "none";
      hintHide[2] = true;
  
      audioHint[0].style.display = "none";
      hintHide[0] = true;
      }else{
      imageHint[0].style.display = "none";
      hintHide[1] = true;
    }
  }
  })
  
  //This function simply visually reveals the hint to the user by modifying css and html
  function revealHintTwo() {
    let bButton = document.querySelector(".hintButtons #hintTwo img");
    let bTxt = document.querySelector(".hintButtons #hintTwo p");
    bTxt.classList.add("smallFont");
    bTxt.textContent = 'Icon Hint';
  
    bButton.classList.remove("blur");
    bButton.classList.add("hover-effect");
  }
  
  //This Event Listener waits for Hint to be unlocked after guessCount has been reached then provides hint to the user
  document.getElementById("hintThree").addEventListener("click",function() {
    if(guessCount >= hintsReqArray[2]){
    console.log("h3 clicked");
  
  
    const textContent = document.getElementById("textHint");
  
    console.log(correctWeapon.name);
  
    textContent.innerText = correctWeapon.name;
  
    let audioHint = document.getElementsByClassName("audioHint");
    let imageHint = document.getElementsByClassName("iconHint");
    let nameHint = document.getElementsByClassName("nameHint");
  
     
  
    if(hintHide[2]===true){
      imageHint[0].style.display = "none";
      hintHide[1] = true;
  
      nameHint[0].style.display = "flex";
      hintHide[2] = false;
  
      audioHint[0].style.display = "none";
      hintHide[0] = true;
      }else{
      nameHint[0].style.display = "none";
      hintHide[2] = true;
    }
  }
  })
  
  //This function simply visually reveals the hint to the user by modifying css and html
  function revealHintThree() {
    let cButton = document.querySelector(".hintButtons #hintThree img");
    let cTxt = document.querySelector(".hintButtons #hintThree p");
    cTxt.classList.add("smallFont");
    cTxt.textContent = 'Name Hint';
  
    cButton.classList.remove("blur");
    cButton.classList.add("hover-effect");
  }