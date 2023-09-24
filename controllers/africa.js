const axios = require('axios');
const { request, response} = require('express');

const url = 'https://restcountries.com/v3.1/region/africa';

// Obtener todos los países de África
const getCountries = (req = request, res = response) => {        
    // const api = process.env.API_KEY;

    axios.get(`${url}/`)
        .then(({ status, data, statusText }) => {
            // handle success

            /* Seleccionamos los datos que vamos a querer mostrar 
            Nombre del país (en español), bandera, codigo (3 letras), ID (num)
            nombre de la/s capital/es y los lenguajes hablados en el país */
            const countries = data
            .map(country => ({ name: country.translations.spa.common, 
                flag: country.flag, code: country.cioc, id: country.ccn3,
                capital: country.capital, languages: country.languages}));

            // Cantidad de países en el objeto Map
            const cantCountries = countries.length;

            // Imprimimos en consola los datos
            console.log({ status, data, statusText });

            // Devolvemos el JSON con la info
            res.status(200).json({
                status,
                cant: cantCountries,
                countriesFromAfrica: countries,
                statusText,               
            });
        })
        .catch((error)=>{
            // handle error
            console.log(error);
            res.status(400).json({
                status:400,
                msg: 'Error inesperado'
            });
        });        
}

// Filtrar países de África hasta x cantidad de población
const getCountriesUpToPopulation = (req = request, res = response) => {
    // const api = process.env.API_KEY;
    const population = req.query.population;

    axios.get(`${url}`)
        .then(({ status, data, statusText }) => {
        const countries = data
            .filter(country => country.population <= population)
            .map(country => ({
                name: country.translations.spa.common,
                flag: country.flag, 
                code: country.cioc,
                id: country.ccn3,
                capital: country.capital,
                languages: country.languages,
                population: country.population
            }));

        // Cantidad de países en el objeto Map
        const cantCountries = countries.length;

        // Si no encontró ningún país, devolvemos un 404 not found
        if (cantCountries === 0){
            res.status(404).json({
                status: 404,
                msg: `No existen países con menos de ${population} de población en África.`,
            });
            return;
        }

        // handle success
        res.status(200).json({
            status,
            cant: cantCountries,
            countries: countries,
            statusText,               
        });
    })
    .catch((error)=>{
        // handle error
        console.log(error);
        res.status(400).json({
            status:400,
            msg: 'Error inesperado'
        });
    }); 
}

// Buscar país de África por su ID
const getCountryById = (req = request, res = response) => {
    // const api = process.env.API_KEY;
    const { id } = req.params;

    axios.get(`${url}`)
        .then(({ status, data, statusText }) => {
            const country = data
            .filter(country => country.ccn3 === id)
            .map(country => ({ 
                name: country.translations.spa,
                flag: country.flag, 
                code: country.cioc,
                id: country.ccn3, 
                capital: country.capital,  
                languages: country.languages, 
                population: country.population, 
                currencies: country.currencies, 
                region: country.region,
                subregion: country.subregion, 
                borders: country.borders
            }));
        
        // Cantidad de países en el objeto Map
        const cantCountries = country.length;

        // Si no encontró al país, devolvemos un 404 not found
        if (cantCountries === 0){
            res.status(404).json({
                status: 404,
                msg: `No existen países con el id ${id} en África.`,
            });
            return;
        }

        // handle success
        console.log({ status, data, statusText });
        res.status(200).json({
            status,
            cant: cantCountries,
            country: country,
            statusText,               
        });
    })
}


module.exports = { getCountries, getCountriesUpToPopulation, getCountryById };