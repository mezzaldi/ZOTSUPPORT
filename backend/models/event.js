// models/event.js
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      eventName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      recurring: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      administrators: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventHeaderImage: {
        type: DataTypes.STRING,
      },
      eventDescription: {
        type: DataTypes.TEXT,
      },
      tags: {
        type: DataTypes.STRING,
      },
    });
  
    // Additional associations, hooks, or methods can be added here
  
    return Event;
  };
  