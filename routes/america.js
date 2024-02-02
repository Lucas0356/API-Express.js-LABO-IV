const { Router } = require('express');
const { getCountries, getCountry, getCountriesByLanguage } = require('../controllers/america');

const rutas = Router();

// Obtener todos los países de América
rutas.get('/america/all', getCountries);

// Filtrar países de América por su lenguaje
rutas.get('/america/language', getCountriesByLanguage);

// Buscar país de América por su código de país (ARG, USA, etc) o por ID 
rutas.get('/america/:param', getCountry);

module.exports = rutas;