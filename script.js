const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config(); // Load environment variables from .env file

async function insertWeapons() {

    
    // Create a pool connection to your local MySQL database 
    const connection = mysql.createPool({
        host: 'g9fej9rujq0yt0cd.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'iwx5uxm0fvc54u5o',
        password: 'g6x4dmtr7ung746g',
        database: 'gzjgt3q0sq4lwwcw',
        port: '3306', // Default to MySQL's default port if not specified
    
      });
    
    const weapons = JSON.parse(fs.readFileSync('weapons.json', 'utf8'));

    for (const weapon of weapons) {
        await connection.execute(
            'INSERT INTO weapons (name, type, ammo_type, firing_modes, price_range, weight, fire_rate, image, sound) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                weapon.name,
                weapon.type,
                weapon.ammo_type,
                JSON.stringify(weapon.firing_modes),
                weapon.price_range,
                weapon.weight,
                weapon.fire_rate,
                weapon.image,
                weapon.sound
            ]
        );
    }

    await connection.end();
}

insertWeapons().catch(console.error);
