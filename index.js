import express from 'express';
import router from './routes/index.js';
import morgan from 'morgan';
import db from './config/db.js';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import PassportLocals from 'passport-local'
import  serializeUser from 'passport';
var PassportLocal = PassportLocals.Strategy;
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'})





import {Viaje}  from './models/Viaje.js'

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(fileUpload()); 
//Define port
const port = process.env.PORT || 4500;
const host = process.env.HOST || '0.0.0.0';

app.listen(port,host,  () =>{
    console.log(`El servidor esta corriendo en el puesto ${port}`)

//conectar db 
db.authenticate()
.then ( () => console.log('Base de datos conectada'))
.catch ( error => console.log(error))   ;



//Habilita Pug
app.set('view engine', 'pug');

//Obteniedo año actual (variables Globales)
app.use((req, res, next ) =>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();  //Agrega las variables actual year a las vistas pug
    res.locals.nombreSitio = "Agencia De Viajes"
    return next();  
})


//Definir la carpeta publica
app.use(express.static('public'));




//----------------------- Inicio de Sesion
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
 }));




/// Nodemailer




/////////////////////////////


 //configurar passport

 app.use(passport.initialize());
 app.use(passport.session());




//Definir la carpeta publica
app.use(express.static('public'));  




//DEfine rutas
app.use('/', router);
})