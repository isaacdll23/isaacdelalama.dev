const express = require('express');
const indexRouter = require('./routes/index')
const adminRouter = require('./routes/admin')
const blogRouter = require('./routes/blog')
const app = express()


// set view engine to EJS
app.set('view engine', 'ejs')

// add routes to server
app.use('/admin', adminRouter)
app.use('/blog', blogRouter)
app.use('/', indexRouter)

app.listen(5000)