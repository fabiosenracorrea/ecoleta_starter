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

//sends our home page to the '/' address
server.get("/", (req, res) => {
    return res.render("index.html")
})

//sends our create-point html to the "/create-point" address
server.get("/create-point", (req, res) => {

    // here we have .render instead of .send because we are passing through nunjucks to, well, render it.
    return res.render("create-point.html")
})

//route to get the form data
server.post("/create-point", (req,res) => {

    // query to insert data into our table
    const query =`
        INSERT INTO places (
            image,
            name,
            phone,
            email,
            cep,
            address,
            address2,
            state_id,
            state,
            city_id,
            city,
            items
        ) VALUES (
            ?,?,?,?,?,?,?,?,?,?,?,?
        );
    `


    const values = [
        req.body.image,
        req.body.name,
        req.body.phone,
        req.body.email,
        req.body.cep,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.state_name,
        req.body.city,
        req.body.city_name,
        req.body.items
    ]

    function afterDataInserted(err) {
        if (err) {
            console.log(err)
            return res.render("create-point.html", {erro_sql: true});
        } else {
            console.log("Cadastrado com sucesso");
            console.log(this);
            return res.render("create-point.html", {saved: true})
        }}

    db.run(query, values, afterDataInserted)
})

//sends our search-results.html to the "/search" address
server.get("/search", (req, res) => {

    //the last thing here is . + name of the input we want to extract the value of.
    //if we change the name of out input to smth else, this var will be undefined
    //(because there wont be any form that has an input named search)

    //re.query: query string from our url
    const search = req.query.search;

    if (search === "") {
        //getting the data from our database to be used with nunjucks to inject data on our pages
        db.all(`SELECT * FROM places`, function(err,rows) {
            if (err) {
                // maybe return the page with a variable indicating that an error occurred?
                return console.log(err);
            } else {
                //sends the page with the variables we need to display
                //whats in our data base
                const total = rows.length
                return res.render("search-results.html", { places: rows, total })
            }
        })
    } else if (search === undefined) {
        //if the user accessess the /search by himself or via footer
        db.all(`SELECT * FROM places`, function(err,rows) {
            if (err) {
                return console.log(err);
            } else {
                //sends the page with the variables we need to display
                //whats in our data base
                const total = rows.length
                return res.render("search-results.html", { places: rows, total })
            }
        })
    } else {
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' or state LIKE '%${search}%'`, function(err,rows) {
            if (err) {
                return console.log(err);
            } else {
                //sends the page with the variables we need to display
                //whats in our data base
                const total = rows.length
                return res.render("search-results.html", { places: rows, total })
            }
        })
    }


})

//about us page
server.get("/about-us", (req,res) => {
    return res.render("about-us.html");
})

//starts the local server
server.listen(3000);
