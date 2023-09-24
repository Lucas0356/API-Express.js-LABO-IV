const { Router } = require('express');
const { getCountries, getCountriesByLanguage, getCountryByCode } = require('../controllers/america');

const rutas = Router();

rutas.get('/america', getCountriesByLanguage);
rutas.get('/america', getCountries);
rutas.get('/america/:abreviacion', getCountryByCode);


module.exports = rutas;