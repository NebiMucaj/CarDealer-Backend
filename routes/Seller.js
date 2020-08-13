const express= require('express');
const router= express.Router();
const Seller= require('../models /Seller')

router.post("/",async(req,res,next)=>{
    const seller= new Seller(req.body);
try{

   const newSeller= await seller.save()
   res.json(newSeller)

}catch(err){

    res.json(err)
}

}


)

module.exports=router