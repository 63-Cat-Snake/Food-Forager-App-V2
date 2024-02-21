import React from "react";
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



export default function DisplayContainer({ fetchedData }) {

  

  return (
    <div className="gap-2 flex  px-3 place-content-center flex-wrap displayContainer">
      {/* fetchedData.map... */
      testRestaurants.map((item, index) => (
        <Card
          className="restaurant rounded-sm"
          key={index}
          isPressable
          onPress={() => console.log("item pressed")}
        >
          <CardHeader className="pb-1.5 pt-1.5 flex-col items-center justify-center">
            <b className="font-bold text-large">{item.name}</b>
            {/* <Popover placement="bottom" showArrow={true}>
              <PopoverTrigger>
                <Button>Hours</Button>
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
            </Popover> */}
          </CardHeader>
          {/* <Divider /> */}
          <CardBody className="overflow-visible p-0 items-center">
            <Image 
              width="90%"
              alt={item.name}
              className="w-full object-cover h-[140px] restaurantImage"
              src={item.logo_photos[0]}
            />
          </CardBody>
          {/* <Divider /> */}
          <CardFooter className="text-small justify-center restaurantFooter">
            <div className="flex items-start">
              <p className="mr-4">
                <b>★ {Number (item.weighted_rating_value).toFixed(2)} </b>
              </p>
              <p className="text-default-500 ">
                {item.address.street_addr}
                <br />
                {item.address.city}
                <br />
                {item.miles.toFixed(2)}
                {" miles away "}
              </p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
