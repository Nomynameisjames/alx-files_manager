/*
 * objective ->  create the Express server:
 * it should listen on the port set by the environment variable
    PORT or by default 5000
 * it should load all routes from the file routes/index.js
 */
import express from 'express';
import router from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
