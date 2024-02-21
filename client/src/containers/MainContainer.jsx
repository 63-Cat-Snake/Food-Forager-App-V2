import React, { useState } from 'react';
import DisplayContainer from './DisplayContainer.jsx';
import UserForm from './UserFormContainer.jsx';
import axios from 'axios';

export default function MainContainer() {
  const [displayData, setDisplayData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState('Find Restaurants!');

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
      <DisplayContainer fetchedData={displayData} />
    </div>
  );
}
