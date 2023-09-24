const axios = require('axios');
const { request, response} = require('express');

const url = 'https://restcountries.com/v3.1/region/america';

const getCountries = (req = request, res = response) => {        
    // const api = process.env.API_KEY;

    axios.get(`${url}`)
        .then(({ status, data, statusText }) => {

            const countries = data
            .map(country => ({ 
                name: country.translations.spa.common,
                flag: country.flag, 
                code: country.cioc,
                id: country.ccn3,
                capital: country.capital,  
                languages: country.languages }));

            const cantCountries = countries.length;

            // handle success
            console.log({ status, data, statusText });
            res.status(200).json({
                status,
                cant: cantCountries,
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

    const { param } = req.params;
    const abreviacion = param.toUpperCase();
    console.log(abreviacion);

    axios.get(`${url}`)
        .then(({ status, data, statusText }) => {

            const country = data
            .filter(country => country.cioc === abreviacion)
            .map(country => ({ 
                name: country.translations.spa,
                flag: country.flag, 
                code: country.cioc,
                id: country.ccn3, 
                capital: country.capital,  
                languages: country.languages, 
                poblation: country.population, 
                currencies: country.currencies, 
                region: country.region,
                subregion: country.subregion, 
                borders: country.borders}));

            const cantCountries = country.length;

            if (cantCountries === 0){
                res.status(404).json({
                     status: 404,
                     msg: `No existen países con el código ${abreviacion} en América.`,
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
    const { language } = req.query;

    axios.get(`${url}`)
        .then(({ status, data, statusText }) => {
            
            const countries = data
            .filter(country => {
                // Verificar si el país tiene la propiedad 'languages' y si el idioma está presente
                return country.languages && Object.values(country.languages).includes(language);
              })
            .map(country => ({ 
                name: country.translations.spa.common,
                flag: country.flag, 
                code: country.cioc,
                id: country.ccn3, 
                capital: country.capital,
                languages: country.languages}));

            const cantCountries = countries.length;

            if (cantCountries === 0){
                res.status(404).json({
                     status: 404,
                     msg: `No existen países con el lenguaje ${language} en América.`,
                });
                return;
             }

            // handle success
            console.log({ status, data, statusText });
            res.status(200).json({
                status,
                cant: cantCountries,
                countriesWithLanguage: countries,
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