require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 5000;
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const schedulesRouter = require('./routes/schedules');
const filmRoutes = require('./routes/filmRoutes');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.DB_NAME).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log('Database is not connected', err.message);
});

// Rute-rute film
app.use('/api', filmRoutes);

// Rute-rute lain
app.use('/api/admin/dashboard/users', usersRouter);
app.use('/api/admin/dashboard/schedules', schedulesRouter);
app.use('/api', authRouter);

// Middleware untuk menangani respons "Page Not Found"
app.use((req, res) => {
    res.status(404).json({
        message: 'Page Not Found',
    });
    // next();
});

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`server is running`);
});
