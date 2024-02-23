const express = require('express');
const apiController = {};
const axios = require('axios');
const Restaurant = require('../models/restaurantModel');
const Favorite = require('../models/favoriteModel');

const APIKey = '1e971a009f6e4ab1bd6aa263960bd053';

apiController.favorite = async (req, res, next) => {
  let { cuisine, budget, distance, latitude, longitude, _id } = req.body;

  latitude = Math.floor(latitude);
  longitude = Math.floor(longitude);

  try {
    const result = await Restaurant.findOne({
      cuisine,
      budget,
      distance,
      latitude,
      longitude,
    });

    // Get an array with all Favorite IDS
    const favorite = await Favorite.find();

    // JUST IN CASE OUR COLLECTION IS EMPTY
    if (favorite.length === 0) {
      // if nothing inside favorite model
      const favCreate = new Favorite({
        favList: [_id],
      });
      await favCreate.save();
    }

    let newList;
    // Loop through and update favoriate TRUE OR FALSE
    result.restaurantList.forEach((restaurant) => {
      if (restaurant._id === _id)
        if (!restaurant.favorite) {
          restaurant.favorite = true; // mark as true
          // push in the fav id if NOT INCLUDED
          if (!favorite[0].favList.includes(_id)) favorite[0].favList.push(_id);
        } else {
          restaurant.favorite = false;
          const index = favorite[0].favList.indexOf(_id);
          // cut out the fav ID
          newList = favorite[0].favList
            .slice(0, index)
            .concat(favorite[0].favList.slice(index + 1));
        }
    });

    // Update Favorite List
    await Favorite.findOneAndUpdate(
      { favList: favorite[0].favList },
      { favList: newList }
    );

    // Need to update the list in DATABASE after changing the value
    await Restaurant.findOneAndUpdate(
      { cuisine, budget, distance, latitude, longitude },
      { restaurantList: result.restaurantList }
    );

    return next();
  } catch (err) {
    return next({
      log: `An error occured in apiController.favorite: ${err}`,
      // Status 500 Databse Error
      status: 500,
      message: {
        err: 'An error occured in apiController.favorite',
      },
    });
  }
};

apiController.onload = async (req, res, next) => {
  try {
    // Return an Array with ALL RESTAURANTS from last call
    res.locals.restaurantData = await Restaurant.find()
      .sort({ _id: -1 })
      .limit(1);
    return next();
  } catch (err) {
    return next({
      log: `An error occured in apiController.onload: ${err}`,
      // Status 500 Databse Error
      status: 500,
      message: {
        err: 'An error occured in apiController.onload',
      },
    });
  }
};

apiController.formatRequestData = async (req, res, next) => {
  let { cuisine, budget, distance, latitude, longitude } = req.params;

  // Round the coordinate to match database & find method
  latitude = Math.floor(latitude);
  longitude = Math.floor(longitude);

  try {
    if (!cuisine || !budget || !distance || !latitude || !longitude) {
      return next({
        log: 'Express error handler caught apiController.formatRequestData middleware error',
        status: 500,
        message: { err: 'Incomplete Fields!' },
      });
    }

    // check if existed in database
    const result = await Restaurant.findOne({
      cuisine,
      budget,
      distance,
      latitude,
      longitude,
    });
    console.log('result is ', result);

    if (result !== null) {
      res.locals.restaurantData = result.restaurantList;
      return next();
    }

    const apiResponseData = await axios.get(
      `https://api.spoonacular.com/food/restaurants/search?cuisine=${cuisine}&budget=${budget}&distance=${distance}&lat=${latitude}&lng=${longitude}&apiKey=${APIKey}`
    );

    // restaurantData will be an array of restaurant objects
    console.log(apiResponseData);
    const restaurantList = apiResponseData.data.restaurants;

    // Add Favorite to each restaurant object
    restaurantList.forEach((restaurant) => (restaurant.favorite = false));

    const restaurant = new Restaurant({
      latitude,
      longitude,
      restaurantList,
      cuisine,
      budget,
      distance,
    });
    await restaurant.save();

    // Send list back
    res.locals.restaurantData = apiResponseData.data.restaurants;

    return next();
  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).send('Internal Server Error');
  }
};
module.exports = apiController;
