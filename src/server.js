// Starting the server with express
const express = require("express");
const server = express();

//getting data base
const db = require("./database/db.js");

//config of public folder (makes that we dont need to add "/public/ to our previous paths")
server.use(express.static("public"));

// making sure we can use the req.body to get data from our POST form
server.use(express.urlencoded({extended: true}))

//using the template engine (nunjucks)
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true, //to save us some bugs while developing
})

server.use('/', require('./routes'));

//starts the local server at port 3000
server.listen(3000);
