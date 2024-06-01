require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const port = process.env.PORT || 5000
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(process.env.DB_NAME).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log('Database is not connected', err.message);
})

app.use('/api/admin/dashboard/users', usersRouter)
app.use('/api', authRouter)

app.use((req, res, next) => {
    res.status(404).json({
      message: 'Page Not Found',
    });
    // next()
  });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

app.listen(port, () => {
  console.log(`server is running`)
})