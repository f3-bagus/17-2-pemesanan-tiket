require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 5000;
const usersRouter = require('./routes/usersRoute');
const authRouter = require('./routes/auth');
const schedulesRouter = require('./routes/schedulesRoute');
const filmsRouter = require('./routes/filmsRoute');
const seatsRouter = require('./routes/seatsRoute')
const bookingsRouter = require('./routes/bookingsRoute');
const paymentsRouter = require('./routes/paymentsRoute')
const ticketsRouter = require('./routes/ticketsRoute')

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')))

mongoose.connect(process.env.DB_NAME).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log('Database is not connected', err.message);
});

app.use('/api/films', filmsRouter);
app.use('/api', usersRouter);
app.use('/api/schedules', schedulesRouter);
app.use('/api', authRouter);
app.use('/api/seats', seatsRouter)
app.use('/api/bookings', bookingsRouter)
app.use('/api', paymentsRouter)
app.use('/api/tickets', ticketsRouter)

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
