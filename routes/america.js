const { Router } = require('express');
const { getAmerica, getAmericaByLanguage, getAmericaByCode } = require('../controllers/america');

const rutas = Router();

rutas.get('/america', getAmerica);
rutas.get('/america', getAmericaByLanguage);
rutas.get('/america/:abreviacion', getAmericaByCode);


module.exports = rutas;