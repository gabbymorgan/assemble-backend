const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const userRoutes = require('./routes/user');

// constants
const { DB_USER, DB_PASSWORD } = process.env;
const port = 5000;
const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan());

// routes
app.use('/api/users', userRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

mongoose.connect(
	`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-h73bz.mongodb.net/assemble?retryWrites=true&w=majority`,
	{ useNewUrlParser: true }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
