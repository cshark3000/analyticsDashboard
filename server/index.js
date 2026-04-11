'use strict';

const express = require('express');
const cors    = require('cors');

const usersRouter   = require('./routes/users');


const app  = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:5173' })); // Vite dev server
app.use(express.json());

// ─── Request logger ──────────────────────────────────────────────────────────
app.use((req, _res, next) => {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${req.method} ${req.url}`);
  next();
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/users',   usersRouter);


// ─── Health-check ────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), ts: new Date().toISOString() });
});

// ─── 404 fallback ────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ─── Error handler ───────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  🟢  API server running at http://localhost:${PORT}`);
  console.log(`  📡  Endpoints:`);
  console.log(`       GET /api/health`);
  console.log(`       GET /api/users/{kpis,activity,growth,devices,geo}`);
});

module.exports = app;
