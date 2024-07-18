const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

// Serve static files from the public directory
app.use(express.static('../public'));

// Load weapons data
const weapons = JSON.parse(fs.readFileSync(path.join(__dirname, '../weapons.json'), 'utf-8'));

// Select a daily weapon (simple example, improve this as needed)
const dailyWeapon =  weapons[Math.floor(Math.random() * weapons.length)];

// Endpoint to get daily weapon attributes
app.get('/api/daily-weapon', (req, res) => {
  const { name, ...attributes } = dailyWeapon;
  res.json(attributes);
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
    res.json({ correct: true, message: 'Correct! You guessed the daily weapon.',filteredGuess: storedGuess});
    console.log("Guess",storedGuess);
  } else {
    const storedGuess = weapons.find(weapon => weapon.name.toUpperCase() === userGuess);
    console.log("more backend test: ", storedGuess);
    res.json({ correct: false, message: 'Incorrect. Try again!', filteredGuess: storedGuess });
    console.log("Guess",storedGuess);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
