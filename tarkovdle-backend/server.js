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
const dailyWeapon = weapons[Math.floor(Math.random() * weapons.length)];

// Endpoint to get daily weapon attributes
app.get('/api/daily-weapon', (req, res) => {
  const { name, ...attributes } = dailyWeapon;
  res.json(attributes);
});

// Endpoint to get all weapon names for autocomplete
app.get('/api/weapon-names', (req, res) => {
  const weaponNames = weapons.map(weapon => weapon.name);
  res.json(weaponNames);
});

// Endpoint to validate user guess
app.get('/api/validate-guess', (req, res) => {
  const userGuess = req.query.guess;
  if (userGuess === dailyWeapon.name) {
    res.json({ correct: true, message: 'Correct! You guessed the daily weapon.' });
  } else {
    res.json({ correct: false, message: 'Incorrect. Try again!' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
