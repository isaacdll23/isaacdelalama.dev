const pgp = require('pg-promise')()
const { connectionString } = require("./config.json")
const dotenv = require('dotenv').config()

const db = pgp(process.env.connectionString)

module.exports = db