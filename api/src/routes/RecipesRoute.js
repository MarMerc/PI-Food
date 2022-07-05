const { Router } = require('express');
const axios = require('axios');
const { Diet, Recipe } =require ('../db');
const {getRecipeTitle, getRecipeId, postRecipe} = require('../services/RecipesService.js');
const {
    API_URL_KEY,
  } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const RecipesRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//TEST DE FUNCIONAMIENTO
//RecipesRouter.get('/', testFunction);

//OBTENER TODAS LAS RECETAS
//RecipesRouter.get('/', getAllRecipes);

//OBTENER UNA RECETA POR ID INGRESADO
// // [ ] GET /recipes/{idReceta}:
// // Obtener el detalle de una receta en particular
// // Debe traer solo los datos pedidos en la ruta de detalle de receta
// // Incluir los tipos de dieta asociados//OBTENER TODAS LAS RECITAS



// OBTENER LISTADOS DE RECETAS POR NOMBRE INGRESADO (QUERY PARAMS)
// GET /recipes?name="...": 
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado

RecipesRouter.get('/', getRecipeTitle);

RecipesRouter.get('/:id', getRecipeId);

// //CREAR UNA RECETA NUEVA EN BASE DE DATOS
// // [ ] POST /recipes:
// // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// // Crea una receta en la base de datos relacionada con sus tipos de dietas.

RecipesRouter.post('/create', postRecipe);

module.exports = RecipesRouter;
