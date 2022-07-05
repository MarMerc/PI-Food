const { Router } = require('express');
const axios = require('axios');
const { Diet, Recipe } =require ('../db');
const {testFunction, getRecipeAll} = require('../services/RecipesService.js');
const {
    API_URL_KEY,
  } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const RecipesRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//TEST DE FUNCIONAMIENTO
RecipesRouter.get('/', testFunction);

//OBTENER TODAS LAS RECITAS
RecipesRouter.get('/all', getRecipeAll);

// OBTENER LISTADOS DE RECETAS POR NOMBRE INGRESADO (QUERY PARAMS)
// GET /recipes?name="...": 
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado

RecipesRouter.get('/title', (req,res)=>{
    return res.send('RECETAS POR UN NOMBRE INGRESADO')
});

//OBTENER EL DETALLE DE UNA RECETA EN PARTICULAR
// [ ] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados

RecipesRouter.get('/:title', (req,res)=>{
    return res.send('DETALLE DE UNA RECETAS INGRESADA POR NOMBRE')
});

//CREAR UNA RECETA NUEVA EN BASE DE DATOS
// [ ] POST /recipes:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos relacionada con sus tipos de dietas.

RecipesRouter.post('/create', (req,res)=>{
    return res.send('CREACION DE RECETA NUEVA EN BD')
});

module.exports = RecipesRouter;
