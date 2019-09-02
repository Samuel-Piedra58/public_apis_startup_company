# Techdegree Project-05: Public API Requests

This project is part of the Treehouse Full Stack JavaScript Techdegree program. This repository will contain the files relating to project 5.

A mock employee directory for a fake company. This project implemented AJAX, modern JavaScript syntax and Web Api's to create asynchronous requests to a public REST API. The random user data was generated using [randomuser.me](https://randomuser.me/) and their public api.

## Awesome Startup Employee Directory

This project makes use of the fetch Web API to build a dynamic page that displays a list of random employees that work at an "Awesome Startup Company."

When the page loads you will see 12 random employees rendered, each with their own card. The random employees data is retrieved from the [Random User Generator API](https://randomuser.me/) and using the [fetch Web API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch). The user will have the option to click a card and display the employee in a modal window. With the modal window visible the user can toggle back and forth between the previous and next employee's information. Within the page there is also the option to search through the name's of the employees and display only those cards that contain the given search criteria. One thing to keep in mind is that the modal window will only toggle back and forth for those employees that are visible. This means if a search was applied (resulting in some cards being hidden) then the modal window will only allow the user to toggle through those visible cards.

## Custom Project Features

There are several aspects of this project that were edited from the original styling. Part of the project suggests taking a crack at editing the styling and interactivity of the webpage separate from what was supplied by Treehouse. The reader of the source code will notice those changes applied at the end of the [styles.css](css/styles.css) file. Below is a list of the following features/styles updated for this project:

- HTML Background Image set to the following [pattern](images/pw_maze_white.png).
- Header Background-Color set to a CSS gradient and included border-bottom property.
- Included box-shadow and thicker and darker borders for each employee card.
- On hover the card will transition to the background color: rgb(255, 224, 189).
- In the event the API request fails, an error message will render for the user.
