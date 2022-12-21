const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv').config();

var PORT = 8000;

const { MONGO_URI } = process.env;

mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
      //useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });

const routes = require('./routes/routes')

app = express();
app.use(cors(
  {
    credentials:true,
    origin: ['http://localhost:8000']
  }
))
app.use(express.json())

app.use('/api', routes)

 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})












