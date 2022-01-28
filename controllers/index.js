const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./landing page-routes.js');

router.use('/', home-routes);
router.use('/dashboard', landingpage-routes);
router.use('/api', apiRoutes);

module.exports = router;