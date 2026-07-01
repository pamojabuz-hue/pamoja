const express = require('express');
const router = express.Router();

// Reports Routes
// GET /sales - Sales report
// GET /inventory - Inventory report
// GET /revenue - Revenue report
// GET /top-products - Top selling products

router.get('/sales', (req, res) => {
  res.json({ message: 'Sales report - Coming soon' });
});

router.get('/inventory', (req, res) => {
  res.json({ message: 'Inventory report - Coming soon' });
});

router.get('/revenue', (req, res) => {
  res.json({ message: 'Revenue report - Coming soon' });
});

router.get('/top-products', (req, res) => {
  res.json({ message: 'Top products report - Coming soon' });
});

module.exports = router;
