const express = require('express')
const crypto = require('crypto')
const router = express.Router()
const db = require('../database')
var bodyParser = require('body-parser')


var urlEncodedParser = bodyParser.urlencoded({extended: false})

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256')
    const hash = sha256.update(password).digest('base64')
    return hash
}


async function getUserByName(username){
    const sqlQuery = `SELECT * FROM users WHERE UserName = '${username}'`

    var userData = null;

    await db.result(sqlQuery)
    .then(data => {
        userData = data.rows[0]
    })

    return userData
}

router.get('/', (req, res) => {
    res.render('admin')
})

router.post('/', urlEncodedParser, async(req, res) => {
    const hashedPassword = getHashedPassword(req.body.password)

    const userData = await getUserByName(req.body.username)

    if(userData == null){
        console.log('could not get data from database')
    } else {
        var isAuthenticated = (userData.password === hashedPassword)

        if (isAuthenticated){
            res.render('admin_portal')
            return
        }
    }

    res.render('admin')

})

module.exports = router