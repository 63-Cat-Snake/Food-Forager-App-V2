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
  const [cuisine, setCuisine] = useState('empty');
  const [distance, setDistance] = useState(10);
  const [budget, setBudget] = useState(20);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [incompleteFields, setIncompleteFields] = useState(false);
  const [isInvalidCuisine, setIsInvalidCuisine] = useState(false);
  const [isInvalidDistance, setIsInvalidDistance] = useState(false);
  const [isInvalidBudget, setIsInvalidBudget] = useState(false);

  const handleSubmit = (e) => {
    if (cuisine === 'empty') {
      setIsInvalidCuisine(true);
    } else setIsInvalidCuisine(false);
    if (
      isInvalidBudget ||
      isInvalidDistance ||
      distance === 0 ||
      budget === 0 ||
      cuisine === 'empty'
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
        console.log('about to run geolocation thingy');
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
    } else if (distance > 20 || distance < 0) {
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
    <div className = 'userFormContainer'>
      <div className="userForm">
        <DropDown
          setCuisine = { setCuisine }
          cuisine = { cuisine }
          isInvalidCuisine = {isInvalidCuisine}
        />
        <div className = "userFormInputFlex ">
          <Input
            radius = "sm"
            type = "number"
            className = 'userFormItem'
            color = { isInvalidDistance && 'danger' }
            errorMessage = { isInvalidDistance && 'Please enter a valid distance (<20 mi)' }
            endContent = {
              <div className="pointer-events-none">
                <span className="text-default-400 text-small">mi</span>
              </div>
            }
            defaultValue = { 10 }
            onChange = { (e) => setDistance(e.target.value) }
            style = {{ border: 'none' }}
            size = 'sm'
            label = { <span>Enter the Distance (in miles)</span> }
            // labelPlacement='outside'
            placeholder = '10'
            variant = "faded"
          />
          <Input
            radius = "sm"
            type = "number"
            className = 'userFormItem'
            color = { isInvalidBudget && 'danger' }
            errorMessage = { isInvalidBudget && 'Please enter a valid dollar value' }
            startContent= {
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            defaultValue = { 20 }
            onChange = { (e) => setBudget(e.target.value) }
            style = {{ border: 'none' }}
            size = 'sm'
            label = { <span>Price Range</span> }
            // labelPlacement='outside'
            placeholder = 'Enter your budget (in USD)'
          />
        </div>
        
        {/* add maximum distance */}
        <div className = "userFormFlex">
          
        </div>
        {/* <UserLocation setLatitude={(latitude) => setLatitude(latitude)} setLongitude={(longitude) => setLongitude(longitude)}/> */}
        {incompleteFields && <h2 style = {{ color: 'red' }}>Incomplete Fields!</h2> }
        <div className='buttonDiv'> 
        <Button
          radius = 'sm'
          isLoading = {loadingState}
          color = 'default'
          variant = "solid"
          onPress = {handleSubmit}
          className = "userFormItem"
          style = {{backgroundColor: 'black', color: 'white', fontSize: '16px', border: 'none', marginTop: '1%', width: '20%'}}
          // 'bg-gradient-to-tr from-pink-500 to-yellow-500 text-black shadow-lg userFormItem'
          // size = 'md'
        >
          <b>{ submitButtonText }</b>
        </Button>
        </div>
      </div>
    </div>
  );
}
