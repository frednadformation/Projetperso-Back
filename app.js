const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const cors = require('cors');
app.use(cors());
require('dotenv').config();

var dbUrl = process.env.DATABASE_URL
console.log(dbUrl);

const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log("MongoDB connected !"))
.catch(err => console.log(err))

const port = process.env.PORT

const methodOverride = require('method-override');

app.use(methodOverride('_method'));


const server = app.listen(port, function () {
    console.log("Server listening on port " + port);
});