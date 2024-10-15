const express = require("express");
const cors = require("cors"); // Import CORS package
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");
const path = require("path");

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
const dailyWeapon = weapons[Math.floor(Math.random() * weapons.length)];

// Log the daily weapon (for debugging)
const holder = dailyWeapon.name.toUpperCase();
console.log(`Daily weapon: ${holder}`);

// Endpoint to get daily weapon attributes
app.get("/api/daily-weapon", (req, res) => {
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
    console.log("stored guess: ", storedGuess.name);
    stats.total_wins += 1;
    writeJsonData(statsFilePath, stats);

    res.json({
      correct: true,
      message: "Correct! You guessed the daily weapon.",
      filteredGuess: storedGuess,
    });
    console.log("Guess", storedGuess);
  } else {
    const storedGuess = weapons.find(
      (weapon) => weapon.name.toUpperCase() === userGuess
    );
    console.log("stored guess: ", storedGuess.name);
    console.log("more backend test: ", storedGuess);
    res.json({
      correct: false,
      message: "Incorrect. Try again!",
      filteredGuess: storedGuess,
    });
    console.log("Guess", storedGuess);
  }
});

// Endpoint to get site data
app.get("/api/site-data", (req, res) => {
    // Get the current date in CST format
    const now = new Date(); // Get current date and time

    // Check if DST is enabled on system
    const isDST = now.getTimezoneOffset() < new Date(now.getFullYear(), 0, 1).getTimezoneOffset();
  
    // Subtract 6 hours for CST or 5 hours if Daylight Saving Time (DST) is enabled 
    const cstOffset = isDST ? 5 : 6;
  
    // Get the current UTC hour and adjust it to CST
    const currentUTC = new Date(now.getTime());
    const currentHourCST = (currentUTC.getUTCHours() - cstOffset + 24) % 24;
  
    // Create a new date object for the current CST date
    const today = new Date(currentUTC);
    today.setHours(currentHourCST, 0, 0, 0); // Set hours, minutes, seconds to zero for the start of the day
  
    // Format date as YYYY-MM-DD
    const formattedToday = today.toISOString().slice(0, 10);
  
    // Reset stats if the date has changed
    if (stats.date !== formattedToday) {
      stats.date = formattedToday;
      stats.total_wins = 0;
    }
  
    console.log(`api stats ${stats.total_wins}`);
    
  res.json({ count: stats.total_wins });
});



function getRemainingTimeCST() {
  const now = new Date(); // Get current date and time

  //Checks if DST is enabled on system
  const isDST = now.getTimezoneOffset() < new Date(now.getFullYear(), 0, 1).getTimezoneOffset();
  //Subtracts 6 hours for CST or 5 hours if DayLightsaving(DST) time is enabled 
  const cstOffset = isDST ? 5 : 6;

  const currentUTC = new Date(now.getTime()); // Current UTC time

  // Get the current UTC hour and adjust it to CST by subtracting 6 hours
  const currentHourCST = (currentUTC.getUTCHours() - cstOffset + 24) % 24;
  const minutesCST = currentUTC.getUTCMinutes();
  const secondsCST = currentUTC.getUTCSeconds();

  // Calculate time until end of day (23:59:59 CST)
  const endOfDayCST = (23 - currentHourCST) * 3600 + (59 - minutesCST) * 60 + (59 - secondsCST);

  const hours = Math.floor(endOfDayCST / 3600);
  const minutes = Math.floor((endOfDayCST % 3600) / 60);
  const seconds = endOfDayCST % 60;

  return { hours, minutes, seconds };
}


// Endpoint to send the remaining time to the frontend
app.get('/timer', (req, res) => {
  const remainingTime = getRemainingTimeCST();
  res.json(remainingTime);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
