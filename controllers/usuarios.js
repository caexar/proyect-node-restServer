const {response, request} = require('express'); // express siendo express 
const bcrypt = require('bcryptjs'); //npm para incriptar contraseñas


const Usuario = require('../models/usuario'); 


const usuariosGet = async (req = request, res = response) => {
    //const {q, nombre = "no name", apikey, page = 1, limit} = req.query;

    const {limite = 5, desde = 0} = req.query; //para obtener el query de la peticion y el limite por defecto es 5
    const query = {estado: true}; //para filtrar los usuarios que esten activos

    
    //Mensaje de error si ingresa cuaquier cosa q no sea un numero
    //if (!isNaN(desde) && !isNaN(limite)) {
    //    res.json({
    //        usuario
    //    });    
    //} else {
    //    throw new Error(`Parametros de busqueda incorrectos, ingrese numeros`);
    //}

    //con esta desestructuracion en promesa el tiempo de ejecucion se reduce a mas de la mitad
    const [total, usuario] = await Promise.all([ //para ejecutar varias promesas al mismo tiempo
        Usuario.countDocuments(query), //contamos los documentos de la base de datos
        Usuario.find(query) //buscamos todos los usuarios en la base de datos
            .skip(Number(desde)) //saltamos los primeros "desde" usuarios que hay en la base de datos
            .limit(Number(limite)) //limitamos la busqueda a "limite"
    ]);

    res.json({
        total, 
        usuario
    });
    
        
}


const usuariosPost = async (req, res = response) => {



    const {nombre, correo, contraseña, rol} = req.body; //para obtener el body de la peticion
    const usuario = new Usuario({nombre, correo, contraseña, rol}); //creamos una instancia de usuario con el body de la peticion

    //verificar si el correo existe
    

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync(); //encriptamos con la funcion genSaltSync("numero de vueltas por defecto 10")
    usuario.contraseña = bcrypt.hashSync(contraseña, salt); //encriptamos la contraseña con la funcion hashSync("contraseña", "salt")

    await usuario.save(); //guardamos el usuario en la base de datos

    res.json({
        usuario 
    });
}

const usuariosPut = async (req, res = response) => {
    const {id} = req.params;
    const {_id, contraseña, google, correo, ...resto}    = req.body;

    //TODO validar contra base de datos
    //validar contraseña
    if(contraseña){
        const salt = bcrypt.genSaltSync(); //encriptamos con la funcion genSaltSync("numero de vueltas por defecto 10")
        resto.contraseña = bcrypt.hashSync(contraseña, salt); //encriptamos la contraseña con la funcion hashSync("contraseña", "salt")
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true}); //actualizamos el usuario en la base de datos

    res.json(usuario);
}

const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;

    //fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);

    //cambiamos el estado a false para que no se muestre en la base de datos
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "patch API - controlador"
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
};


