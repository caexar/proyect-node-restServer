const mongoose = require('mongoose');


const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN); //antes era nesesario confirmar parametros como este (userNewUrlParser: true ) pero en la version actual 6.+ ya no es necesario 
        console.log("Base de datos online");

        
    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de inicializar la base de datos");
    }


}



module.exports = {
    dbConnection
}

