const { Router } = require('express');
const { axios } = require('axios');
const { Diet, Recipe } =require ('../db');
const RecipesRouter= require('./RecipesRoute');
const DietsRouter= require('./DietsRoute');
const {
    API_URL_KEY,
  } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use('/recipes', RecipesRouter);
router.use('/diets', DietsRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;

