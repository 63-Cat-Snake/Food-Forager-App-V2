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

export default function DisplayContainer({ fetchedData }) {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 displayContainer">
      {fetchedData.map((item, index) => (
        <Card
          className="restaurant"
          shadow="sm"
          key={index}
          isPressable
          onPress={() => console.log("item pressed")}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start items-center justify-center">
            <b className="font-bold text-large">{item.name}</b>
            <Popover placement="bottom" showArrow={true}>
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
            </Popover>
          </CardHeader>
          <Divider />
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.name}
              className="w-full object-cover h-[140px] restaurantImage"
              src={item.logo_photos[0]}
            />
          </CardBody>
          <Divider />
          <CardFooter className="text-small justify-between restaurantFooter">
            <p>
              <b>★ {Number(item.weighted_rating_value).toFixed(2)} Rating</b>
            </p>
            <p className="text-default-500">
              {item.address.street_addr}
              {", "}
              {item.address.city}
              {", "}
              {item.address.state}
              {", "}
              {item.miles.toFixed(2)}
              {" mi away, "}Is open: {item.is_open ? "Yes" : "No"}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
