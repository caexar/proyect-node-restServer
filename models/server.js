const express = require('express');
const cors = require('cors');

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPatch = '/api/usuarios';
        
        //lectura y parseo del body
        this.app.use(express.json());

        // Middlewares
        this.middlewares();

        // Ruta de mi aplicacion
        this.routes();
    }

    middlewares(){

        //cors
        this.app.use(cors());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use( this.usuariosPatch, require('../routes/usuarios'));
    }
    

    listen(){
        this.app.listen(this.port, () => {
            console.log("servidor corriendo.. en el puerto: " + this.port);
        });
    }
}

module.exports = Server;