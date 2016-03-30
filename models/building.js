'use strict';
module.exports = function(sequelize, DataTypes) {
  var Building = sequelize.define('Building', {
    name: DataTypes.STRING,
    floor: DataTypes.INTEGER,
    coord_x: DataTypes.INTEGER,
    coord_y: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Building.belongsTo(models.Community)
      }
    }
  });
  return Building;
};