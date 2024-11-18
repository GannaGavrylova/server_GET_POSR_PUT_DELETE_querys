//Настройка подклюяения к базу данных
import { Sequelize } from "sequelize";
import configData from "./config.json" assert { type: "json" };

// определяем текущее окружение
const env = process.env.NODE_ENV || "development";
const config = configData[env];

// создание экземпляра Sequelize с параметрами из конфигурационного файла
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

export default sequelize;
