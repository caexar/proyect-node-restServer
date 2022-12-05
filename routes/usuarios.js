//const { Router } = require('express');
import { Router } from 'express';
//const { check } = require('express-validator');
import { check } from 'express-validator';
/*const { usuariosGet, 
        usuariosDelete, 
        usuariosPost, 
        usuariosPut, 
        usuariosPatch } = require('../controllers/usuarios');*/
import {usuariosGet,
        usuariosPost,
        usuariosDelete,
        usuariosPut,
        usuariosPatch } from '../controllers/usuarios';

//const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
import { esRoleValido, emailExiste, existeUsuarioPorId } from '../helpers/db-validators';
//const { validarCampos } = require('../middlewares/validar-campos');
import { validarCampos } from '../middlewares/validar-campos';
//const role = require('../models/role');
import role from '../models/role.js';

const router = Router();

router.get('/',usuariosGet);

router.put('/:id',[
        check("id", "la id no es valida").isMongoId(),
        check("id").custom(existeUsuarioPorId),
        check("rol").custom( esRoleValido ),
        validarCampos
] ,usuariosPut);

router.post('/',[
        check("nombre", "el nombre es obligatorio").not().isEmpty(), //el segundo parametro es el mensaje de error, el not().isEmpty() es para que no este vacio
        check("contraseña", "la contraseña debe ser de mas de 6 digito").isLength({min: 6}), //el segundo parametro es el mensaje de error, el isLength es para que sea de mas de 6 digitos
        check("correo", "el correo no es valido").isEmail(), //el segundo parametro es el mensaje de error, el isEmail() es para que sea un correo
        check("correo").custom(emailExiste), //el segundo parametro es el mensaje de error, el custom es para que sea un correo valido
        //check("rol", "no es un usuario valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
        check("rol").custom( esRoleValido ),
        validarCampos
] ,usuariosPost);

router.delete('/:id',[
        check("id", "la id no es valida").isMongoId(),
        check("id").custom(existeUsuarioPorId),
        validarCampos
] ,usuariosDelete);

router.patch('/', usuariosPatch);

//module.exports = router;
export default router;