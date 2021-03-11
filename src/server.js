const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importando base de datos
const mongoose = require('./config/database');
// Importando rutas
const catalogueRoutes = require('./routes/catalogue.router');
const authRoutes = require('./routes/user.router');
const dashboardRoutes = require('./routes/user.router');

// Custom middlewares
const verifyTokenUser = require('./middlewares/validate_token');

const app = express();

const PORT = process.env.DB_PORT

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));

// uso de rutas
app.use('/api/catalogues', verifyTokenUser, catalogueRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/home', verifyTokenUser, dashboardRoutes);


app.listen(PORT, () => console.log(`Server running on port: http//localhost:${PORT}`));