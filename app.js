const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
require("dotenv").config();
const userRoutes = require('./routes/user');

// constants
const { DB_USER, DB_PASSWORD } = process.env;
const port = 5000;
const app = express();

//middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// routes
app.use('/api/users', userRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

mongoose.connect(
	`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-h73bz.mongodb.net/assemble?retryWrites=true&w=majority`,
	{ useNewUrlParser: true }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
