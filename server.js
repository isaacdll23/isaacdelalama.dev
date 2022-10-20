const express = require('express');
const indexRouter = require('./routes/index')
const adminRouter = require('./routes/admin')
const journalRouter = require('./routes/journal')
const app = express()


// set view engine to EJS
app.set('view engine', 'ejs')

// add routes to server
app.use('/admin', adminRouter)
app.use('/journal', journalRouter)
app.use('/', indexRouter)

app.listen(5000)