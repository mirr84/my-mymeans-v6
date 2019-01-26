const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const apis = express();

const portApi = 8000;

apis.use(bodyParser.urlencoded({ extended: false }));
apis.use(bodyParser.json());
apis.use(cors());

require('./api/news').init(apis);
require('./api/auth').init(apis);

apis.listen(portApi, () => console.log(`Listening api on port ${portApi}`));