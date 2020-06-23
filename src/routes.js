const express = require('express');
const routes = express.Router();

const db = require("./database/db.js");

//sends our home page to the '/' address
routes.get("/", (req, res) => {
    return res.render("index.html")
})

//sends our create-point html to the "/create-point" address
routes.get("/create-point", (req, res) => {

    // here we have .render instead of .send because we are passing through nunjucks to, well, render it.
    return res.render("create-point.html")
})

//route to get the form data
routes.post("/create-point", (req,res) => {

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
routes.get("/search", (req, res) => {

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
routes.get("/about-us", (req,res) => {
    return res.render("about-us.html");
})

module.exports = routes
