// import { Sequelize } from "sequelize";
// import devConsole from "../helper/devConsole.js";
const { Sequelize } = require("sequelize");
const devConsole = require("../src/helper/devConsole");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql", // database type
    logging: false, // disable logging to console if true can be used for debugging purposes
  }
);

const connectDB = async () => {
  try {
    sequelize.sync(); // sync all models with database
    // sequelize.sync({ force: true }); // sync all models with database and force to drop all tables
    await sequelize.authenticate(); // test connection

    const config = await sequelize.connectionManager.config; // get config object from sequelize

    devConsole(
      `MySQL connected successfully on ${config.host}\nDatabase name: ${config.database}`
    );
  } catch (error) {
    devConsole("Unable to connect to the database:", error);
  }
};

// export

// export { sequelize, connectDB };
module.exports = { sequelize, connectDB };
