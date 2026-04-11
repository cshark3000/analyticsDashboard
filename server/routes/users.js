'use strict';
const { Router } = require('express');
const store = require('../data/store');
const router = Router();

// GET /api/users/dashboard?range=30D
router.get('/dashboard', (req, res) => {
  const range = store.parseRange(req);
  res.json({
    kpi:      store.getUserKpis(range),
    activity: store.getUserActivity(range),
    growth:   store.getUserGrowth(range),
    devices:  store.getDeviceSplit(range),
    geo:      store.getGeoData(range),
  });
});

module.exports = router;
