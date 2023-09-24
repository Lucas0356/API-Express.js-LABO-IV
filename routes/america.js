const { Router } = require('express');
const { getAmerica, getAmericaID, getAmericaFiltrado } = require('../controllers/america');

const rutas = Router();

rutas.get('/america', getAmerica);
rutas.get('/americaf/', getAmericaFiltrado);
rutas.get('/america/:abreviacion', getAmericaID);


module.exports = rutas;