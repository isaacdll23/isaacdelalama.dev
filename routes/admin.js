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
    if(req.session.isAuthenticated){
        res.redirect('/admin/portal/')
        return
    }

    res.render('admin_login')
})

router.get('/portal', (req, res) => {
    if(!req.session.isAuthenticated){
        res.redirect('/admin/')
        return
    }

    res.render('admin_portal', {username: req.session.username})
})

router.get('/editor', (req, res) => {
    if (!req.session.isAuthenticated){
        res.redirect('/admin/')
        return
    }

    res.render('journal_editor')
})

router.post('/login', urlEncodedParser, async(req, res) => {
    const hashedPassword = getHashedPassword(req.body.password)
    const userData = await getUserByName(req.body.username)

    if(userData == null){
        console.log('could not get data from database')
    } else {
        var isAuthenticated = (userData.password === hashedPassword)

        if (isAuthenticated || req.session.isAuthenticated ){
            req.session.isAuthenticated = true
            req.session.username = req.body.username
            res.redirect('/admin/portal')
            return
        }
    }

    // TODO: Flash to user that login credentials are incorrect

    res.redirect('/admin/')
})


module.exports = router