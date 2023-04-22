const pg = require("pg");
const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: `.env.local` });

module.exports = {
  url: process.env.DB_URI,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  dialectModule: pg,
  dialect: "postgres",
  pool: {
    min: 0,
    max: 10,
    idle: 10000,
  },
  define: {
    underscored: true,
    timestamps: false,
  },
  retry: {
    match: [
      "unknown timed out",
      Sequelize.TimeoutError,
      "timed",
      "timeout",
      "TimeoutError",
      "Operation timeout",
      "refuse",
      "SQLITE_BUSY",
    ],
    max: 10,
  },
};
