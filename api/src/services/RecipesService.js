const { Router } = require('express');
const axios = require('axios');
const { Diet, Recipe } =require ('../db');
const {
    API_URL_KEY,
  } = process.env;

//TEST DE FUNCIONAMIENTO
const testFunction = (req,res,next)=>{
  try {
    return res.send('Recipes funcionando!');
    //falta agregar lo de la BD
  } catch (error) {
      next(error);
  };
};

//OBTENER TODAS LAS RECETAS DE LA API
const getRecipeApi = async function (req,res,next){
  try {
      const respuesta = await axios.get(API_URL_KEY);
      const recipeApi = res.json(respuesta.data.results.map(i=>{
        return{
          id: i.id,
          title: i.title,
          sumary: i.sumary,
          healthScore: i.healthScore,
          steps: i.analyzedInstructions,
          image: i.image,
          diets: i.diets.map(d=>d),
      };
      }));
      
      //return console.log(recipeApi);
  } catch (error) {
      next(error);
  };
};

//TODAS LAS RECETAS DE LA BD
const getDBInfo = async ()=>{
  return await Recipe.findAll({
      include:{
          model: Diet,
          atributes: ['name'],
          through: {
              atributes:[],
          },
      }
  });
};

//TODAS LAS RECETAS API + BD
const getAllRecipes = async()=>{
  const apiInfo = await getRecipeApi();
  const databaseInfo = await getDBInfo();
  const infoTotal = apiInfo.concat(databaseInfo);
  return infoTotal;
};

//OBTENER EL DETALLE DE UNA RECETA EN PARTICULAR
const getRecipeTitle = (req,res) =>{
  const { id } =req.query;
  if(id){
    //MOSTRAR POR EL NOMBRE

  }else{
    //MOSTRAR TODO
    try {
      axios(API_URL_KEY).then((respuesta)=>
      res.json({msg:"OK", info: respuesta.data.results})
      );
    }catch(error){
      console.log(error);
    }
  };
}

module.exports = { testFunction, getRecipeApi, getRecipeTitle,getAllRecipes};
