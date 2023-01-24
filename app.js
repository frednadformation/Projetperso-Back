const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const bcrypt = require('bcrypt');

const cors = require('cors');
app.use(cors());
require('dotenv').config();

const {createToken, validateToken} = require('./JWT');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

var dbUrl = process.env.DATABASE_URL
console.log(dbUrl);

const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log("MongoDB connected !"))
.catch(err => console.log(err))

const port = process.env.PORT

const methodOverride = require('method-override');
const User = require('./Models/User');

app.use(methodOverride('_method'));

app.post('/api/signup', function (req, res) {
    const Data = new User({
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 10),
        age: req.body.age,
        tel: req.body.tel,
        admin: false
    })
    Data.save().then(()=>{
        console.log("User saved"),
        res.redirect("http://localhost:3000/login")
    })
    .catch(err => console.log(err))
});

app.post('/api/login', function(req, res) {
    console.log(req.body);
    User.findOne({
        username: req.body.username
    }).then(user => {
        
        if (!user){
            res.status(404).send("Username invalid !")
        }
        const accessToken = createToken(user);
        res.cookie("access-token", accessToken,{
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: true, 
        })
        
        if(!bcrypt.compareSync(req.body.password, user.password)){
            res.status(404).send("Password invalid !")
        }

        // res.json("LOGGED IN")
        res.redirect("http://localhost:3000/")
    })
    .catch(err => {
        console.log(err)
    });
});


const server = app.listen(port, function () {
    console.log("Server listening on port " + port);
});