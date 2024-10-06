# Flight Search Application

## Overview

The Flight Search Application is a Node.js-based web service that helps users find the best flights for a specified trip duration. It allows users to input their departure and destination airports along with the number of nights they wish to stay. The application returns the optimal dates to travel and return, as well as the estimated cost of the trip.

The application leverages the Skyscanner API to gather flight information and utilizes a custom algorithm to calculate the cheapest dates for travel within a specified time frame.

## Features

- **Flight Search Interface:** Users can search for flights by entering their departure airport, destination airport, and trip duration (in nights).
- **Autocomplete Search Fields:** The departure and destination fields have autocomplete functionality to help users find the correct airport.
- **Optimal Travel Date Calculation:** The application calculates the optimal travel and return dates based on the lowest available prices for the trip duration.
- **User-Friendly Interface:** The front-end is designed using HTML, CSS, and JavaScript to provide an intuitive and easy-to-use interface.

## Published Website

Visit the live website here: [Flight Search Application](https://ruby-handy-iridium.glitch.me/)

## Dependencies

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **Body-Parser**: Middleware to parse incoming request bodies
- **Fetch API**: Used for HTTP requests to the Skyscanner API
