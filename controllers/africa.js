const axios = require('axios');
const { request, response} = require('express');

const url = 'https://restcountries.com/v3.1/region/africa';

// Obtener todos los países de África
const getCountries = (req = request, res = response) => {        

    axios.get(`${url}`)
        .then(({ status, data, statusText }) => {
            // Mapeamos los datos de los países de África para seleccionar ciertos atributos:
            const countries = data.map(country => ({
                // Nombre del país (en español)
                name: country.translations.spa.common,
                // Bandera
                flag: country.flag,
                // Código de país (3 letras)
                code: country.cioc,
                // ID del país (num)
                id: country.ccn3,
                // Nombre de la(s) capital(es)
                capital: country.capital,
                // Lenguajes hablados en el país
                languages: country.languages
            }));

            // Cantidad de países en el objeto
            const countryCount = countries.length;

            // Handle success
            res.status(200).json({
                status,
                countryCount: countryCount,
                africanCountries: countries,
                statusText
            });
        })
        .catch((error)=>{
            // Handle error
            console.log(error);
            res.status(400).json({
                status:400,
                msg: 'Error inesperado'
            });
        });        
}

// Buscar país de África por su ID
const getCountryById = (req = request, res = response) => {

    const { id } = req.params;

    axios.get(`${url}`)
        .then(({ status, data, statusText }) => {
            // Mapeamos los datos de los países de África para seleccionar ciertos atributos:
            const country = data.filter(country => country.ccn3 === id)
            .map(country => ({
                // Nombre del país (oficial y common)
                name: country.translations.spa,
                // Bandera
                flag: country.flag,
                // Código de país (3 letras)
                code: country.cioc,
                // ID del país (num)
                id: country.ccn3,
                // Nombre de la(s) capital(es)
                capital: country.capital,
                // Lenguajes hablados en el país
                languages: country.languages,
                // Población
                population: country.population, 
                // Monedas de curso legal
                currencies: country.currencies,
                // Región del país
                region: 'africa',
                // Subregión del país
                subregion: country.subregion, 
                // Países limítrofes
                borders: country.borders
            }));

            // Cantidad de países en el objeto
            const countryCount = country.length;

            // Si no encontró al país, devolvemos un 404 not found
            if (countryCount === 0){
                res.status(404).json({
                    status: 404,
                    msg: `No existen países con el id ${id} en África.`,
                });
                return;
            }

            // Handle success
            console.log({ status, data, statusText });
            res.status(200).json({
                status,
                countryCount: countryCount,
                country: country,
                statusText
            });
        })
        .catch((error)=>{
            // Handle error
            console.log(error);
            res.status(400).json({
                status:400,
                msg: 'Error inesperado'
            });
        });  
}

// Filtrar países de África hasta x cantidad de población
const getCountriesUpToPopulation = (req = request, res = response) => {

    const population = req.query.population;

    axios.get(`${url}`)
        .then(({ status, data, statusText }) => {
        // Mapeamos los datos de los países de América para seleccionar ciertos atributos:
        const countries = data
            // Verificar que el país tiene una población menor/igual que la ingresada por el usuario
            .filter(country => country.population <= population)
            .map(country => ({
                // Nombre del país (oficial y common)
                name: country.translations.spa,
                // Bandera
                flag: country.flag,
                // Código de país (3 letras)
                code: country.cioc,
                // ID del país (num)
                id: country.ccn3,
                // Nombre de la(s) capital(es)
                capital: country.capital,
                // Lenguajes hablados en el país
                languages: country.languages,
                // Población
                population: country.population, 
            }));

        // Cantidad de países en el objeto
        const countryCount = countries.length;

        // Si no encontró ningún país, devolvemos un 404 not found
        if (countryCount === 0){
            res.status(404).json({
                status: 404,
                msg: `No existen países en África con una población menor o igual que '${population}'.`,
            });
            return;
        }

        // Handle success
        res.status(200).json({
            status,
            countryCount: countryCount,
            countries: countries,
            statusText,               
        });
    })
    .catch((error)=>{
        // Handle error
        console.log(error);
        res.status(400).json({
            status:400,
            msg: 'Error inesperado'
        });
    });   
}

module.exports = { getCountries, getCountryById, getCountriesUpToPopulation};