//const express = require('express');
import express from "express";
//const cors = require('cors');
import cors from "cors";
//const { dbConnection } = require('../database/config');
import { dbConnection } from "../database/config.js";
//import {router} from "../routes/usuarios.js";
import usersRutas from "../routes/usuarios.js";
//import * as usersRutas from '../routes/usuarios.js';

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
        //************ error en la ruta */
        this.app.use( this.usuariosPatch, usersRutas );// inquire("../routes/usuarios") //cargamos la ruta de usuarios
    }
    

    listen(){
        this.app.listen(this.port, () => {
            console.log("servidor corriendo.. en el puerto: " + this.port); //mensaje de servidor corriendo
        });
    }
}

//module.exports = Server;
export default Server;