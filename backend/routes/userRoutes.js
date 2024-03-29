const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUser} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUser);

module.exports = router;