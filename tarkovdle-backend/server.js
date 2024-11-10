const express = require("express");
const cors = require("cors"); // Import CORS package
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");
const path = require("path");


const statsRoutes = require("../routes/stats");
const statsController = require('../controllers/statsController');

const db = require('../models/db');


// Enable CORS for all origins
app.use(cors());

app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "../public")));


// DB imports
app.use('/api', statsRoutes);


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

// Daily weapon
let dailyWeapon;

//Global CST time variables
let hoursLeft, minutesLeft, secondsLeft, formattedToday;






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
 
       // Update wins in DB
       db.execute(
        'UPDATE site_stats SET total_global_wins = total_global_wins + 1 WHERE date = ?',
        [formattedToday]
      );

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
app.get("/api/site-data", async (req, res) => {

  try {
    const [rows] = await db.execute('SELECT total_global_wins, last_reset_key FROM site_stats WHERE date = ?', [formattedToday]);
    const stats = rows[0] || { total_global_wins: 0, last_reset_key: 0 };
    res.json({ count: stats.total_global_wins, lastResetKey: stats.last_reset_key });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  //DELETE ME res.json({ count: stats.total_wins, lastResetKey: stats.lastResetKey });
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


async function resetStatsIfNeeded() {
  console.log("Checking if reset is needed for date: ", formattedToday);

  try {
    const [rows] = await db.execute('SELECT date FROM site_stats WHERE date = ?', [formattedToday]);

    // Reset stats if the date has changed
    if (rows.length === 0) { // If stats for today do not exist

      dailyWeapon = weapons[Math.floor(Math.random() * weapons.length)]; // Choose random Weapon

      await db.execute(
        'INSERT INTO site_stats (date, total_global_wins, last_reset_key, daily_weapon) VALUES (?, 0, 0, ?)',
        [formattedToday, dailyWeapon.name]
      );
      console.log(`Setting stats for new date: ${formattedToday}`);
    } else {
      const stats = rows[0];
      console.log("DB date: ",stats.date);
      if (stats.date !== formattedToday) {
        dailyWeapon = weapons[Math.floor(Math.random() * weapons.length)];
        await db.execute(
          'UPDATE site_stats SET total_global_wins = 0, last_reset_key = last_reset_key + 1, daily_weapon = ? WHERE date = ?',
          [dailyWeapon.name, formattedToday]
        );
        console.log(`Resetting stats for new date: ${formattedToday}`);
      } else {
        console.log("No Reset Needed for date: ", stats.date);
      }
    }
  } catch (error) {
    console.error('Error resetting stats:', error);
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
    if (stats.date != formattedToday) { // Less than 1 hour until midnight
      resetStatsIfNeeded(); // Check and reset stats
    }
  }, 60000); // Check every minute
}




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
  formattedToday = nowCST.toISOString().slice(0, 10) ;

}



// Start the server
app.listen(port, () => {
  console.log(`Server running on: ${port}/`);
  scheduleReset();
});