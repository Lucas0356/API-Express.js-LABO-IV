const { Router } = require('express');
const { getCountries, getCountriesByLanguage, getCountryByCode } = require('../controllers/america');

const rutas = Router();

rutas.get('/america/all', getCountries);
rutas.get('/america/language', getCountriesByLanguage);
rutas.get('/america/:param', getCountryByCode);


module.exports = rutas;