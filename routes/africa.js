const { Router } = require('express');
const { getCountries, getCountriesUpToPopulation, getCountryById } = require('../controllers/africa');

const rutas = Router();

// Obtener todos los países de África
rutas.get('/africa/all', getCountries);

// Filtrar países de África hasta x cantidad de población
rutas.get('/africa/population', getCountriesUpToPopulation);

// Buscar país de África por su ID
rutas.get('/africa/:id', getCountryById);

module.exports = rutas;