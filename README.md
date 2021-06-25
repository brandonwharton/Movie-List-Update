# Movies Updates with Sagas

## Description

Duration: Two-Day Sprint

The purpose of this project was to make updates to a simple applictaion designed to display a list of movies stored in a local 
database. My requirements were to create a detail view for each of the movies when clicked that brings the user to a page containing the 
movie's full description, along with any genres associated with that movie stored on a separate database table. I was also instructed to add
a form component to add in new movies with the minimum requirement of associating one genre with that movie.

I added in an edit view accessible from the detail view where users can update details to any of the movies in the list. I also added
capacity to add multiple genres to a movie when filling out the form to add one. This project was a fun challenge for data and routing, 
figuring out how to maintain state between all the different views in a way that was friendly to both page refreshes and navigation between 
back buttons and the navbar. 

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