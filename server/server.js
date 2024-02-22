const express = require('express');
const axios = require('axios');
const path = require('path');
const mongoose = require('mongoose');

const apiController = require('./controllers/apiController.js');
const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URI =
  'mongodb+srv://kravchuknick:jDnS1N7Xt0kPSBP8@food-forager-app-v2.jzse2jb.mongodb.net/';

/* Username: kravchuknick  - Password: jDnS1N7Xt0kPSBP8  */
mongoose.connect(MONGO_URI, {
  dbName: 'users', // sets the name of the DB
});
// .then(() => console.log('Connected to Mongo DB.'))
// .catch((err) => console.log(err));

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('/output.css', (req, res) => {
  console.log('Request for output.css received');
  res.sendFile(path.join(__dirname, '..', 'client', 'src', 'output.css'), {});
});

app.get('/bundle.js', (req, res) => {
  console.log('Request for bundle.js received');
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'bundle.js'), {});
});

app.get('/', (req, res) => {
  console.log('Request for INDEX.HTML received');
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.get(
  '/api/search/:cuisine/:distance/:budget/:latitude/:longitude',
  apiController.formatRequestData,
  (req, res) => {
    const { restaurantData } = res.locals;
    return res.status(200).json(restaurantData);
  }
);

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  const defaultObj = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errObj = Object.assign({}, defaultObj, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

module.exports = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
