const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); // import sequelize connection


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => { //used to sync all of the models to the database
  app.listen(PORT, () => { //listens to the imcoming http request
    console.log(`App listening on port ${PORT}!`) //logs the port number
  })
});

//removed error catch, was causing issues with the server.
