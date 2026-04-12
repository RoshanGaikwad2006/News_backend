const express = require('express');
const router = express.Router();
const Ticker = require('../models/Ticker');

// Get the ticker item
router.get('/', async (req, res) => {
  try {
    let ticker = await Ticker.findOne();
    if (!ticker) {
      // Create a default one if none exists
      ticker = new Ticker({ en: [], mr: [] });
      await ticker.save();
    }
    res.json(ticker);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update the ticker item
router.put('/', async (req, res) => {
  try {
    let ticker = await Ticker.findOne();
    if (!ticker) {
      ticker = new Ticker(req.body);
      await ticker.save();
    } else {
      ticker.en = req.body.en || ticker.en;
      ticker.mr = req.body.mr || ticker.mr;
      await ticker.save();
    }
    res.json(ticker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
