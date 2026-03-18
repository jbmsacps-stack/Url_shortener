const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Url = require('../models/Url');

// No more nanoid — using built-in crypto instead
function generateCode(size = 6) {
  return crypto.randomBytes(size).toString('base64url').slice(0, size);
}

// ── 1. POST /api/shorten ──
router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Please provide a URL' });
  }

  // Basic URL validation
  try {
    new URL(originalUrl); // throws if invalid URL
  } catch {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  try {
    // Check if already exists
    let existing = await Url.findOne({ originalUrl });
    if (existing) {
      return res.json({
        shortUrl: `${process.env.BASE_URL}/${existing.shortCode}`
      });
    }

    // Create new
    const shortCode = generateCode();
    const newUrl = new Url({ originalUrl, shortCode });
    await newUrl.save();

    res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });

  } catch (err) {
    console.error('SHORTEN ERROR:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── 2. GET /stats ──
router.get('/stats', async (req, res) => {
  try {
    const total = await Url.countDocuments();
    res.json({ total });
  } catch (err) {
    console.error('STATS ERROR:', err.message);
    res.json({ total: 0 });
  }
});

// ── 3. GET /:code → redirect (wildcard LAST) ──
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (!url) {
      return res.status(404).send('URL not found');
    }

    url.clicks++;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    console.error('REDIRECT ERROR:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;