import React, { useState, useEffect } from 'react';
import { Input, Button, ButtonGroup } from '@nextui-org/react';
import DropDown from '../components/DropDown.jsx';

export default function UserForm({
  hitSearch,
  loadingState,
  setLoadingState,
  submitButtonText,
  setSubmitButtonText,
}) {
  const [cuisine, setCuisine] = useState('Whatcha in the mood for?');
  const [distance, setDistance] = useState(0);
  const [budget, setBudget] = useState(0);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [incompleteFields, setIncompleteFields] = useState(false);
  const [isInvalidDistance, setIsInvalidDistance] = useState(false);
  const [isInvalidBudget, setIsInvalidBudget] = useState(false);

  const handleSubmit = (e) => {
    if (
      isInvalidBudget ||
      isInvalidDistance ||
      distance === 0 ||
      budget === 0 ||
      cuisine === 'Whatcha in the mood for?'
    ) {
      setIncompleteFields(true);
    } else {
      setIncompleteFields(false);
      setLoadingState(true);
      const successCallback = (position) => {
        console.log(position);
        console.log(position.coords);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      };
      const errorCallback = (error) => {
        console.log('ERROR IN GETTING USER LOCATION', error.message);
      };
      if ('geolocation' in navigator) {
        console.log('about to run geolocation thing');
        setSubmitButtonText('grabbing your location...');
        navigator.geolocation.getCurrentPosition(
          successCallback,
          errorCallback
        );
      }
    }
  };

  useEffect(() => {
    console.log(
      'Submitting and about to make request to Server.js',
      cuisine,
      distance,
      budget,
      latitude,
      longitude
    );
    hitSearch(cuisine, distance, budget, latitude, longitude);
  }, [latitude, longitude]);

  useEffect(() => {
    if (isNaN(distance)) {
      setIsInvalidDistance(true);
    } else if (distance > 20) {
      setIsInvalidDistance(true);
    } else {
      setIsInvalidDistance(false);
    }
  }, [distance]);

  useEffect(() => {
    if (isNaN(budget)) {
      setIsInvalidBudget(true);
    } else setIsInvalidBudget(false);
  }, [budget]);

  return (
    <div className='userFormContainer'>
      <DropDown
        className='userFormItem'
        color='secondary'
        setCuisine={setCuisine}
        cuisine={cuisine}
      />
      <Input
        className='userFormItem'
        color={isInvalidDistance && 'danger'}
        errorMessage={
          isInvalidDistance && 'Please enter a valid distance (<20 mi)'
        }
        endContent='mi'
        onChange={(e) => setDistance(e.target.value)}
        style={{ border: 'none' }}
        size='md'
        label={
          <span style={{ color: 'black' }}>How close does it need to be?</span>
        }
        labelPlacement='outside'
        placeholder='distance (in miles)'
      />
      {/* add maximum distance */}
      <Input
        className='userFormItem'
        color={isInvalidBudget && 'danger'}
        errorMessage={isInvalidBudget && 'Please enter a valid dollar value'}
        startContent='$'
        onChange={(e) => setBudget(e.target.value)}
        style={{ border: 'none' }}
        size='md'
        label={
          <span style={{ color: 'black' }}>How much are you tryna spend?</span>
        }
        labelPlacement='outside'
        placeholder='budget (in USD)'
      />
      {/* <UserLocation setLatitude={(latitude) => setLatitude(latitude)} setLongitude={(longitude) => setLongitude(longitude)}/> */}
      {incompleteFields && <h2 style={{ color: 'red' }}>Incomplete Fields!</h2>}
      <Button
        isLoading={loadingState}
        color='primary'
        onPress={handleSubmit}
        className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg userFormItem'
        size='md'
      >
        {submitButtonText}
      </Button>
    </div>
  );
}
