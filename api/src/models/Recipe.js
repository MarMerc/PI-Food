const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sumary:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    healthScore:{
      type: DataTypes.INTEGER
    },
    steps:{
      type: DataTypes.ARRAY(DataTypes.JSON)
    },
    image:{
      type: DataTypes.STRING
    }
  });
};


// [ ] Receta con las siguientes propiedades:
// ID: *
// Nombre *
// Resumen del plato * 
// Nivel de "comida saludable" (health score)
// Paso a paso