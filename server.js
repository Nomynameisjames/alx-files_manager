/*
 * objective ->  create the Express server:
 * it should listen on the port set by the environment variable 
    PORT or by default 5000
 * it should load all routes from the file routes/index.js
 */

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const routes = require('./routes/index.js');

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);
