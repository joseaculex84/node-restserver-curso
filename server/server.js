require('./config/config.js');

const express = require('express')
const mongoose = require('mongoose');
const path = require('path');


const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

//********** COnfiguración Global de Rutas******/
app.use(require('./routes/index'));


/*mongoose.connect('mongodb://locahost:27017/cafe', (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});*/

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true // Se agrega por collection.ensureIndex está depreca
}, (err, resp) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});