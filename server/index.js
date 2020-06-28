const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session')
const mongoose = require('mongoose');

const Routing = require('./routes.js');

const Server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client'));
app.use(session({ secret: 'token-muy-secreto', resave: true, saveUninitialized: true }));

app.use(Routing);

Server.listen(3000, ()=>{
    console.log('Server is listening on port: ' + 3000);
})
