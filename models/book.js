import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

// Определяем модель Book
const Book = sequelize.define(
  "Book",
  {
    // Определяем столбцы модели
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // Название книги
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // автор книги
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //год публикации
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true, // Проверка, что это целое число
        min: 1000, // Минимальный год (например, 1000)
        max: new Date().getFullYear(), // Максимальный год (текущий год)
      },
    },
  },
  {
    tableName: "Books",
  }
);

export default Book;
