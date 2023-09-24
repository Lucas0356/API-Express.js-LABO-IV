const { Router } = require('express');
const { getAfrica } = require('../controllers/africa');

const rutas = Router();

rutas.get('/africa/', getCountriesUpToPopulation);
rutas.get('/africa', getCountries);

module.exports = rutas;