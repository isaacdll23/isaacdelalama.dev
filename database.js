const pgp = require('pg-promise')()
const config = require("./config.json")

const db = pgp(config.connectionString)

module.exports = db