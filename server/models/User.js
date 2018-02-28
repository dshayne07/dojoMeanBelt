let mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;

let User = mongoose.model("User",new mongoose.Schema({
    firstName:{type:String,required:true,minlength:1,maxlength:255},
    lastName:{type:String,required:true,minlength:1,maxlength:255},
    email:{type:String,required:true,minlength:1,maxlength:255},
    password:{type:String,required:true,minlength:1,maxlength:255},
    confirm:{type:String,required:true,minlength:1,maxlength:255},
    answers:[{type:ObjectId,ref:"Answer"}],
    likes:[{type:ObjectId,ref:"Like"}]
},{timestamps:true}));