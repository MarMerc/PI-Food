const { Router } = require('express');
const { axios } = require('axios');
const { Diet, Recipe } =require ('../db');
const {
    API_URL_KEY,
  } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const DietsRouter = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

DietsRouter.get('/', (req,res)=>{
    return res.send('Diets funcionando!')
});

// [ ] GET /diets:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular

DietsRouter.get('/all', (req,res)=>{
  return res.send('TODAS LAS DIETAS')
});

module.exports = DietsRouter;

