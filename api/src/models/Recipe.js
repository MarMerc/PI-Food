const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
        type: DataTypes.STRING,
        allowNull: false
    },
    healthScore:{
      type: DataTypes.INTEGER
    },
    steps:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    image:{
      type: DataTypes.STRING
    },
    createDB:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};


// [ ] Receta con las siguientes propiedades:
// ID: *
// Nombre *
// Resumen del plato * 
// Nivel de "comida saludable" (health score)
// Paso a paso