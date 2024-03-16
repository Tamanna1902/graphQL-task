const mongoose = require('mongoose');
 
const DB = async () => {
    try{

        const conn = await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
          
        });
        console.log(`MongoDB connected to host ${conn.connection.host}`)
    } catch( err){
        console.log(err);
    }
}

module.exports = DB ; 
