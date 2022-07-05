const { Router } = require('express');
const axios = require('axios');
const { Op } = require("sequelize");
const { Diet, Recipe } =require ('../db');
const {
    API_URL_KEY, API_URL_KEY_ID,API_KEY,
  } = process.env;

//TEST DE FUNCIONAMIENTO
const testFunction = (req,res,next)=>{
  try {
    return res.send('Recipes funcionando!');
  } catch (error) {
      next(error);
  };
};

//OBTENER TODAS LAS RECETAS API+DB
const getAllRecipes = async () => {
  try {
    const respuestaBD = await Recipe.findAll({include: Diet})
    const respuesta = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=d4e1aba089b944339aecd188294b3a5f&number=100&addRecipeInformation=true`);
    
    if(respuesta || respuestaBD){

    const respuestaApi = await respuesta.data.results?.map(i=>{    
        return{
          id: i.id,
          title: i.title,
          summary: i.summary,  //.replace(/<[^>]*>?/gm, ''),
          healthScore: i.healthScore,
          steps: i.analyzedInstructions[0]?.steps.map(a=>a.step),
          image: i.image,
          diets: i.diets,
        }
      })
      
       let RecipesAllTotal = [...respuestaBD, ...respuestaApi];
       
       return RecipesAllTotal;    
    }else{
      return ('Error de respuesta')
    }
  } catch (error) {
    return(error);
  }
};

// //OBTENER RECETAS POR ID
const getRecipeId = async (req,res,next) =>{

  const recipesTotal = await getAllRecipes();  
  const id =req.params.id;

  if(id){ 
    try {
      let rcp = await recipesTotal.filter(r=>r.id == id);
      if(rcp.length){
        res.status(200).json(rcp);
      }else{
        res.status(404).send("Receta inexistente");
      }   
    } catch (error) {
      next(error);
    }
  }else{
      res.json(recipesTotal);
    }   
};

// //OBTENER EL DETALLE DE UNA RECETA POR SU NOMBRE
const getRecipeTitle = async (req,res,next) =>{
  const recipesTotal = await getAllRecipes();  
  const {title} =req.query;

  if(title){

    try {
      let rcp = await recipesTotal.filter(r=>r.title.toLowerCase().includes(title.toLowerCase()));
        res.send(rcp);
    } catch (error) {
      next(error);
    }
  }else{
    try {
      res.send(recipesTotal);
      }catch(error){
        next(error);
      } 
    }   
};

//CREAR UNA RECCETA NUEVA (----> no funciona)
const postRecipe = async (req,res) => {
  let {
    title,
    summary,
    healthScore,
    steps,
    image,
    diets
  }=req.body;
  let recipeCreated = await Recipe.create ({
    title,
    summary,
    healthScore,
    steps,
    image
  })
  const dietsAll = await Diet.findAll({
    where:{
      name: diets
    }
  });

  recipeCreated.addDiet(dietsAll);
  res.send(recipeCreated)
}

module.exports = { testFunction, getRecipeTitle, getRecipeId, postRecipe};
