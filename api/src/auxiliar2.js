const { Router } = require('express');
const axios = require('axios');
const { Op } = require("sequelize");
const { Diet, Recipe } =require ('../db');
const {
    API_URL_KEY,
  } = process.env;

//TEST DE FUNCIONAMIENTO
const testFunction = (req,res,next)=>{
  try {
    return res.send('Recipes funcionando!');
  } catch (error) {
      next(error);
  };
};

//OBTENER TODAS LAS RECETAS DE LA API

const getAllRecipes = async (req,res,next) => {
  try {
    const respuestaBD = await Recipe.findAll({include: Diet})
    const respuestaApi = await axios.get(API_URL_KEY);
    if(respuestaApi || respuestaBD){
      res.json(respuestaApi.data.results?.map(i=>{
        return{
          id: i.id,
          title: i.title,
          sumary: i.sumary,
          healthScore: i.healthScore,
          steps: i.analyzedInstructions[0]?.steps.map(a=>a.step),
          image: i.image,
          diets: i.diets.map(d=>d),
        }
      })
    )
       let RecipesAllTotal = [respuestaBD, ...respuestaApi];
       return(RecipesAllTotal);    
    }else{
      res.json({messege: 'Error de respuesta'})
    }
  } catch (error) {
  }
};

// const recipesAll = async ()=>{
//   try {
//     const respuestaBD = await Recipe.findAll({include: Diet})
//     const respuesta = await axios.get(API_URL_KEY);
//     if(respuesta || respuestaBD){
//       res.json(respuesta.data.results?.map(i=>{
//         return{
//           id: i.id,
//           title: i.title,
//           sumary: i.sumary,
//           healthScore: i.healthScore,
//           steps: i.analyzedInstructions[0]?.steps.map(a=>a.step),
//           image: i.image,
//           diets: i.diets.map(d=>d),
//         }
//       })
//     )
//        let RecipesAllTotal = [respuestaBD, ...recipesApi];
//        return(RecipesAllTotal);    
//     }else{
//       res.json({messege: 'Error de respuesta'})
//     }
//   } catch (error) {
//     next(error)
//   }
// };

//CREAR UNA RECCETA NUEVA
const postRecipe = (req,res) => {
  const {rcp} = req.body;
  if(rcp){
      try {
        
      } catch (error) {
        res.send(error)
      }
  }else{
    res.json({message: 'Error no hay datos por body para ingresar.'});
  }
}


// //OBTENER RECETAS POR ID
const getRecipeId = async (req,res,next) =>{
  const {id} =req.query;
  if(id){
    try {
      // let rcp = await Recipe.findAll({
      //   where: {
      //     id: {
      //       [Op.eq]: parseInt(id)
      //     }
      //   }
      // });
      axios(API_URL_KEY).then((respuesta)=>{
        const rcp = respuesta.data.results.find(r=>r.parseInt(id)===parseInt(id));
        res.json(rcp);
      });      
      return res.json(rcp);
    } catch (error) {
      next(error);
    }
  }else{
    try {
      axios(API_URL_KEY).then((respuesta)=>
        res.json(respuesta.data.results)
      );
      }catch(error){
        next(error);
      } 
    }   
};

// //OBTENER EL DETALLE DE UNA RECETA POR SU NOMBRE
const getRecipeTitle = async (req,res,next) =>{
  const {title} =req.query;
  if(title){
    try {
      // let rcp = await Recipe.findAll({
      //   where: {
      //     title: {
      //       [Op.iLike]: '%' + title + '%'
      //     }
      //   }
      // });
      axios(API_URL_KEY).then((respuesta)=>{
        const rcp = respuesta.data.results.find(r=>r.title===title);
        res.json(rcp);
      });      
      res.json(rcp);
    } catch (error) {
      next(error);
    }
  }else{
    try {
      axios(API_URL_KEY).then((respuesta)=>
        res.json(respuesta.data.results)
      );
      }catch(error){
        next(error);
      } 
    }   
};

module.exports = { testFunction, getAllRecipes, getRecipeTitle, getRecipeId, postRecipe};
