//End points for the application //

const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const landingpageRoutes = require('./landing-page-routes');

router.use('/', homeRoutes);
router.use('/dashboard', landingpageRoutes);
router.use('/api', apiRoutes);

module.exports = router;