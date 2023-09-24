const axios = require('axios');
const { request, response} = require('express');

const url = 'https://restcountries.com/v3.1/';

const getAmerica = (req = request, res = response) => {        
    // const api = process.env.API_KEY;

    axios.get(`${url}/region/america/`)
        .then(({ status, data, statusText }) => {
            // handle success
            console.log({ status, data, statusText });
            const {results, page } = data;
            res.status(200).json({
                status,
                data,
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

const getAmericaID = (req = request, res = response) => {        
    // const api = process.env.API_KEY;

    const { abreviacion } = req.params;

    axios.get(`${url}/alpha/${abreviacion}`)
        .then(({ status, data, statusText }) => {
            // handle success
            console.log({ status, data, statusText });
            res.status(200).json({
                status,
                data,
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




module.exports = { getAmerica, getAmericaID, getAmericaFiltrado };