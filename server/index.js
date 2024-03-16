const express = require("express");
const env = require('dotenv').config();
const schema = require('./schema/schema.js');
const DB = require('./config/db.js');
const app  = express();
const { graphqlHTTP } = require('express-graphql')
// MongoDB connection function 
DB();
app.use('/graphiql' , graphqlHTTP({
      schema ,
      graphiql:true  
}))

const port = process.env.PORT || 4444 ; 


app.listen(port , () => { console.log(`App is running on port ${port}`)});
