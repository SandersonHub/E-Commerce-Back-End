const express = require('express');
const routes = require('./routes');
const sequelize = require('sequelize');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
// syncs the sequelize models to the database
sequelize.sync().then(() => { //used to syncghronize all models in the db
  app.listen(PORT, () => { //listens to incoming HTTP requests
    console.log(`App listening on port ${PORT}!`); //logs the port number
  });
}).catch(error => { //error handling
  console.error('CAN NOT CONNECT DB', error);
});


