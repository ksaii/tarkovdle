const express = require("express");
const cors = require("cors"); // Import CORS package
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");
const path = require("path");

// Enable CORS for all origins
app.use(cors());

// Enable CORS for all origins
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "../public")));

// Load and read Site Stats
const statsFilePath = path.join(__dirname, "../site-stats.json");
const stats = JSON.parse(fs.readFileSync(statsFilePath, "utf-8"));

// Load and read weapons data
const weapons = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../weapons.json"), "utf-8")
);

// Function to write data to a file
function writeJsonData(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}

// Select a daily weapon
let dailyWeapon = weapons[Math.floor(Math.random() * weapons.length)];

//Global CST time variables
let hoursLeft, minutesLeft, secondsLeft, formattedToday;


//Global Var that determines resets on frontend
let resetStatus = false;




// Endpoint to get daily weapon attributes
app.get("/api/daily-weapon", (req, res) => {
  // Start the schedule
  const holder = dailyWeapon.name.toUpperCase();
  console.log(`User has loaded the Daily weapon: ${holder}`);
  const { name, ...attributes } = dailyWeapon;
  const modifiedName = name.slice(0, 2) + ". . .";

  res.json({
    name: modifiedName,
    ...attributes,
  });
});

// Endpoint to get all weapon names for autocomplete
app.get("/api/weapon-data", (req, res) => {
  const weaponData = weapons.map((weapon) => ({
    name: weapon.name,
    image: weapon.image,
  }));

  res.json(weaponData);
});

// Endpoint to validate user guess
app.get("/api/validate-guess", (req, res) => {
  const userGuess = req.query.guess.toUpperCase();
  const dailyWeaponName = dailyWeapon.name.toUpperCase();

  if (userGuess === dailyWeaponName) {
    const storedGuess = weapons.find(
      (weapon) => weapon.name.toUpperCase() === userGuess
    );
    stats.total_wins = stats.total_wins + 1;
    writeJsonData(statsFilePath, stats);

    res.json({
      correct: true,
      message: "Correct! You guessed the daily weapon.",
      filteredGuess: storedGuess,
    });
  } else {
    const storedGuess = weapons.find(
      (weapon) => weapon.name.toUpperCase() === userGuess
    );
    res.json({
      correct: false,
      message: "Incorrect. Try again!",
      filteredGuess: storedGuess,
    });
  }
});

// Endpoint to get site data
app.get("/api/site-data", (req, res) => {
  res.json({ count: stats.total_wins, lastResetKey: stats.lastResetKey });
});



function getRemainingTimeCST() {
  calculateRemainingTimeCST();
  return { hoursLeft, minutesLeft, secondsLeft };
}


// Endpoint to send the remaining time to the frontend
app.get('/timer', (req, res) => {
  const remainingTime = getRemainingTimeCST();
  res.json(remainingTime);
});


// Helper function to reset stats if the date has changed
function resetStatsIfNeeded() {

  console.log("Checking if reset is needed for date: ", stats.date);

  // Reset stats if the date has changed
  if (stats.date !== formattedToday) {
    resetStatus = true;
    stats.total_wins = 0;
    stats.date = formattedToday;
    stats.lastResetKey += 1;
    console.log("Incrementing Reset Key",stats.lastResetKey);
    dailyWeapon = weapons[Math.floor(Math.random() * weapons.length)];
    writeJsonData(statsFilePath, stats); // Write updated stats back to the JSON file
    console.log(`Resetting page for new date: ${formattedToday}`);
    console.log("Reset Status signals sent: ",resetStatus,"\n");
    setTimeout(()=> resetStatsIfNeeded(),1000);
  } else {
    console.log("No Reset Needed for date: \n", stats.date);
    resetStatus = false;
  }
}

// Function to check time and call resetStatsIfNeeded
function scheduleReset() {
  // Call resetStatsIfNeeded immediately
  calculateRemainingTimeCST();
  resetStatsIfNeeded();

  // Set interval to check every hour
  setInterval(() => {
    calculateRemainingTimeCST();
    console.log("\nTime left Till Daily Reset\nHours: ",hoursLeft," Minutes: ",minutesLeft,"\n Date: ",formattedToday);
    if (hoursLeft === 0 && minutesLeft === 0) { // Less than 1 hour until midnight
      resetStatsIfNeeded(); // Check and reset stats
    }
  }, 60000); // Check every minute
}



// Endpoint to check reset status
app.get('/api/reset-status', (req, res) => {
  res.json({ resetOccurred: resetStatus });
});


function calculateRemainingTimeCST(){
  const now = new Date(); // Get current date and time in UTC
    const month = now.getUTCMonth(); // 0-indexed (January is 0)
    const day = now.getUTCDate();
    const year = now.getUTCFullYear();

    // Determine if we are in DST (CDT) or not (CST)
    const isDST = (month > 2 && month < 11) || (month === 2 && (day >= 14)); // Simple check for DST

    // Define the CST offset
    const cstOffset = isDST ? 5 : 6; // CDT is UTC-5, CST is UTC-6

    // Calculate current CST time
    const nowCST = new Date(now.getTime() - cstOffset * 60 * 60 * 1000);

    // Get current hour, minutes, and seconds in CST
    const currentHourCST = nowCST.getUTCHours();
    const minutesCST = nowCST.getUTCMinutes();
    const secondsCST = nowCST.getUTCSeconds();

    // Calculate remaining time until the end of the day in CST
    const endOfDayCST = (23 - currentHourCST) * 3600 + (59 - minutesCST) * 60 + (59 - secondsCST);

  hoursLeft = Math.floor(endOfDayCST / 3600);
  minutesLeft = Math.floor((endOfDayCST % 3600) / 60);
  secondsLeft = endOfDayCST % 60


  // Format date as YYYY-MM-DD
  formattedToday = nowCST.toISOString().slice(0, 10);

}



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  scheduleReset();
});