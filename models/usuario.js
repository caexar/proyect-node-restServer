
const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, "el nombre es obligatorio"] //el segundo parametro es el mensaje de error
    },
    correo: {
        type: String,
        required: [true, "el correo es obligatorio"], //el segundo parametro es el mensaje de error
        unique: true
    },
    contraseña: {
        type: String,
        required: [true, "la contraseña es obligatorio"] //el segundo parametro es el mensaje de error
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ["ADMIN_ROLE", "USER_ROLE"] //solo puede ser uno de estos dos roles
    },
    estado: {
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

});

UsuarioSchema.methods.toJSON = function(){
    const { __v, contraseña, _id, ...usuario } = this.toObject(); //extraemos las propiedades que no queremos que se muestren
    usuario.uid = _id;  //cambiamos el nombre de la propiedad _id a uid
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);
