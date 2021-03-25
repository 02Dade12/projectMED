const router = require('express').Router();

const mainRoutes = require('./mainRoutes');
const apiRoutes = require('./api');

router.use('/', mainRoutes);
router.use('/api', apiRoutes);
 
module.exports = router;

