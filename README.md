# Movies Updates with Sagas

## Description

_Duration: Two-Day Sprint_

The purpose of this project was to make updates to a simple applictaion designed to display a list of movies stored in a local 
database. My requirements were to create a detail view for each of the movies when clicked that brings the user to a page containing the 
movie's full description, along with any genres associated with that movie stored on a separate database table. I was also instructed to add
a form component to add in new movies with the minimum requirement of associating one genre with that movie.

I added in an edit view accessible from the detail view where users can update details to any of the movies in the list. I also added
capacity to add multiple genres to a movie when filling out the form to add one. This project was a fun challenge for data and routing, 
figuring out how to maintain state between all the different views in a way that was friendly to both page refreshes and navigation between 
back buttons and the navbar. 

You can view this project on Heroku [here](https://floating-waters-88069.herokuapp.com/#/). Load time might take a while, it's being hosted for free and the link may have gone cold.

## Screen Shots

![app screenshot](/wireframes/ScreenShot1.png)
![app screenshot](/wireframes/ScreenShot2.png)

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Homebrew](https://brew.sh/)

## Installation

1. Begin running your local database by running `brew services start postgresql` in a terminal.
    - Stop database by running `brew services stop postgresql` in that same terminal.
2. Using provided database.sql file, use a database manager of your choice ([Postico](https://eggerapps.at/postico/)) to create a local
database with the listed tables name and structures. Seed data is provided.
3. Navigate to the root directory of the project in another terminal.
4. Run `npm install` in the terminal to install dependencies locally.
5. Run `npm run server` in your terminal to start the project's local server.
    - Stop the local server by pressing `ctrl-c`.
6. Run `npm run client` in another terminal to start the client page.
    - Stop the local server by pressing `ctrl-c`.    
7. Open a browser window and navigate to [http://localhost:3000/](http://localhost:3000/) to use the app.

## Usage

1. The home route shows a gallery of movie poster cards along with the genres associated with each movie in the database. There is a see details button
   that takes you to the details view for each individual movie. Clicking on the poster itself also navigates to the details view.
2. The details view shows more information about the movie clicked. It includes a longer description of the movie in addition to the genres involved. 
   There is a Back To List button that brings you back to the home page, and an Edit Details button that takes you to an edit view for the movie. 
3. The edit details view allows you to edit the title and description for the movie chosen. The Save Details button updates the database for that movie
   and brings you back to the details view for the movie chosen with the updated data. The cancel button brings you back to the details view without
   saving your changes.
4. The Add A Movie menu at the top brings you to a form where you can add another movie to the main list. It contains a prompt for a title, a URL for a
   movie poster image to be displayed, and a longer description of the movie. There is a dropdown select underneath that allows you to pick from a list of
   genres, of which you can select multiple to add to the movie. The save button saves the movie addition to the database and brings you back to the list
   view. The cancel button navigates back to the list view without saving the movie data.

## Built With

- React
- Redux-Saga
- Node.js
- PostgreSQL
- Axios
- Express
- Material-UI

## Acknowledgement

Another giant thanks to [Prime Digital Academy](https://www.primeacademy.io/) for the starting repo and instructions, and to the others
in my cohort for the support and feedback throughout the build process.