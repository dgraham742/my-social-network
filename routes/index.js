const router = require('express').Router();

//import all the API routes from the index.js
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req,res) => {
   return res.status(404).send('message: 404 error')
});
module.exports = router;