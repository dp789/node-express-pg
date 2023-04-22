function getAttributes(sequelize, DataTypes) {
  return {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(36),
    },
    secondName: {
      field: "second_name",
      allowNull: true,
      type: DataTypes.STRING(36),
    },
    ip: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING(46),
    },
    createdAt: {
      field: "createdAt",
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("now"),
    },
    updatedAt: {
      field: "updatedAt",
      allowNull: true,
      type: DataTypes.DATE,
    },
  };
}

function model(sequelize, DataTypes) {
  const userDetails = sequelize.define(
    "userDetails",
    getAttributes(sequelize, DataTypes),
    {
      tableName: "user_details",
      timestamps: true,
    }
  );

  userDetails.associate = function (models) {
    userDetails.belongsTo(models.users, {
      foreignKey: "email",
      sourceKey: "email",
    });
  };

  return userDetails;
}

module.exports = { model, getAttributes };
