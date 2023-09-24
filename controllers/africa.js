const axios = require('axios');
const { request, response} = require('express');

const url = 'https://restcountries.com/v3.1/region/africa';

const getAfrica = (req = request, res = response) => {        
    // const api = process.env.API_KEY;

    axios.get(`${url}/`)
        .then(({ status, data, statusText }) => {
            // handle success
            console.log({ status, data, statusText });
            const {results, page } = data;
            res.status(200).json({
                status,
                results,
                page,
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