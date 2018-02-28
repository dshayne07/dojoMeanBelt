let mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;

let Question = mongoose.model("Question",new mongoose.Schema({
    question:{type:String,required:true,minlength:5,maxlength:255},
    description:{type:String,required:false,minlength:5,maxlength:255},
    answers:[{type:ObjectId,ref:"Answer"}],
},{timestamps:true}));