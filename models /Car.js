const mongoose = require('mongoose')
const carSchema = mongoose.Schema({

    carinformation:{
      title: String,
      form: String,
      price:Number,
      kilometers: Number,
      registration: Date,
      power: Number,
      state: String,
      holder:Number,
      transmission:String,
      engine: String,
      extras: [],
      sellerID: mongoose.Schema.Types.ObjectId,
      created:{
          type:Date,
          default: Date.now
      }
  
  
  
  
    },
    zustand:{
      zustand:String,
      holder:Number,
      huPrüfung:Date,
      garantie:Boolean,
      scheckheftGepflegt:Boolean,
      nichtRaucherfahrzeug:Boolean
  },
  antrieb:{



    getriebeArt: String,
    hubraum: Number,
    zylinder:Number,
    leerGewicht:Number,
    antriebsart:String
  },
  umwelt:{
    kraftStoff: String,
    
      kombi:Number,
      innerOrts:Number,
      auserOrts:Number,

    co2Emission:String,
    schadstoffKlasse:String ,
    feinStaubPlakete:String


  },
  Merkmale:{
    brand:String,
    model:String,
    angebotsnummer:String,
    ausenFarbe:String,
    lakierung:String,
    farbeLautHersteller:String,
    anzahlTuren:Number,
    anzhalSitze:Number,
    schlusselNumer:String,
    landerVersion:String
  },

  beschreibung: Array,

  imgsrc:Array

   
  
  
  },
 
)
module.exports = mongoose.model('Car', carSchema)