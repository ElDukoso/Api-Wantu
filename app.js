const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
app.use(cors());
app.use(express.json());

// Definir rutas de API
app.use('/api', apiRoutes);

module.exports = app;
