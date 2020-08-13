const express= require('express');
const Car = require('../models /Car')
const router = express.Router();
const User = require('../models /User')
const mongoose= require('mongoose')


router.get('/',async(req,res)=> {

    try{
        const savedcar = await Car.find();
        res.json(savedcar);
        }
        catch(err){
            res.json(err)
        }

res.send('carlist')
})

router.post('/', async(req,res) => {

    const car = new Car(
         req.body   

    );

    try{
        const savedcar = await car.save();
        res.json(savedcar);
        }
        catch(err){
            res.json(err)
        }
    
});

router.post('/user' ,async(req,resp)=> {

    var myData = new User(req.body);
 myData.save()
 .then(item => {
 resp.send("item saved to database");
 })
 .catch(err => {
 resp.status(400).send("unable to save to database");
 });

})

router.get('/search' ,async(req,res)=>{
  console.log((req.query))
    let values = Object.values(req.query)
    console.log(values)
   let  nofilterlist =  values.filter((x)=> x.length==0)
   console.log(nofilterlist)
    console.log(nofilterlist.length)
    console.log(values.length)
    if( (nofilterlist.length==values.length) || values.length==0){
        try{
             savedcar = await Car.aggregate([  {$lookup:    { from:"sellers", localField:"carinformation.sellerID", foreignField:"_id", as:"seller" } },getprops() ])
            res.json(savedcar);
            }
            catch(err){
                res.json(err)
            }
    }
    else{
        var queryobj={};
        for(i=0;i<Object.keys(req.query).length;i++){
      
       var key =Object.keys(req.query)[i];
       var currentValue= req.query[key]
       console.log(currentValue)
      if(currentValue.length!=0){
        keyAsString=key.toString();
        queryobj[keyAsString]= currentValue;
        
      }
      else  ;
      
    }
    
    try{
        
        const savedcar = await Car.aggregate([ { $match : {$and:[getquery(queryobj)]} }, {$lookup:    { from:"sellers", localField:"carinformation.sellerID", foreignField:"_id", as:"seller" } },getprops() ])

        res.json(savedcar);
        }
        catch(err){
            res.json(err)
        }
     
    
}
       
    

})

 function getquery(obj){
  var queryobj ={$and:[]};
 console.log((obj.kilometerssecond))
 

var kilometersfirst=0
var kilometerssecond=10000000
var pricefirst=0;
var pricesecond=1000000
var registrationfirst='1920-01-01';
var registrationsecond= '2020-03-01'

console.log(registrationfirst)
console.log(registrationsecond)

if(obj.hasOwnProperty('kilometersfirst')) kilometersfirst= new Number(obj.kilometersfirst).valueOf()
if(obj.hasOwnProperty('kilometerssecond')) kilometerssecond= new Number(obj.kilometerssecond).valueOf()
if(obj.hasOwnProperty('pricefirst')) pricefirst= new Number(obj.pricefirst).valueOf()
if(obj.hasOwnProperty('pricesecond')) pricesecond= new Number(obj.pricesecond).valueOf()
if(obj.hasOwnProperty('brand')) queryobj.$and.push({"Merkmale.brand":obj.brand})
if(obj.hasOwnProperty('model')) queryobj.$and.push({"Merkmale.model":obj.model})
if(obj.hasOwnProperty('form')) queryobj.$and.push({"carinformation.form":obj.form});
if(obj.hasOwnProperty('registrationfirst')) registrationfirst=obj.registrationfirst;
if(obj.hasOwnProperty('registrationsecond')) registrationsecond=obj.registrationsecond;



 
 
queryobj.$and.push({"carinformation.registration":{"$gte": new Date(registrationfirst), "$lt": new Date(registrationsecond)}}) 
queryobj.$and.push({"carinformation.kilometers":{$gte:kilometersfirst ,$lt:kilometerssecond}})

queryobj.$and.push({"carinformation.kilometers":{$gte:pricefirst ,$lt:pricesecond}})

  return queryobj;
 }

 function getprops(){

 
return({ $project:{_id:1,"carinformation.title":1,"carinformation.price":1,"carinformation.kilometers":1,"carinformation.registration":1,"carinformation.power":1,"carinformation.state":1,"carinformation.holder":1,"carinformation.transmission":1,"carinformation.engine":1,"umwelt.kombi":1,"umwelt.co2Emission":1,"imgsrc":1,"seller.city":1,"seller.link":1,"seller.name":1, typeCategory: {$arrayElemAt:["$seller",0] } }})
 }

 router.get("/id/:id",async(req,res)=>{

 try{

    car = await Car.aggregate([{ $match: { _id: mongoose.Types.ObjectId(req.params.id) } },{$lookup:    { from:"sellers", localField:"carinformation.sellerID", foreignField:"_id", as:"seller" } } ])
    console.log(car)
    
    res.json(car)
 }catch(err){
     res.json(err)
 }

 })

 router.get('/model/:brand',async(req,res)=>{
   
    try{

      const  model = await Car.find( { "Merkmale.brand": req.params.brand }, { "Merkmale.model": 1 ,"_id":0} )

        console.log(req.params.brand)
        
        res.json(model)
     }catch(err){
         res.json(err)
     }

 })
 router.get('/brand',async(req,res)=>{
   
    try{

      const  brands = await Car.find({}, { "Merkmale.brand": 1 ,"_id":0} )


        
        
        res.json(brands)
     }catch(err){
         res.json(err)
     }

 })
 router.get('/form/',async(req,res)=>{
   
    try{

      const  form = await Car.find( { }, { "carinformation.form": 1 ,"_id":0} )


        console.log(req.params.brand)
        
        res.json(form)
     }catch(err){
         res.json(err)
     }

 })



module.exports = router;