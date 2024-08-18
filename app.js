require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

//middelwares

app.use(cors());
app.use(express.json());

app.use('/api/cars', require('./routes/car.routes'));

const {dbConnection} = require('./database/config');
dbConnection();

app.listen(process.env.PORT, ()=> {
    console.log('El servidor esta corriendo en el puerto ' + process.env.PORT)
});

