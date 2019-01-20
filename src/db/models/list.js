'use strict';
module.exports = (sequelize, DataTypes) => {
  var List = sequelize.define('List', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  List.associate = function(models) {
    // associations can be defined here
    List.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return List;
};