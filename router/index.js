const Express = require('express');
const config = require('../next.config');
const bodyParser = require('body-parser');
const { serverRuntimeConfig, publicRuntimeConfig } = config;
const router = Express.Router();

router.use(bodyParser.json());

module.exports = router;