const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { handleError } = require('./utils/errorHandler');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;