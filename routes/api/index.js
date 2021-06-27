const router = require('express').Router();

const commentRoutes = require('./thought-routes');
const pizzaRoutes = require('./user-routes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router; 