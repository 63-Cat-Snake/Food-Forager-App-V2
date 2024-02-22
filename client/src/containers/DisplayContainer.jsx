import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import testRestaurants from '../testRestaurants.json';
import heartUnselected from '../assets/heartUnselected.png'; 
import heartSelected from '../assets/heartSelected.png';



export default function DisplayContainer({ fetchedData }) {
  const [selectedHearts, setSelectedHearts] = useState({});

  const handleHeartClick = (index) => {
    setSelectedHearts(prevState => {
      // Make patch request
      // Send user id
      // Send Lattitude Longitude of user
      const newState = { ...prevState, [index]: !prevState[index] };
      console.log('New state:', newState);
      return newState;
    });
  };
  

  return (
    <div className="gap-2 flex px-3 place-content-center flex-wrap displayContainer">
      {/* fetchedData.map... */
      testRestaurants.map((item, index) => (
        <Card
          className="restaurant rounded-sm"
          key={index}
          // isPressable
          // onPress={() => console.log("Card pressed")}
        >
          <div
            className="heart-icon top-1 right-1 pr-1 pt-1 cursor-pointer z-50"
            onClick={() => handleHeartClick(index)}
          >
            <img src={selectedHearts[index] ? heartSelected : heartUnselected} alt="heart" />
          </div>
          <CardHeader className="pb-1.5 pt-1.5 flex-col items-center justify-center">
            <b className="font-bold text-large">{item.name}</b>
            <p className="rating">
            {item.weighted_rating_value && !isNaN(item.weighted_rating_value) ? (
              <b>★ {Number(item.weighted_rating_value).toFixed(2)}</b>
            ) : null}
            </p>
            <p className="milesAway">
                {item.miles.toFixed(2)}
                {" miles away "}
              </p>
          </CardHeader>
          <CardBody className="overflow-visible p-0 items-center">
            <Image 
              width="100%"
              alt={item.name}
              className="w-full object-cover h-[100px] restaurantImage"
              src={item.logo_photos[0]}
            />
          </CardBody>
          <CardFooter className="restaurantFooter flex-col text-small pt-3 pb-3">
            <div className="address">
            <p>
              {item.address.street_addr}
            </p>
            <p>
              {item.address.city}
            </p>
            </div>
            <div className="buttonDiv pt-2">
            <Popover placement="bottom" showArrow={true}>
              <PopoverTrigger>
                <div className="popoverButton">Hours</div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">
                    <b>Operational Hours</b>
                  </div>
                  {Object.keys(item.local_hours.operational)
                    // Sort the keys based on the index of each day in the week, starting from Monday (1) to Sunday (0)
                    .sort((a, b) => {
                      const daysOfWeek = [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ];
                      return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b);
                    })
                    // Map over the sorted keys and render the corresponding div elements
                    .map((key) => (
                      <div
                        key={key}
                        className="text-tiny"
                      >{`${key}: ${item.local_hours.operational[key]}`}
                      </div>
                    ))}
                    <p className="text-tiny uppercase font-bold">Phone: {item.phone_number}</p>
                </div>
              </PopoverContent>
            </Popover>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
