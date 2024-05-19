import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  user: "raditdb_owner",
  password: "sjCFz3eLy5Nl",
  host: "ep-withered-mouse-a16a68e6.ap-southeast-1.aws.neon.tech",
  port: 5432,
  database: "radit_8",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  pool.query(q, (err, result) => {
    if (err) {
      console.error("Error executing query", err.stack);
      return res.status(500).json(err);
    }
    return res.json(result.rows);
  });
});

app.post("/books", (req, res) => {
  const { title, desc, price, cover } = req.body;
  const q = "INSERT INTO books(title, description, price, cover) VALUES ($1, $2, $3, $4)";
  const values = [title, description, price, cover];

  pool.query(q, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err.stack);
      return res.status(500).json(err);
    }
    return res.json(result.rows);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = $1";

  pool.query(q, [bookId], (err, result) => {
    if (err) {
      console.error("Error executing query", err.stack);
      return res.status(500).json(err);
    }
    return res.json(result.rows);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const { title, desc, price, cover } = req.body;
  const q = "UPDATE books SET title = $1, description = $2, price = $3, cover = $4 WHERE id = $5";
  const values = [title, description, price, cover, bookId];

  pool.query(q, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err.stack);
      return res.status(500).json(err);
    }
    return res.json(result.rows);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
