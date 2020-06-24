const express = require('express');
const api_routes = express.Router();

const db = require("./database/db.js");

api_routes.get(`/points/`, (req, res) => {

    db.all(`SELECT * FROM places`, function(err,rows) {
        if (err) {
            // maybe return the page with a variable indicating that an error occurred?
            return console.log(err);
        } else {
            //sends the page with the variables we need to display
            //whats in our data base
            return res.json(rows)
        }
    })
})

module.exports = api_routes