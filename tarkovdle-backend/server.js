const express = require('express');
const cors = require('cors'); // Import CORS package
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');

// Enable CORS for all origins
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));



// Load and read Site Stats
const statsFilePath = path.join(__dirname, '../site-stats.json');
const stats = JSON.parse(fs.readFileSync(statsFilePath, 'utf-8'));

// Load and read weapons data
const weapons = JSON.parse(fs.readFileSync(path.join(__dirname, '../weapons.json'), 'utf-8'));

// Function to write data to a file
function writeJsonData(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

// Select a daily weapon
const dailyWeapon = weapons[Math.floor(Math.random() * weapons.length)];

// Log the daily weapon (for debugging)
const holder = dailyWeapon.name.toUpperCase();
console.log(`Daily weapon: ${holder}`);

// Endpoint to get daily weapon attributes
app.get('/api/daily-weapon', (req, res) => {
  const { name, ...attributes } = dailyWeapon;
  const modifiedName = name.slice(0, 2) + '. . .';

  res.json({
    name: modifiedName,
    ...attributes
  });
});

// Endpoint to get all weapon names for autocomplete
app.get('/api/weapon-data', (req, res) => {
  const weaponData = weapons.map(weapon => ({
    name: weapon.name,
    image: weapon.image
  }));

  res.json(weaponData);
});

// Endpoint to validate user guess
app.get('/api/validate-guess', (req, res) => {
  const userGuess = req.query.guess.toUpperCase();
  const dailyWeaponName = dailyWeapon.name.toUpperCase();

  if (userGuess === dailyWeaponName) {
    const storedGuess = weapons.find(weapon => weapon.name.toUpperCase() === userGuess);
    console.log("stored guess: ", storedGuess.name);
    stats.total_wins += 1;
    writeJsonData(statsFilePath, stats);

    res.json({ correct: true, message: 'Correct! You guessed the daily weapon.', filteredGuess: storedGuess });
    console.log("Guess", storedGuess);
  } else {
    const storedGuess = weapons.find(weapon => weapon.name.toUpperCase() === userGuess);
    console.log("stored guess: ", storedGuess.name);
    console.log("more backend test: ", storedGuess);
    res.json({ correct: false, message: 'Incorrect. Try again!', filteredGuess: storedGuess });
    console.log("Guess", storedGuess);
  }
});

// Endpoint to get site data
app.get('/api/site-data', (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  if (stats.date !== today) {
    stats.date = today;
    stats.total_wins = 0;
  }
  console.log(`api stats ${stats.total_wins}`);
  res.json({ count: stats.total_wins });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
