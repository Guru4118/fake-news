require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authroutes');
const factCheckRoutes = require('./routes/factCheckRoutes');

const app = express();
connectDB();

// CORS & JSON parsing
app.use(cors());
app.use(express.json());

// ✅ Global Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store'); // Or: 'public, max-age=31536000' for static files
  // Don't force Content-Type globally unless you're sure. Let route handlers override.
  next();
});

// Static files (optional: set long cache for static)
app.use('/uploads', express.static('uploads', {
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year cache
  }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/fact-check', factCheckRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
