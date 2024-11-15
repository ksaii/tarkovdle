// controllers/statsController.js
const db = require('../models/db');

// Create
exports.createStat = async (req, res) => {
  const { date, total_global_wins, last_reset_key, daily_weapon } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO site_stats (date, total_global_wins, last_reset_key, daily_weapon) VALUES (?, ?, ?, ?)',
      [date, total_global_wins, last_reset_key, daily_weapon]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get stats
exports.getStats = async (req, res) => {
  try {
    console.log('Attempting to fetch site stats...');
    const [rows] = await db.execute('SELECT * FROM site_stats');
    console.log('Fetched site stats:', rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching site stats:', error.message);
    res.status(500).json({ error: error.message });
  }
};


// Update
exports.updateStat = async (req, res) => {
  const { date } = req.params;
  const { total_global_wins, last_reset_key, daily_weapon } = req.body;
  try {
    await db.execute(
      'UPDATE site_stats SET total_global_wins = ?, last_reset_key = ?, daily_weapon = ? WHERE date = ?',
      [total_global_wins, last_reset_key, daily_weapon, date]
    );
    res.status(200).json({ message: 'Stat updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
exports.deleteStat = async (req, res) => {
  const { date } = req.params;
  try {
    await db.execute('DELETE FROM site_stats WHERE date = ?', [date]);
    res.status(200).json({ message: 'Stat deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
