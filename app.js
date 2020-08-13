const express = require('express');
const mongoose= require('mongoose')
const app= express();
const bodyparser = require('body-parser')
require('dotenv/config')
const carRoute= require('./routes/Car')
const sellerRoute=require('./routes/Seller')
var cors = require('cors')
app.use(cors({origin: 'http://localhost:8080'}));
app.use(bodyparser.json())
app.use('/car', carRoute);
app.use('/seller',sellerRoute);


app.get('/',(req,rsp)=>{
    console.log(mongoose.connection.readyState);
rsp.send('HAllo')

})


mongoose.connect('mongodb://127.0.0.1:27017/cardealer',{ useNewUrlParser: true, useUnifiedTopology: true },()=> console.log('connected to DB'))


app.listen(5000);