const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const notes = require('./data/notes');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { notFound, errorHandler } = require('./middlewares/errormiddleware');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.send('Shubh');
})

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log('server is running')
})