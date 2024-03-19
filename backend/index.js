const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => console.log('Connected to DB & listening on port', process.env.PORT));
})
.catch(error => console.log(error));