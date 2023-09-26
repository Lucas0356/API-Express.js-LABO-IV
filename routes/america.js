const { Router } = require('express');
const { getCountries, getCountryByCode, getCountriesByLanguage } = require('../controllers/america');

const rutas = Router();

// Obtener todos los países de América
rutas.get('/america/all', getCountries);

// Filtrar países de América por su lenguaje
rutas.get('/america/language', getCountriesByLanguage);

// Buscar país de África por su código de país (ARG, USA, etc)
rutas.get('/america/:param', getCountryByCode);

module.exports = rutas;