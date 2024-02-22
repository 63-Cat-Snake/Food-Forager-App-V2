import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { Select, SelectSection, SelectItem } from "@nextui-org/react";

export default function DropDown({ cuisine, setCuisine , isInvalidCuisine}) {
  const selectedValue = cuisine;

  const cuisines = [
    'Asian',
    'American',
    'Cajun',
    'Caribbean',
    'Chinese',
    'French',
    'German',
    'Greek',
    'Indian',
    'Italian',
    'Japanese',
    'Korean',
    'Latin American',
    'Mediterrean',
    'Mexican',
    'Middle Eastern',
    'Southern',
    'Spanish',
    'Thai',
    'Vietnamese',
  ];

  return (
    <div className = 'userFormFlex' style = {{ border: 'none'}}>
      {/* <Dropdown>
        <DropdownTrigger>
          <Button color='default' variant='solid' >
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label='Static Actions' selectionMode='single'>
          {cuisines.map((cuisine, index) => (
            <DropdownItem
              key={index}
              onPress={(e) => setCuisine(e.target.textContent)}
            >
              {cuisine}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown> */}
      <Select
        isRequired
        radius = "sm"
        size = "lg"
        label = "Favorite Cuisine"
        placeholder = "Select a Category"
        className = 'userFormItem'
        style = {{ border: 'none' }}
        onChange = { (e) => setCuisine(e.target.value) }
        color = {isInvalidCuisine ? "danger" : ""}
      >
        {cuisines.map((cuisineItem, index) => (<SelectItem key = { cuisineItem } value = { cuisineItem }>{ cuisineItem }</SelectItem>))}
      </Select>
    </div>
  );
}
