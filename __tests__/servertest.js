const app = require('../server/server.js'); // Link to server file
const request = require('supertest');
const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://kravchuknick:jDnS1N7Xt0kPSBP8@food-forager-app-v2.jzse2jb.mongodb.net/';

// const server = 'http://localhost:3000';
// const request = supertest(app);

describe('Route integration unit test', () => {
  /* Connecting to the database before each test. */
  beforeEach(async () => {
    await mongoose.connect(MONGO_URI);
  });

  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  // GET request to ROOT
  describe('Root endpoint', () => {
    it('should respond with HTML file and status 200', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.header['content-type']).toBe('text/html; charset=UTF-8');
    });
  });
});

/*

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

*/
