const { Router } = require('express');
const { getAfrica } = require('../controllers/africa');

const rutas = Router();

rutas.get('/africa', getAfrica);

module.exports = rutas;