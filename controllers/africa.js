const axios = require('axios');
const { request, response} = require('express');

const url = 'https://restcountries.com/v3.1/region/africa';

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

            console.log({ status, data, statusText });
            const { results } = data;
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

const getCountriesUpToPopulation = (req = request, res = response) => {
    // const api = process.env.API_KEY;
    const population = req.query.population;
    console.log(population);

    axios.get(`${url}`)
    .then(({ status, data, statusText }) => {
        console.log('anda')
        console.log('anda')
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

        if (cantCountries === 0){
            res.status(404).json({
                status: 404,
                msg: `No existen países con menos de ${population} de población en África.`,
            });
            return;
        }

        // handle success
        const {results, page } = data;
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

module.exports = { getCountries, getCountriesUpToPopulation };