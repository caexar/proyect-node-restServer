const Role = require("../models/role");
const Usuario = require("../models/usuario");


const esRoleValido = async(rol = "") =>{ //el segundo parametro es el mensaje de error, el custom es para que sea un rol valido
    
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
            throw new Error(`El rol ${rol} no esta registrado en la BD`); //el throw es para que se detenga la ejecucion
    }
}

const emailExiste = async(correo = "") => {
    const existeEmail = await Usuario.findOne({correo}); //buscamos un usuario con el correo que nos llega en la peticion
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado en la BD, por favor use otro`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id); //buscamos un usuario con el id que nos llega en la peticion
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe en la BD`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}