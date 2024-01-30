const axios = require('axios');
const { request, response} = require('express');

const url = 'https://restcountries.com/v3.1/region/america';

// Obtener todos los países de África
const getCountries = (req = request, res = response) => {      

    axios.get(`${url}`)
        .then(({ status, data, statusText }) => {
            // Mapeamos los datos de los países de América para seleccionar ciertos atributos:
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

            // Devolvemos la respuesta en formato JSON
            res.status(200).json({
                status,
                countryCount: countryCount,
                americanCountries: countries,
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

// Buscar país de América por su código de país (3 letras)
const getCountryByCode = (req = request, res = response) => {        

    const { param } = req.params;
    const abreviacion = param.toUpperCase();

    axios.get(`${url}`)
        .then(({ status, data, statusText }) => {
            // Mapeamos los datos de los países de América para seleccionar ciertos atributos:
            const country = data.filter(country => country.cioc === abreviacion)
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
                region: country.region,
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
                    msg: `No existen países con el código ${abreviacion} en América.`,
                });
                return;
            }

            // Handle success
            console.log({ status, data, statusText });
            res.status(200).json({
                status,
                cant: countryCount,
                country: country,
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

// Buscar país de América por su ID
const getCountryById = (req = request, res = response) => {

    const { id } = req.params;

    axios.get(`${url}`)
        .then(({ status, data, statusText }) => {
            // Mapeamos los datos de los países de América para seleccionar ciertos atributos:
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
                region: country.region,
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

const getCountriesByLanguage = (req = request, res = response) => {        

    const { language } = req.query;
    const languageFixed = language.charAt(0).toUpperCase() + language.slice(1)

    axios.get(`${url}`)
        .then(({ status, data, statusText }) => {
            // Mapeamos los datos de los países de América para seleccionar ciertos atributos:
            const countries = data
            .filter(country => {
                // Verificar si el país tiene la propiedad 'languages' y si el idioma está presente
                return country.languages && Object.values(country.languages).includes(languageFixed);
            })
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
                languages: country.languages
            }));

            // Cantidad de países en el objeto
            const countryCount = countries.length;

            // Si no encontró al país, devolvemos un 404 not found
            if (countryCount=== 0){
                res.status(404).json({
                    status: 404,
                    msg: `No existen países en América con el lenguaje '${languageFixed}.'`,
                });
                return;
            }

            // Handle success
            console.log({ status, data, statusText });
            res.status(200).json({
                status,
                countryCount: countryCount,
                countriesWithLanguage: countries,
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

module.exports = { getCountries, getCountryByCode, getCountriesByLanguage, getCountryById };