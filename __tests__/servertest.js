const app = require('../server/server.js'); // Link to server file
const request = require('supertest');
const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://kravchuknick:jDnS1N7Xt0kPSBP8@food-forager-app-v2.jzse2jb.mongodb.net/';

describe('Route integration unit test', () => {
  /* Connecting to the database before each test. */
  beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
  });

  /* Closing database connection after each test. */
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Root endpoint', () => {
    it('should respond with HTML file and status 200', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.header['content-type']).toBe('text/html; charset=UTF-8');
    });
    // TODO: check if MainDisplay recieve the last recent API calls
  });

  describe('Restaurants endpoint', () => {
    it('should respond with JSON format and status 200', async () => {
      const res = await request(app).get('/restaurants');
      expect(res.statusCode).toBe(200);
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    });

    it('should be in Array form', async () => {
      const res = await request(app).get('/restaurants');
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  xdescribe('Favorite endpoint', () => {
    it('should respond with JSON format and status 200', async () => {
      const res = await request(app).patch('/favorite').send({});
      expect(res.statusCode).toBe(200);
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    });

    it('should be in Object form', async () => {
      const res = await request(app).patch('/favorite').send({});
      expect(res.body).toBeInstanceOf(Object);
      // expect(res.body).toHaveProperty('favorite');
    });
  });
});
