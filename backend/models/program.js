// models/program.js
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
  