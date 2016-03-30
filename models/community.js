'use strict';
module.exports = function(sequelize, DataTypes) {
  var Community = sequelize.define('Community', {
    name: DataTypes.STRING,
    detail: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Community.belongsTo(models.City)
        Community.hasMany(models.Building)
      }
    }
  });
  return Community;
};