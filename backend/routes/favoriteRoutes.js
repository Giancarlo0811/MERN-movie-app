const express = require('express');
const router = express.Router();
const {addFavorite, removeFavorite, getOneFavorite, getFavorites} = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add-favorite', authMiddleware, addFavorite);
router.delete('/remove-favorite/:id', authMiddleware, removeFavorite);
router.get('/get-one-favorite/:id', authMiddleware, getOneFavorite);
router.get('/get-favorites/:id', authMiddleware, getFavorites );

module.exports = router;