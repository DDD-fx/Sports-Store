const express = require('express');
const https = require('https');
const fs = require('fs');
const history = require('connect-history-api-fallback');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const auth = require('./authMiddleware');
const router = jsonServer.router('server-data.json', '');
const enableHttps = true;
const ssloptions = {};

if (enableHttps) {
  ssloptions.cert = fs.readFileSync('./ssl/sports_store_cert.pem');
  ssloptions.key = fs.readFileSync('./ssl/sports_store_key.pem');
}

const app = express();
app.use(bodyParser.json());
app.use(auth);
app.use('/api', router);
app.use(history());
app.use('/', express.static('./dist/SportsStore'));
app.listen(80, () => console.log('HTTP Server running on port 80'));

if (enableHttps) {
  https
    .createServer(ssloptions, app)
    .listen(443, () => console.log('HTTPS Server running on port 443'));
} else {
  console.log('HTTPS disabled');
}
