const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// importing Routes from
const authRoute = require('./routes/auth');

//connect to DB
try{
  mongoose.connect(process.env.DB,{ useNewUrlParser: true, useUnifiedTopology: true },() => console.log('Connect'));
}catch(error){
    console.error(error);
}


//MiddleWare
app.use(express.json());


// Routes MiddleWare
app.use('/api/user', authRoute);




app.listen(80, () => console.log('listening on localhost:80'));
