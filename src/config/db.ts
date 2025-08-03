import { Sequelize } from "sequelize";
import devConsole from "../helper/devConsole";

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    dialect: "mysql", // database type
    logging: false,
  }
);

const connectDB = async () => {
  try {
    sequelize.sync(); // sync all models with database
    // sequelize.sync({ force: true }); // sync all models with database and force to drop all tables
    await sequelize.authenticate();

    const config = sequelize.config; // get config object from sequelize

    devConsole(
      `MySQL successfully conncted on ${config.host}, Database name: ${config.database}`
    );
  } catch (error) {
    devConsole("Unable to connect to the database:", error);
  }
};

export { connectDB, sequelize };
