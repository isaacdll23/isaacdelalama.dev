const express = require('express');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const dotenv = require('dotenv').config()
const indexRouter = require('./routes/index')
const adminRouter = require('./routes/admin')
const journalRouter = require('./routes/journal')
const app = express()


// set express to use cookies and session
app.use(cookieParser())
app.use(session({
    secret: process.env.session_secret,
    resave: true,
    saveUninitialized: true
}))

// set view engine to EJS
app.set('view engine', 'ejs')

// add routes to server
app.use('/admin', adminRouter)
app.use('/journal', journalRouter)
app.use('/', indexRouter)

app.listen(5000)