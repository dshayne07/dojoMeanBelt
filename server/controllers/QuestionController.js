let Question = require("mongoose").model("Question");
let Answer = require("mongoose").model("Answer");
let User    = require("mongoose").model("User");

module.exports = {
    create:function(req,res){
        let question = new Question(req.body);

        question.save((err)=>{
            if(err){
                return res.json({errors:question.errors})
            }else{
                if(err){
                    return res.json({errors:user.errors});
                }else{
                    return res.json(question);
                }
            }
        })
    },
    get:function(req,res){
        Question.findOne({_id:req.params.id})
        .populate({
            path:"answers",
            model:"Answer",
            populate: {
                path:"_user",
                model:"User"
            }
        })
        .exec((err,question)=>{
            if(err){
                return res.json("Failed to find Question");
            }else{
                return res.json(question);
            }
        })
    },
    all:function(req,res){
        Question.find({},(err,questions)=>{
            if(err){
                return res.json({errors:"Failed to find questions"})
            }
            else{
                return res.json(questions)
            }
        })        
    }
}