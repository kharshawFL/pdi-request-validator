'use strict';

var express = require('express');
const YAML = require('yamljs');
var path = require('path');
var http = require('http');
var cors = require('cors');
const swaggerUi = require('swagger-ui-express');
var OpenApiValidator = require('express-openapi-validator');

var serverPort = 5555;

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: false}));

const swaggerDoc = YAML.load('./openapi.yaml');

const spec = path.join(__dirname, 'api/openapi.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(OpenApiValidator.middleware({
    apiSpec: './openapi.yaml',
    validateRequests: true,
    validateResponses: false,
}));

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        error: err.errors,
    });
});

app.all('/*', (req, res, next) => {
    console.log(`called: ${req.method} ${req.path}`);
    res.status(200).send('OK');
})

app.use(cors());

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/api-docs', serverPort);
});

