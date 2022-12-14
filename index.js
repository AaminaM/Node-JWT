const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

var PORT = 8000;

const uri = process.env.URI;

mongoose.connect(uri, {
    useNewUrlParser:true,
    useCreateIndex:true
}, ()=> {
        console.log('Connected to the database ')
})

const routes = require('./routes/routes')

app = express();
app.use(express.json())

app.use('/api', routes)

 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})












