const { Router } = require('express');
const { axios } = require('axios');
const { Diet, Recipe } =require ('../db');
const {testFunctionD,getDiets} = require('../services/DietsServices');
const {
    API_URL_KEY,
  } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const DietsRouter = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

DietsRouter.get('/create', getDiets);

// [ ] GET /diets:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular


module.exports = DietsRouter;

