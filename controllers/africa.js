const axios = require('axios');
const { request, response} = require('express');

const url = 'https://restcountries.com/v3.1/region/africa';

const getAfrica = (req = request, res = response) => {        
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

module.exports = { getAfrica };