const express = require('express');
const apiController = {}
const axios = require('axios');
const Restaurant = require('../models/restaurantModel');

const APIKey = '1e971a009f6e4ab1bd6aa263960bd053'

apiController.formatRequestData = async (req, res, next) => {
  const {cuisine, budget, distance, latitude, longitude} = req.params
  // console.log(cuisine, budget, distance, latitude, longitude);
  try{
    if (!cuisine || !budget || !distance || !latitude || !longitude) {
      return next({
        log:'Express error handler caught apiController.formatRequestData middleware error',
        status: 500,
        message: {err: 'Incomplete Fields!'}
      })
    }

    // check if existed in database
    const result = Restaurant.findOne({ cuisine, budget, distance, latitude, longitude });
    if (result){
      res.locals.restaurantData = result.data;
      return next();
    } 
    console.log(`latitude: ${latitude} & longitude: ${longitude}`);
    const apiResponseData = await axios.get(`https://api.spoonacular.com/food/restaurants/search?cuisine=${cuisine}&budget=${budget}&distance=${distance}&lat=${latitude}&lng=${longitude}&apiKey=${APIKey}`)

    //restaurantData will be an array of restaurant objects
    console.log(apiResponseData)
    res.locals.restaurantData = apiResponseData.data.restaurants

    console.log(apiResponseData.data)
    const restaurantList = apiResponseData.data.restaurants;

    const restaurant = new Restaurant({ latitude, longitude, restaurantList, cuisine, budget, distance });

    await restaurant.save();
    return next()

  }catch (error){
    console.error('Error fetching data from API:', error);
    res.status(500).send('Internal Server Error');
  }
}
module.exports = apiController;

// 34.4358912 & longitude: -119.6228608