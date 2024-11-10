// routes/stats.js
const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.post('/stats', statsController.createStat);
router.get('/stats', statsController.getStats);
router.put('/stats/:date', statsController.updateStat);
router.delete('/stats/:date', statsController.deleteStat);

module.exports = router;
