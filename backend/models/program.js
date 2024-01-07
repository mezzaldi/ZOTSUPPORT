// models/program.js
//This model definition represents the structure of the 'Program' table in the database, 
//and it can be used to interact with and perform operations on event data in the application.
module.exports = (sequelize, DataTypes) => {
    const Program = sequelize.define('Program', {
      programName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adminEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      headerImage: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      tags: {
        type: DataTypes.STRING,
      },
    });
  
    return Program;
  };
  