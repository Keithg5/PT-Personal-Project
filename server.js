const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const server = express();
const axios = require('axios');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const port = process.env.PORT || 8080;

//Import DB schema
const User = require('./client/model/user');

// Mongoose DB connection
mongoose.Promise = global.Promise;

//Local DB
//mongoose.connect('mongodb://localhost/', { useMongoClient: true });

//MLab DB
mongoose.connect('mongodb://reactAppUser:password123@ds113785.mlab.com:13785/react-image-search-app', { useMongoClient: true });

//CORS settings
const corsOptions = {
    "origin": "*",
    "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};
// To prevent errors from Cross Origin Resource Sharing
server.use(cors());
server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

server.use(express.static(path.join(__dirname, 'client/build')));

server.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + 'client/build/index.html'));
});

//API
server.post('/api/:term', (req, res) => {
    const term = req.params.term;
    axios.get( `https://pixabay.com/api/?key=6583564-7f7789c42127428e03e151373&q=${term}&image_type=photo`)
        .then(axiosRes => {
            res.json(axiosRes.data);
        })
        .catch(err => {
            console.log(err);
        })
});
    
server.post('/users', (req, res) => {
    user = new User(req.body);
    user.save((err) => {
        if (err) throw err;
        res.json(user);
    })
});

server.post('/users/login', (req, res) => {
    userLogin = new User(req.body);
    User.findOne({'username':userLogin.username, 'password': userLogin.password}, (err, user) => {
        if (err) res.json({message:'User not found'});
        res.json(user);
    })
});

server.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) throw err;
        res.json(users);
    })
});

server.delete('/users', (req, res) => {
    User.remove({}, (err, users) => {
        if (err) throw err;
        res.json({ message:'All users deleted' });
    })
});

//------Server Set Up-----//
server.listen(port, () => {
    console.log('server listening on port 8080');
});