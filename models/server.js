const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    
    constructor(){
        this.app = express(); //inicializamos express
        this.port = process.env.PORT; //puerto de la aplicacion
        this.usuariosPatch = '/api/usuarios'; //ruta de usuarios
        
        
        this.app.use(express.json()); //para que el servidor pueda entender los json 

        this.conectarDB(); //llamamos a la funcion de conectar a base de datos

        this.middlewares(); //llamamos a la funcion de middlewares

        this.routes(); //llamamos a la funcion de rutas
    }

    async conectarDB(){
        //conectar a base de datos
        await dbConnection(); //llamamos a la funcion de conectar a base de datos

    }


    middlewares(){

        //cors
        this.app.use(cors()); //permite que cualquier aplicacion pueda hacer peticiones a nuestro servidor

        // Directorio publico
        this.app.use(express.static('public')); //para que el servidor pueda servir archivos estaticos
    }

    routes() {
        this.app.use( this.usuariosPatch, require('../routes/usuarios')); //cargamos la ruta de usuarios
    }
    

    listen(){
        this.app.listen(this.port, () => {
            console.log("servidor corriendo.. en el puerto: " + this.port); //mensaje de servidor corriendo
        });
    }
}

module.exports = Server;