# Homework Week 6
## Weekly-Weather-Report

### User Story
```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

### Acceptance Criteria
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```
### Work Description
I first created the HTML files index and results and added a basic layout then designed the look and layout of the pages with CSS until I had a framework to implement the JavaScript.

I started with the API call to get location data from the city input on the index page, after receiving the correct data I extracted the lat and long values to be used in the Weather API call and set city value into local storage. I then called the data for the weather and using Async and Await functions received the data from the select location, I then sorted through the data received and created todays weather element and the subsequent 5 day weather forecast using specific data.

I then styled the page to show the data correctly and in a user friendly way with icon images from local folder to represent weather and also show results of items stored in local storage on both pages. I added functionality of searching from previous searches found in local storage and conditions to not set local storage item if city has already been searched for.

I spent along time fixing multiple issues with the API call data and receiving correct data from the call. I also had issues resubmitting previous search results from both search box and local storage elements. After working through all these issues I now have a fully functioning website that meets the requirements and doesn't throw any errors.

>## [**Link to live GitPage**](https://lucienpep.github.io/Weekly-Weather-Report/)

![Time Schedule Calender](./Assets/Screenshot/Week-6-Homework%20Weather%20API%20Screenshot.png)

---
Lucien Haines UADL 2023