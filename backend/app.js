require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 5000;
const usersRouter = require("./routes/usersRoute");
const authRouter = require("./routes/auth");
const filmsRouter = require("./routes/filmsRoute");
const seatsRouter = require("./routes/seatsRoute");
const bookingsRouter = require("./routes/bookingsRoute");
const ticketsRouter = require("./routes/ticketsRoute");

app.use(
  cors({
    origin: "http://localhost:5750",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
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

app.use((req, res) => {
  res.status(404).json({
    message: "Page Not Found",
  });
  // next();
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`server is running`);
});
