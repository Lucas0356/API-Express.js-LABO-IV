const axios = require('axios');
const { request, response} = require('express');

const url = 'https://restcountries.com/v3.1/';

const getCountries = (req = request, res = response) => {        
    // const api = process.env.API_KEY;

    axios.get(`${url}/region/america`)
        .then(({ status, data, statusText }) => {

            const countries = data
            .map(country => ({ name: country.translations.spa.common,
                flag: country.flag, code: country.cioc,
                id: country.ccn3, capital: country.capital,  
                languages: country.languages }));

            // handle success
            console.log({ status, data, statusText });
            const {results, page } = data;
            res.status(200).json({
                status,
                cant: countries.length,
                countriesFromAmerica: countries,
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

const getCountryByCode = (req = request, res = response) => {        
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

const getCountriesByLanguage = (req = request, res = response) => {        
    // const api = process.env.API_KEY;
    const language = req.query.language;
    console.log(language);

    axios.get(`${url}/region/america/`)
        .then(({ status, data, statusText }) => {
            
            console.log("ANDA");

            const countryNames = data
            .filter(country => country.language === `${language}`)
            .map(country => ({ name: country.translations.spa.common,
                flag: country.flag, code: country.cioc,
                id: country.ccn3, capital: country.capital,
                languages: country.languages}));

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

module.exports = { getCountries, getCountriesByLanguage, getCountryByCode };