const router = require('express').Router();
const userRoutes = require('./userRoutes');
const searchRoutes = require('./searchRoutes');

router.use('/users', userRoutes);
router.use('/searches', searchRoutes);

module.exports = router;
