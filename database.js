const pgp = require('pg-promise')()
const { connectionString } = require("./config.json")

const db = pgp(connectionString)

module.exports = db