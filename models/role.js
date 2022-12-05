//const { Schema, model} = require("mongoose");
import { Schema, model } from "mongoose";

const RoleSchema = Schema({
    rol:{
        type: String,
        required: [true, "El rol es obligatorio"]
    }
});


//module.exports = model("role", RoleSchema);
export default model("role", RoleSchema);