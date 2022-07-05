const { Router } = require('express');
const axios = require('axios');
const { Op } = require("sequelize");
const { Diet, Recipe } =require ('../db');
const {
    API_URL_KEY, API_URL_KEY_ID,
  } = process.env;

//TEST DE FUNCIONAMIENTO
const testFunctionD = (req,res,next)=>{
  try {
    return res.send('Diets funcionando!');
  } catch (error) {
      next(error);
  };
};

//CARGAR LA TABLA DE DIETAS A MANO
const getDiets = async (req,res,next)=>{
        const diet = [
          "gluten free",
          "dairy free",
          "paleolithic",
          "lacto ovo vegetarian",
          "primal",
          "whole 30",
          "fodmap friendly",
          "ketogenic",
          "pescatarian",
          "vegan"
      ]
        for (let i=0; i<diet.length; i++){
            await Diet.findOrCreate({where: {name: diet[i]}});
        };
        const dietsAll= await Diet.findAll();
        res.send(dietsAll);
};

module.exports = { testFunctionD, getDiets};
