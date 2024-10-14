/*Helper Functions or reusable code*/

export function setupButtonClickListener(buttonId, callback) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', callback);
    } else {
        console.error(`Button with ID "${buttonId}" not found.`);
    }
}

// Helper function to check if arrays are equal
export function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  

  //Helper Function that verifies weapon guessed is valid 
  export function checkWeaponReal(weaponName) {
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

  //Simple Helper Function that clears the searchbox input for the user after each guess
    export function clearInput() {
    var clearBox = document.getElementById("searchBox");
    clearBox.value = "";
  }

  //This function serves to initialize the audioHint features
  export function initializeAudioHint(){
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
  }