const mongoose =require("mongoose")
const { z} = require("zod")


const preparationplanschema=new mongoose.Schema({
day:{
    type:Number,
    required:true
},
focus:{
    type:String,
    required:true
},
tasks:{
    type:String,
    required:true
}






})

const skillsgapschema=new mongoose.Schema({

skill:{
    type:String,
    required:true
},
severity:{
    type:String,
    enum:["low","medium","high"],
    required:true
}


},{_id
    :false
})

const technicalquestionschema=new mongoose.Schema({
  question:{
    type:String,
    required:true
  },
  intention:{
    type:String,
    required:true
  },
  answer:{
type:String,
required:true
  }

},{
_id:false
})


const behaviourialquestionschema=new mongoose.Schema({
  question:{
    type:String,
    required:true
  },
  intention:{
    type:String,
    required:true
  },
  answer:{
type:String,
required:true
  }

},{
_id:false
})
const reportschema=new mongoose.Schema({

jobdescription:{
    type:String,
    required:true
},
resume:{
type:String
},
selfdescription:{
    type:String
},
matchscore:{
    type:Number,
    min:0,
    max:100
},
technicalquestions:[technicalquestionschema],
behaviourialquestions:[behaviourialquestionschema],
skillsgap:[skillsgapschema],
preparationplan:[preparationplanschema],
user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"user"
},
title:{
  type:String,
   default:"Interview Report"
}

},{timestamps:true})
const interviewreportmodel=mongoose.model("reportmodel",reportschema)

module.exports=interviewreportmodel