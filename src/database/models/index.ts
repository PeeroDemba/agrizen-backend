"use strict";

import { Sequelize, type Options } from "sequelize";
const env: "development" | "test" | "production" = process.env.NODE_ENV
  ? (process.env.NODE_ENV as "development" | "test" | "production")
  : "development";
import configFile from "../config/config.js";
const config: Options = configFile[env]!;

let sequelize: Sequelize;

if (process.env.URI) {
  sequelize = new Sequelize(process.env.URI, {
    timezone: config.timezone as string,
    dialectOptions: config.dialectOptions as object,
  });
} else {
  sequelize = new Sequelize(config as Options);
}

export default sequelize;
