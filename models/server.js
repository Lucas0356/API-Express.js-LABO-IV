const express = require('express');
const cors = require('cors'); 
class Server{
    constructor(){
        this.port = process.env.PORT || 3000;

        this.app = express();

        // 1° en Orden
        this.middleware();

        // 2° en Orden
        this.routers();
    }

    middleware(){
        // Habilitar CORS
        this.app.use(cors());

        // Validar api_key
        this.app.use((req, res, next) => {
            // Obtenemos la api_key pasada como un Query Param.
            const apiKey = req.headers.api_key;

            // Traemos la lista de claves autorizadas.
            const authorizedApiKeys = process.env.API_KEY;

            // Verificamos que la api_key pasada como parámetro sea una de las autorizadas.
            if (!apiKey || !authorizedApiKeys.includes(apiKey)) {
                // Si no lo es, rechazamos la petición y devolvemos la respuesta adecuada.
                return res.status(401).json({
                    status: 401, 
                    error: 'Acceso no autorizado'
                });
            }
            // Si la api_key es una de las autorizadas, el programa continúa de forma normal.
            next();
        });
        
        //Una vez que se configura esta sección publica, NO 
        //es posible utilizar
        this.app.use(express.static('public'));
    }

    routers(){
        this.app.use('/api/v1/countries', require('../routes/america'));
        this.app.use('/api/v1/countries', require('../routes/africa'));

        this.app.all('*', (req, res) => {
            res.status(404).json({
                status: 404,
                message:'Page Not Found'})
        })
    }

    listen(){
        this.app.listen(this.port, () =>{    
            console.log(`App escuchando en el puerto ${this.port}`);
        });
    }

}

module.exports = Server;