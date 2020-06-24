//  =======================
//   Puerto
//  =======================
process.env.PORT = process.env.PORT || 3000;

//  =======================
//   Entorno
//  =======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//  =======================
//   Vencimiento de Token
//  =======================
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;



//  =======================
//   SEED de Autenticación
//  =======================
//se declara una variable en Heroku para que tenga el valor de Secret
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


//  =======================
//   Base de datos
//  =======================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    //urlDB = 'mongodb+srv://Yoyi:Lt1aAYmF933a5HFb@cluster0-n3ahu.mongodb.net/cafe';
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;