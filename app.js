import express from "express";
import "dotenv/config";
import sequelize from "./config/db.js";
import Book from "./models/book.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(201).send("Hello my 8 Home Work!");
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.findAll(); // Получаем все записи из таблицы Books
    res.json(books); // Отправляем массив книг в формате JSON
  } catch (error) {
    console.error("Error finding books:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/books", async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const book = await Book.create({
      title,
      author,
      year,
    });

    res.status(201).json({ message: "Book was created succesfully.", book });
  } catch (error) {
    console.error("Error creating book: ", error);
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: "Validation error", details: error.error });
    }
    res.status(500).json({ message: "Something went wrong!" });
  }
});
// PUT маршрут для обновления книги
app.put("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id; // Получение параметра id из пути
    const { title, author, year } = req.body; // Получение данных для обновления

    // Поиск книги с указанным id

    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.update({ title, author, year });

    res.status(200).json({ message: "Book updated successfully", book: book });
  } catch (error) {
    console.error("Error in PUT /book/:id", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// DELETE маршрут для удаления книги
app.delete("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id; // Получение параметра id из пути
    // Поиск книги с указанным id
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    //
    await book.destroy();

    res
      .status(200)
      .json({ message: `Book with is ${bookId} deleted successfully` });
  } catch (error) {
    console.error("Error in DELETE /books/:id", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate(); //
    console.log("Connection to the database has been established successfully");
    console.log(`Server running on port: http://localhost:${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
});
