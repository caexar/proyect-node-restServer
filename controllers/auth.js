const { response } = require('express');
const bcriptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res =response) =>{

    const {correo, contraseña} = req.body;
    try {
    
        //verificar si el email existe
        const usuario = await Usuario.findOne({correo});   
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        //si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        //verificar la contraseña

        const validPassword = bcriptjs.compareSync(contraseña, usuario.contraseña);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - contraseña'
            });
        }

        //generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }


}

module.exports = {
    login
}