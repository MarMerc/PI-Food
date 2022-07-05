const { Router } = require('express');
const { axios } = require('axios');
const { Diet, Recipe } =require ('../db');
const {
    API_URL_KEY,
  } = process.env;


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo=async()=>{
    const apiUrl=await axios.get(API_URL_KEY)
    const apiInfo= await apiUrl.data.map(d=>{
        return{
            id: d.id,
            title: d.title,
            sumary: d.sumary,
            healthScore: d.healthScore,
            steps: d.analyzedInstructions[0].steps.map(a=>a.steps),
            image: d.image,
            diets: d.diets.map(d=>d),
        };
    })
    return apiInfo;
};
const getDatabaseInfo = async ()=>{
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

const getAllRecipes = async()=>{
    const apiInfo = await getApiInfo();
    const databaseInfo = await getDatabaseInfo();
    const infoTotal = apiInfo.concat(databaseInfo);
    return infoTotal;
};

//OBTENER RECETAS POR UN NOMBRE EN PARTICULAR
const getRecipeTitle = async (req,res)=>{
    const title = req.query.title;
    let recipesTotal = await getAllRecipes();
    if(title){
        let recipesTitle = await recipesTotal.filter(d=>d.title.toLowerCase().includes(title.toLowerCase()));
        if(recipesTitle.length){
            res.status(200).send(recipesTitle);
        }else{
            res.status(404).send('Ningun menu coincidente!');
        }
    }else{
        res.status(200).send(recipesTotal);
    }
  };

module.exports = router;


///SEGUN HERNAN

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

//OBTENER TODAS LAS RECETAS
const getRecipeAll = async function (req,res,next){
  try {
      const respuesta = await axios.get(API_URL_KEY);
      res.json(respuesta.data.results);
  } catch (error) {
      next(error);
  };
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

module.exports = { testFunction, getRecipeAll, getRecipeTitle};


///otro


//OBTENER TODAS LAS RECETAS DE LA API

const getAllRecipes = async () => {
  try {
    const respuestaBD = await Recipe.findAll({include: Diet})
    const respuesta = await axios.get(API_URL_KEY);
    if(respuesta || respuestaBD){
      respuesta.data.results?.map(i=>{
        return{
          id: i.id,
          title: i.title,
          sumary: i.sumary,
          healthScore: i.healthScore,
          steps: i.analyzedInstructions[0]?.steps.map(a=>a.step),
          image: i.image,
          diets: i.diets,
        }
      })
       let RecipesAllTotal = [respuestaBD, ...recipesApi];
       return(RecipesAllTotal);    
    }else{
      return('Error de respuesta')
    }
  } catch (error) {
  }
};

//CREAR UNA RECCETA NUEVA
// const postRecipe = (req,res) => {
//   const {rcp} = req.body;
//   if(rcp){
//       try {
        
//       } catch (error) {
//         res.send(error)
//       }
//   }else{
//     res.json({message: 'Error no hay datos por body para ingresar.'});
//   }
// }


//OBTENER RECETAS POR UN NOMBRE EN PARTICULAR
const getRecipesTitle = async (req,res,next)=>{
  const title = req.query;
  let recipesTotal = await getAllRecipes();
  try {
    if (!title)res.status(200).send(recipesTotal);
    let recipesTitle = await recipesTotal.filter(d=>d.title.toLowerCase().includes(title.toLowerCase()));
    res.status(200).send(recipesTitle);
  } catch (error) {
    next(error);
  }
}

// //OBTENER EL DETALLE DE UNA RECETA EN PARTICULAR
// const getRecipeDetals = (req,res) =>{
//   const { id } =req.query;
//   if(id){
//     //MOSTRAR POR EL NOMBRE

//   }else{
//     //MOSTRAR TODO
//     try {
//       axios(API_URL_KEY).then((respuesta)=>
//       res.json({msg:"OK", info: respuesta.data.results})
//       );
//     }catch(error){
//       console.log(error);
//     }
//   };
// }


