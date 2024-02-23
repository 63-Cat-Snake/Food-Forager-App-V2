import React, { useState, useEffect } from 'react';
import DisplayContainer from './DisplayContainer.jsx';
import UserForm from './UserFormContainer.jsx';
import axios from 'axios';

export default function MainContainer() {
  const [displayData, setDisplayData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState('Find Restaurants!');
  const [request, setRequest] = useState({});
  const [favorite, setFavorite] = useState({});

  useEffect(() => {
    fetch("/restaurants")
    .then((response) => response.json())
    .then((data) => {
      setDisplayData(data[0].restaurantList);
      setRequest({
        cuisine: data[0].cuisine,
        budget: data[0].budget,
        distance: data[0].distance,
        latitude: data[0].latitude,
        longitude: data[0].longitude
      })
      const recentFavorite = {};
      data[0].restaurantList.forEach((restaurant) => {
        recentFavorite[restaurant._id] = restaurant.favorite;
      });
      setFavorite(recentFavorite);
    })
    .catch((err) => console.error('Error:', err));
  }, []);


  useEffect(() => {
    fetch('/restaurants')
      .then((response) => response.json())
      .then((data) => {
        setDisplayData(data[0].restaurantList);
      })
      .catch((err) => console.error('Error:', err));
  }, []);

  const handleSearch = async (
    cuisine,
    distance,
    budget,
    latitude,
    longitude
  ) => {
    try {
      if (latitude !== '') {
        setErrorMessage('');
        console.log(
          'User input successfully passed into App.jsx and about to make request to Server.js'
        );
        // Make the API request with the constructed optionSymbol
        setSubmitButtonText("looking for somethin' yummy...");
        const response = await axios.get(
          `/api/search/${cuisine}/${distance}/${budget}/${latitude}/${longitude}`
        );
        setLoadingState(false);
        setSubmitButtonText('Find Restaurants!');
        // console.log(response)
        // console.log(response.data);
        setDisplayData(response.data);
        const recentFavorite = {};
        response.data.forEach((restaurant) => {
          recentFavorite[restaurant._id] = restaurant.favorite || false;
        });
        setFavorite(recentFavorite);
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      setDisplayData([]);
      setErrorMessage('No contract found with given parameters.');
    }
  };

  return (
    <div className='mainContainer'>
      <UserForm
        hitSearch={handleSearch}
        loadingState={loadingState}
        setLoadingState={setLoadingState}
        submitButtonText={submitButtonText}
        setSubmitButtonText={setSubmitButtonText}
      />
      <DisplayContainer fetchedData={displayData} request={request} favorite={favorite} setFavorite={setFavorite}/>
    </div>
  );
}
