import { type Options } from "sequelize";
import "dotenv/config";

const config: { [env: string]: Options } = {
  development: {
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
    host: process.env.DB_HOST || "",
    dialect: "postgres",
    timezone: "Africa/Lagos",
    dialectOptions: { timezone: "Africa/Lagos" },
  },
  test: {
    username: "root",
    password: "root",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "Africa/Lagos",
    dialectOptions: { timezone: "Africa/Lagos" },
  },
  production: {
    username: "root",
    password: "root",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "Africa/Lagos",
    dialectOptions: { timezone: "Africa/Lagos" },
  },
};

export default config;
