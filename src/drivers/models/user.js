function getAttributes(sequelize, DataTypes) {
  return {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING(36),
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING(36),
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(36),
    },
    createdAt: {
      field: "createdAt",
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn("now"),
    },
    updatedAt: {
      field: "updatedAt",
      type: DataTypes.DATE,
      allowNull: true,
    },
  };
}

function model(sequelize, DataTypes) {
  const users = sequelize.define("users", getAttributes(sequelize, DataTypes), {
    tableName: "users",
    timestamps: true,
  });

  return users;
}

module.exports = { model, getAttributes };
