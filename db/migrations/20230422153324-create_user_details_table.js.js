module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("user_details", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        email: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING(36),
        },
        second_name: {
          allowNull: true,
          type: Sequelize.STRING(36),
        },
        ip: {
          allowNull: true,
          unique: true,
          type: Sequelize.STRING(46),
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("now"),
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addConstraint("user_details", {
          type: "FOREIGN KEY",
          fields: ["email"],
          name: "user_email_fk",
          references: {
            table: "users",
            field: "email",
          },
        })
      );
  },
  async down(queryInterface) {
    await queryInterface.dropTable("UserDetails");
  },
};
