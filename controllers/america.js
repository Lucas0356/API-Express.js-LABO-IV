const axios = require('axios');
const { request, response} = require('express');

const url = 'https://restcountries.com/v3.1/';

const getAmerica = (req = request, res = response) => {        
    // const api = process.env.API_KEY;

    axios.get(`${url}/region/america/`)
        .then(({ status, data, statusText }) => {

            const countryNames = data
            .map(country => ({ name: country.translations.spa.common,
                flag: country.flag, code: country.cioc,
                id: country.ccn3, capital: country.capital,  
                languages: country.languages }));

            // handle success
            console.log({ status, data, statusText });
            const {results, page } = data;
            res.status(200).json({
                status,
                countries: countryNames,
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

const getAmericaByLanguage = (req = request, res = response) => {        
    // const api = process.env.API_KEY;
    const { language } = req.query;
    console.log(language);

    axios.get(`${url}/region/america/`)
        .then(({ status, data, statusText }) => {

            const countryNames = data
            .filter(country => country.language.spa === `${language}`)
            .map(country => ({ name: country.translations.spa.common,
            capital: country.capital, flag: country.flag, 
            language: country.languages, code: country.cioc,
            id: country.ccn3}));

            // handle success
            console.log({ status, data, statusText });
            const {results, page } = data;
            res.status(200).json({
                status,
                countries: countryNames,
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

const getAmericaByCode = (req = request, res = response) => {        
    // const api = process.env.API_KEY;

    const { abreviacion } = req.params;
    console.log(abreviacion);

    axios.get(`${url}/alpha/${abreviacion}`)
        .then(({ status, data, statusText }) => {

            const country = data
            .map(country => ({ name: country.translations.spa.common,
                flag: country.flag, code: country.cioc,
                id: country.ccn3, capital: country.capital,  
                languages: country.languages, poblation: country.population, 
                currencies: country.currencies, region: country.region,
                subregion: country.subregion, borders: country.borders}));

            // handle success
            console.log({ status, data, statusText });
            res.status(200).json({
                status,
                country: country,
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

const getAmericaFiltrado = (req = request, res = response) => {        
    // const api = process.env.API_KEY;

    const { capital } = req.query;
    console.log(capital);
    return;

    axios.get(`${url}/capital/${capital}`)
        .then(({ status, data, statusText }) => {
            // handle success
            console.log({ status, data, statusText });
            const { name, capital } = data[0];
            res.status(200).json({
                status,
                name,
                capital,
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




module.exports = { getAmerica, getAmericaByLanguage, getAmericaByCode };