const http = requiere('http');
const path = requiere('path');
const express = requiere('express');
const bodyParser = requiere('body-parser');
const mongoose = requiere('mongoose');
const Routing = requiere('routes.js');

const PORT = 3000;
const app = express();

const Server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('client'));

app.use('/users', Routing);

Server.listen(PORT, ()=>{
    console.log('Server is listening on port: ' + PORT);
})
