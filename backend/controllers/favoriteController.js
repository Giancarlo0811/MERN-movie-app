const Favorite = require('../models/favoriteModel');
const User = require('../models/userModel');
const HttpError = require('../models/errorModel');

// ADD FAVORITE MOVIE
// POST api/movies/add-favorite
// PROTECTED
const addFavorite = async (req, res, next) => {
   try {
    const {movieId, movieTitle, moviePoster} = req.body;
    
    const user = await User.findById(req.user.id);
    const userId = user._id
    const movieExists = await Favorite.findOne({user: userId, movieId});

    if (movieExists) {
        return next(new HttpError('La pelicula ya fue agregada a favoritos', 422));
    }

    const newFavorite = await Favorite.create({
        movieId,
        movieTitle,
        moviePoster,
        user: req.user.id
    });

    if (!newFavorite) {
        return next(new HttpError('La película no pudo ser agregada a favoritos', 422));
    }

    res.status(201).json(newFavorite);

   } catch (error) {
        return next(new HttpError(error));
   }
}

// REMOVE FAVORITE MOVIE
// POST api/movies/remove-favorite/:id
// PROTECTED
const removeFavorite = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.findById(req.user.id);
        const userId = user._id
        const movie = await Favorite.findOne({user: userId, movieId: id});
        const movieId = movie._id;

        if (!movie) {
            return next(new HttpError('No se pudo eliminar la película', 422));
        }

        await Favorite.findByIdAndDelete(movieId);
        res.status(200).json(`Película Favorita ${movieId} eliminada`);

    } catch (error) {
        return next(new HttpError(error));
    }
}

// GET ONE FAVORITE MOVIE 
// GET api/movies/get-one-favorite/:id
// PROTECTED
const getOneFavorite = async(req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.findById(req.user.id);
        const userId = user._id
        const movie = await Favorite.findOne({user: userId, movieId: id});

        if (!movie) {
            return next(new HttpError('La película no ha sido agregada a favoritos', 422));
        }

        res.status(201).json(movie);

    } catch (error) {
        return next(new HttpError(error));
    }
}

// GET ALL FAVORITE MOVIES
// GET api/movies/get-favorites/:id
// PROTECTED
const getFavorites = async (req, res, next) => {
    try {
        const {id} = req.params;
        const favoriteMovies = await Favorite.find({user: id});

        if (!favoriteMovies) {
            return next(new HttpError('No tienes Películas Favoritas', 422));
        }

        res.status(201).json(favoriteMovies);

    } catch (error) {
        return next(new HttpError(error));
    }
}

module.exports = {
    addFavorite,
    removeFavorite,
    getOneFavorite,
    getFavorites
}