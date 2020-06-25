const express = require('express');
const api_routes = express.Router();

const db = require("./database/db.js");

api_routes.get(`/points/:uf/`, (req, res) => {

    const state = req.params.uf

    const query = `
        SELECT image, name, phone, email, cep, address, address2, state, city, items
        FROM places
        WHERE state like '%${state}%'
    `

    db.all(query, function(err,rows) {
        if (err) {
            let error_occ = {
                error: "Error while quering for data, please check your request"
            }
            return res.json(error_occ)
        } else {
            if (rows[0] === undefined ) {
                let error_occ = {
                    error: "0 points registered for that UF"
                }
                return res.json(error_occ)
            } else {
                console.log(rows)
                return res.json(rows)
            }
        }
    })
})

api_routes.get(`/points/:uf/:city`, (req, res) => {

    const state = req.params.uf
    let city = (req.params.city).toString()
    city = city.replace(/-/g, ' ')

    const query = `
        SELECT image, name, phone, email, cep, address, address2, state, city, items
        FROM places
        WHERE state like '%${state}%' AND city LIKE '%${city}%'
    `

    db.all(query, function(err,rows) {
        if (err) {
            let error_occ = {
                error: "Error while quering for data, please check your request"
            }
            return res.json(error_occ)
        } else {
            if (rows[0] === undefined ) {
                let error_occ = {
                    error: "0 points registered for that UF and City"
                }
                return res.json(error_occ)
            } else {
                console.log(rows)
                return res.json(rows)
            }
        }
    })
})

module.exports = api_routes