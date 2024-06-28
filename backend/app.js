require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const usersRouter = require("./routes/usersRoute");
const authRouter = require("./routes/auth");
const filmsRouter = require("./routes/filmsRoute");
const seatsRouter = require("./routes/seatsRoute");
const bookingsRouter = require("./routes/bookingsRoute");
const ticketsRouter = require("./routes/ticketsRoute");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));

mongoose
  .connect(process.env.DB_NAME)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database is not connected", err.message);
  });

app.use("/api/films", filmsRouter);
app.use("/api", usersRouter);
app.use("/api", authRouter);
app.use("/api/films", seatsRouter);
app.use("/api/films", bookingsRouter);
app.use("/api/tickets", ticketsRouter);

// Middleware untuk penanganan 404
app.use((req, res, next) => {
  res.status(404).json({
    message: "Page Not Found",
  });
});

// Middleware penanganan error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app; // Export the Express app instance
