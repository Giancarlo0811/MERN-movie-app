const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(cors({credentials: true, origin: "http://localhost:5173"}));

app.use('/api/users', userRoutes);
app.use('/api/movies', favoriteRoutes);

// use frontend app
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// render frontend for any path
app.get('*', (req, res) => 
res.sendFile(path.join(__dirname, '/frontend/dist/index.html'))
);

app.use(notFound);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => console.log('Connected to DB & listening on port', process.env.PORT));
})
.catch(error => console.log(error));