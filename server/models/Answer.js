let mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;

let Answer = mongoose.model("Answer",new mongoose.Schema({
    answer:{type:String,required:true,minlength:5,maxlength:255},
    details:{type:String,required:false,minlength:5,maxlength:255},
    _user:{type:ObjectId,ref:"User"},
    _question:{type:ObjectId,ref:"Question"},
    likes:{type:Number}
},{timestamps:true}));