const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

console.log(process.env.PORT);

//Servidor EXPRESS
const app = express();

//BaseData
dbConnection();

//CORS
app.use(cors());

//Directorio Publico
app.use( express.static('public'));

//Lectura y Parseo de rutas
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));





app.listen(4000, () => {
    console.log(`Server run in ${process.env.PORT}`)
});