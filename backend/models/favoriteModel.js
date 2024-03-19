const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    movie: {
        movieId: {type: Number, required: true},
        movieTitle: {type: String, required: true}
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Favorite', favoriteSchema);