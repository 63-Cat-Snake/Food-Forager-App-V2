const app = require('../server/server.js'); // Link to server file
const request = require('supertest');
const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://kravchuknick:jDnS1N7Xt0kPSBP8@food-forager-app-v2.jzse2jb.mongodb.net/';

// const server = 'http://localhost:3000';
// const request = supertest(app);

describe('Route integration', () => {
  //   /* Connecting to the database before each test. */
  //   beforeEach(async () => {
  //     await mongoose.connect(MONGO_URI);
  //   });

  //   /* Closing database connection after each test. */
  //   afterEach(async () => {
  //     await mongoose.connection.close();
  //   });

  // GET request to ROOT
//   test('GET /', (done) => {
//     request(app)
//       .get('/')
//       .expect(200)
//       .expect('Content-Type', /html/) // Expect the Content-Type to be HTML
//       .end((err, res) => {
//         if (err) return done(err);
//         // You can add more checks here. For example, check if the response body contains a specific string:
//         expect(res.text).toContain('<!DOCTYPE html>');
//         return done();
//       });
//   });
});


/*

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

*/