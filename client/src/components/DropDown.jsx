import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';

export default function DropDown({ cuisine, setCuisine }) {
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
    <Dropdown>
      <DropdownTrigger>
        <Button style={{ color: 'white', backgroundColor: '#52CC7A' }}>
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
    </Dropdown>
  );
}
